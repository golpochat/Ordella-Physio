import { getApiClientContext } from "@/lib/api-session";
import { API_ROUTES, AUTHORIZATION_HEADER, CORRELATION_ID_HEADER, TENANT_HEADER } from "@/lib/constants";
import { isSystemUser, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";

export type TrainingMetricsStreamHandlers = {
  onConnected?: () => void;
  onMetrics?: (payload: { jobId: string; metrics: Record<string, unknown>; timestamp: string }) => void;
  onError?: (message: string) => void;
};

export function subscribeTrainingMetricsStream(
  jobId: string,
  handlers: TrainingMetricsStreamHandlers,
): () => void {
  const controller = new AbortController();
  const context = getApiClientContext();
  const roles =
    context.roles?.map((role) => mapAuthRoleToPortalRole(role)) ??
    (context.role ? [mapAuthRoleToPortalRole(context.role)] : []);
  const systemUser = isSystemUser(roles);

  const headers: Record<string, string> = { accept: "text/event-stream" };
  if (context.accessToken) headers[AUTHORIZATION_HEADER] = `Bearer ${context.accessToken}`;
  if (context.correlationId) headers[CORRELATION_ID_HEADER] = context.correlationId;
  if (!systemUser && context.tenantId) headers[TENANT_HEADER] = context.tenantId;

  void (async () => {
    try {
      const response = await fetch(`${API_ROUTES.ai}/training/${jobId}/metrics/stream`, {
        method: "GET",
        headers,
        credentials: "include",
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        handlers.onError?.(`Metrics stream failed (${response.status})`);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";

        for (const chunk of chunks) {
          const lines = chunk.split("\n");
          let eventName = "message";
          let data = "";
          for (const line of lines) {
            if (line.startsWith("event:")) eventName = line.slice(6).trim();
            else if (line.startsWith("data:")) data += line.slice(5).trim();
          }
          if (eventName === "connected") {
            handlers.onConnected?.();
            continue;
          }
          if (eventName === "metrics" && data) {
            try {
              handlers.onMetrics?.(
                JSON.parse(data) as {
                  jobId: string;
                  metrics: Record<string, unknown>;
                  timestamp: string;
                },
              );
            } catch {
              // ignore
            }
          }
        }
      }
    } catch (error) {
      if (!controller.signal.aborted) {
        handlers.onError?.(error instanceof Error ? error.message : "Metrics stream disconnected.");
      }
    }
  })();

  return () => controller.abort();
}
