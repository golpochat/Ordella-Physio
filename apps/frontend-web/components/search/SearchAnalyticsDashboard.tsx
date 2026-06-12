"use client";

import Link from "next/link";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { PageLoading } from "@/components/patient-portal/page-state";
import { useSearchAnalytics } from "@/hooks/useSearchIndex";

export function SearchAnalyticsDashboard() {
  const analyticsQuery = useSearchAnalytics();
  const data = analyticsQuery.data;

  if (analyticsQuery.isLoading) {
    return <PageLoading rows={6} />;
  }

  if (analyticsQuery.isError || !data) {
    return (
      <Card>
        <CardBody>
          <p className="text-destructive">Unable to load search analytics.</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Search analytics</h1>
          <p className="text-muted-foreground">Query volume, zero-result searches, and latency.</p>
        </div>
        <Link href="/settings/search" className="text-sm underline">
          Search settings
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Total queries logged</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-semibold">{data.totalQueries}</p>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Hits per index</CardTitle>
          </CardHeader>
          <CardBody className="space-y-1 text-sm">
            {Object.entries(data.hitsPerIndex).map(([indexName, hits]) => (
              <p key={indexName}>
                <span className="text-muted-foreground">{indexName}:</span> {hits}
              </p>
            ))}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Most common queries</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2 text-sm">
          {data.topQueries.length === 0 ? (
            <p className="text-muted-foreground">No queries logged yet.</p>
          ) : (
            data.topQueries.map((entry) => (
              <p key={`${entry.indexName}-${entry.query}`}>
                {entry.query} <span className="text-muted-foreground">({entry.indexName})</span> —{" "}
                {entry.count}
              </p>
            ))
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zero-result queries</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2 text-sm">
          {data.zeroResultQueries.length === 0 ? (
            <p className="text-muted-foreground">No zero-result queries.</p>
          ) : (
            data.zeroResultQueries.map((entry) => (
              <p key={`${entry.indexName}-${entry.query}`}>
                {entry.query} <span className="text-muted-foreground">({entry.indexName})</span> —{" "}
                {entry.count}
              </p>
            ))
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Slowest queries</CardTitle>
        </CardHeader>
        <CardBody className="space-y-2 text-sm">
          {data.slowestQueries.length === 0 ? (
            <p className="text-muted-foreground">No slow queries recorded.</p>
          ) : (
            data.slowestQueries.map((entry) => (
              <p key={`${entry.indexName}-${entry.query}-${entry.durationMs}`}>
                {entry.query} <span className="text-muted-foreground">({entry.indexName})</span> —{" "}
                {entry.durationMs}ms
              </p>
            ))
          )}
        </CardBody>
      </Card>
    </div>
  );
}
