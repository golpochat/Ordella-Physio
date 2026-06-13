"use client";

import { useEffect, useState } from "react";
import { subscribeTrainingLogStream } from "@/lib/training-log-stream";
import type { TrainingLogEntry } from "@/lib/training-types";

export type TrainingJobLogsProps = {
  jobId: string;
  initialLogs?: TrainingLogEntry[];
};

export function TrainingJobLogs({ jobId, initialLogs = [] }: TrainingJobLogsProps) {
  const [logs, setLogs] = useState<TrainingLogEntry[]>(initialLogs);
  const [streamError, setStreamError] = useState<string | null>(null);

  useEffect(() => {
    setLogs(initialLogs);
  }, [initialLogs]);

  useEffect(() => {
    const unsubscribe = subscribeTrainingLogStream(jobId, {
      onLog: (entry) => {
        setLogs((current) => {
          const signature = `${entry.timestamp}:${entry.message}`;
          if (current.some((item) => `${item.timestamp}:${item.message}` === signature)) {
            return current;
          }
          return [...current, entry];
        });
      },
      onError: (message) => setStreamError(message),
    });
    return unsubscribe;
  }, [jobId]);

  return (
    <div className="training-logs-panel">
      {streamError ? <p className="dataset-empty-hint">{streamError}</p> : null}
      <ul className="training-logs-list">
        {logs.map((log, index) => (
          <li key={`${log.timestamp}-${index}`} className={`training-log-${log.level}`}>
            <span className="dashboard-cell-muted">{new Date(log.timestamp).toLocaleTimeString()}</span>
            <span>{log.message}</span>
          </li>
        ))}
        {!logs.length ? <li className="dashboard-cell-muted">Waiting for logs…</li> : null}
      </ul>
    </div>
  );
}
