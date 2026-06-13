"use client";

import { useEffect, useRef } from "react";
import { WorkflowEventCard } from "@/components/automation/WorkflowEventCard";
import type { WorkflowLiveEvent } from "@/lib/automation-types";

export type WorkflowLiveFeedProps = {
  events: WorkflowLiveEvent[];
  selectedEventId?: string | null;
  autoScroll?: boolean;
  onSelectEvent: (event: WorkflowLiveEvent) => void;
};

export function WorkflowLiveFeed({
  events,
  selectedEventId,
  autoScroll = true,
  onSelectEvent,
}: WorkflowLiveFeedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldStickToBottomRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    function handleScroll() {
      if (!container) {
        return;
      }
      const distanceFromBottom =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      shouldStickToBottomRef.current = distanceFromBottom < 48;
    }

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!autoScroll || !shouldStickToBottomRef.current) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [autoScroll, events]);

  return (
    <div ref={containerRef} className="automation-live-feed">
      {events.length === 0 ? (
        <p className="automation-empty-hint">Waiting for workflow events…</p>
      ) : (
        events.map((event) => (
          <WorkflowEventCard
            key={event.id}
            event={event}
            expanded={selectedEventId === event.id}
            onSelect={() => onSelectEvent(event)}
          />
        ))
      )}
    </div>
  );
}
