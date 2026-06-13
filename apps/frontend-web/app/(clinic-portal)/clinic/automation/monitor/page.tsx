"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { WorkflowEventDetailsDrawer } from "@/components/automation/WorkflowEventDetailsDrawer";
import { WorkflowEventFilters } from "@/components/automation/WorkflowEventFilters";
import { WorkflowLiveFeed } from "@/components/automation/WorkflowLiveFeed";
import { ListPage } from "@/components/dashboard/ListPage";
import { Button } from "@/components/ui/button";
import {
  useAutomationMonitorEvents,
  useAutomationWorkflows,
} from "@/hooks/useAutomationPortal";
import { subscribeWorkflowMonitorStream } from "@/lib/automation-monitor-stream";
import type { WorkflowLiveEvent, WorkflowLiveEventFilters } from "@/lib/automation-types";
import { WithPermission } from "@/lib/auth/withPermission";

function applyClientFilters(events: WorkflowLiveEvent[], filters: WorkflowLiveEventFilters) {
  return events.filter((event) => {
    if (filters.workflowId && event.workflowId !== filters.workflowId) {
      return false;
    }
    if (filters.eventType && event.eventType !== filters.eventType) {
      return false;
    }
    if (filters.status && event.status !== filters.status) {
      return false;
    }
    if (filters.search) {
      const needle = filters.search.toLowerCase();
      const haystack = `${event.workflowName ?? ""} ${event.eventType}`.toLowerCase();
      if (!haystack.includes(needle)) {
        return false;
      }
    }
    if (filters.from) {
      const from = new Date(filters.from).getTime();
      if (new Date(event.timestamp).getTime() < from) {
        return false;
      }
    }
    if (filters.to) {
      const to = new Date(filters.to).getTime();
      if (new Date(event.timestamp).getTime() > to) {
        return false;
      }
    }
    return true;
  });
}

export default function ClinicAutomationMonitorPage() {
  const [filters, setFilters] = useState<WorkflowLiveEventFilters>({ limit: 200 });
  const [liveEvents, setLiveEvents] = useState<WorkflowLiveEvent[]>([]);
  const [streamConnected, setStreamConnected] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<WorkflowLiveEvent | null>(null);

  const { data: recentEvents = [], isLoading, isError, refetch, isFetching } =
    useAutomationMonitorEvents(filters);
  const workflowsQuery = useAutomationWorkflows();

  useEffect(() => {
    setLiveEvents((current) => {
      const byId = new Map(current.map((event) => [event.id, event]));
      for (const event of recentEvents) {
        byId.set(event.id, event);
      }
      return [...byId.values()]
        .sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime())
        .slice(0, 200);
    });
  }, [recentEvents]);

  useEffect(() => {
    const unsubscribe = subscribeWorkflowMonitorStream({
      onConnected: () => setStreamConnected(true),
      onEvent: (event) => {
        setLiveEvents((current) => {
          if (current.some((item) => item.id === event.id)) {
            return current;
          }
          return [event, ...current].slice(0, 200);
        });
      },
      onError: () => setStreamConnected(false),
    });

    return unsubscribe;
  }, []);

  const filteredEvents = useMemo(
    () => applyClientFilters(liveEvents, filters),
    [filters, liveEvents],
  );

  const relatedEvents = useMemo(() => {
    if (!selectedEvent?.runId) {
      return filteredEvents;
    }
    return liveEvents.filter((event) => event.runId === selectedEvent.runId);
  }, [filteredEvents, liveEvents, selectedEvent]);

  return (
    <WithPermission permission="automation.monitor">
      <ListPage
        title="Live Automation Monitor"
        subtitle="Real-time workflow execution stream with recent history and run timelines."
        action={
          <div className="automation-builder-actions">
            <span className={streamConnected ? "automation-stream-live" : "automation-stream-offline"}>
              {streamConnected ? "Live" : "Reconnecting…"}
            </span>
            <Button asChild variant="ghost">
              <Link href="/clinic/automation/workflows">&larr; Back to workflows</Link>
            </Button>
          </div>
        }
        isLoading={isLoading}
        isError={isError}
        onRetry={() => void refetch()}
        loadingRows={6}
      >
        <WorkflowEventFilters
          filters={filters}
          workflows={workflowsQuery.data ?? []}
          disabled={isFetching}
          onChange={setFilters}
          onReset={() => setFilters({ limit: 200 })}
        />

        <WorkflowLiveFeed
          events={filteredEvents}
          selectedEventId={selectedEvent?.id}
          onSelectEvent={setSelectedEvent}
        />
      </ListPage>

      <WorkflowEventDetailsDrawer
        event={selectedEvent}
        relatedEvents={relatedEvents}
        onClose={() => setSelectedEvent(null)}
      />
    </WithPermission>
  );
}
