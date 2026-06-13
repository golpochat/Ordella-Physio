"use client";

import { useEffect, useState } from "react";
import { subscribeTrainingLogStream } from "@/lib/training-log-stream";
import type { TrainingLogEntry } from "@/lib/training-types";

export type TrainingLogsStreamProps = {
  jobId: string;
  initialLogs?: TrainingLogEntry[];
};

export function TrainingLogsStream({ jobId, initialLogs = [] }: TrainingLogsStreamProps) {
  const [logs, setLogs] = useState<TrainingLogEntry[]>(initialLogs);

  useEffect(() => {
    setLogs(initialLogs);
  }, [initialLogs]);

  useEffect(() => {
    return subscribeTrainingLogStream(jobId, {
      onLog: (entry) => {
        setLogs((current) => {
          const signature = `${entry.timestamp}:${entry.message}`;
          if (current.some((item) => `${item.timestamp}:${item.message}` === signature)) {
            return current;
          }
          return [...current, entry];
        });
      },
    });
  }, [jobId]);

  return (
    <ul className="training-logs-list">
      {logs.map((log, index) => (
        <li key={`${log.timestamp}-${index}`} className={`training-log-${log.level}`}>
          <span className="dashboard-cell-muted">{new Date(log.timestamp).toLocaleTimeString()}</span>
          <span>{log.message}</span>
        </li>
      ))}
      {!logs.length ? <li className="dashboard-cell-muted">Waiting for logs…</li> : null}
    </ul>
  );
}
