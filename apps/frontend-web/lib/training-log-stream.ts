import { getApiClientContext } from "@/lib/api-session";
import { API_ROUTES, AUTHORIZATION_HEADER, CORRELATION_ID_HEADER, TENANT_HEADER } from "@/lib/constants";
import { isSystemUser, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import type { TrainingLogEntry } from "@/lib/training-types";

export type TrainingLogStreamHandlers = {
  onConnected?: () => void;
  onLog?: (entry: TrainingLogEntry) => void;
  onError?: (message: string) => void;
};

export function subscribeTrainingLogStream(
  jobId: string,
  handlers: TrainingLogStreamHandlers,
): () => void {
  const controller = new AbortController();
  const context = getApiClientContext();
  const roles =
    context.roles?.map((role) => mapAuthRoleToPortalRole(role)) ??
    (context.role ? [mapAuthRoleToPortalRole(context.role)] : []);
  const systemUser = isSystemUser(roles);

  const headers: Record<string, string> = {
    accept: "text/event-stream",
  };

  if (context.accessToken) {
    headers[AUTHORIZATION_HEADER] = `Bearer ${context.accessToken}`;
  }
  if (context.correlationId) {
    headers[CORRELATION_ID_HEADER] = context.correlationId;
  }
  if (!systemUser && context.tenantId) {
    headers[TENANT_HEADER] = context.tenantId;
  }

  void (async () => {
    try {
      const response = await fetch(`${API_ROUTES.ai}/training/${jobId}/logs/stream`, {
        method: "GET",
        headers,
        credentials: "include",
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        handlers.onError?.(`Log stream failed (${response.status})`);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const lines = chunk.split("\n");
          let eventName = "message";
          let data = "";

          for (const line of lines) {
            if (line.startsWith("event:")) {
              eventName = line.slice(6).trim();
            } else if (line.startsWith("data:")) {
              data += line.slice(5).trim();
            }
          }

          if (eventName === "connected") {
            handlers.onConnected?.();
            continue;
          }

          if (eventName === "log" && data) {
            try {
              handlers.onLog?.(JSON.parse(data) as TrainingLogEntry);
            } catch {
              // ignore malformed events
            }
          }
        }
      }
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      handlers.onError?.(error instanceof Error ? error.message : "Log stream disconnected.");
    }
  })();

  return () => controller.abort();
}
