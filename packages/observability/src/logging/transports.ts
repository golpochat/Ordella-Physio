import { appendFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type { LogEntry } from "./formatters";

export type LogTransport = {
  write: (output: string, entry: LogEntry) => void;
};

export type ConsoleTransportOptions = {
  stderrLevels?: Set<string>;
};

export function createConsoleTransport(
  options: ConsoleTransportOptions = {},
): LogTransport {
  const stderrLevels = options.stderrLevels ?? new Set(["error", "warn"]);

  return {
    write(output: string, entry: LogEntry) {
      if (stderrLevels.has(entry.level)) {
        console.error(output);
        return;
      }

      console.log(output);
    },
  };
}

export type FileTransportOptions = {
  path: string;
  ensureDirectory?: boolean;
};

export function createFileTransport(options: FileTransportOptions): LogTransport {
  if (options.ensureDirectory !== false) {
    mkdirSync(dirname(options.path), { recursive: true });
  }

  return {
    write(output: string) {
      appendFileSync(options.path, `${output}\n`, "utf8");
    },
  };
}

export type RemoteTransportOptions = {
  endpoint: string;
  headers?: Record<string, string>;
};

export function createRemoteTransport(options: RemoteTransportOptions): LogTransport {
  return {
    write(_output: string, entry: LogEntry) {
      void fetch(options.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(options.headers ?? {}),
        },
        body: JSON.stringify(entry),
      }).catch(() => {
        // Remote transport is best-effort in scaffold mode.
      });
    },
  };
}
