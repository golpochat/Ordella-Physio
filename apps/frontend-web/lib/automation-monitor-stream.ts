import { getApiClientContext } from "@/lib/api-session";
import { API_ROUTES, AUTHORIZATION_HEADER, CORRELATION_ID_HEADER, TENANT_HEADER } from "@/lib/constants";
import { isSystemUser, mapAuthRoleToPortalRole } from "@/lib/auth/roleRedirect";
import type { WorkflowLiveEvent } from "@/lib/automation-types";

export type WorkflowMonitorStreamHandlers = {
  onConnected?: () => void;
  onEvent?: (event: WorkflowLiveEvent) => void;
  onError?: (message: string) => void;
};

export function subscribeWorkflowMonitorStream(
  handlers: WorkflowMonitorStreamHandlers,
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
      const response = await fetch(`${API_ROUTES.ai}/workflows/monitor/stream`, {
        method: "GET",
        headers,
        credentials: "include",
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        handlers.onError?.(`Monitor stream failed (${response.status})`);
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
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
          if (!block.trim() || block.startsWith(":")) {
            continue;
          }

          const lines = block.split("\n");
          const eventName = lines.find((line) => line.startsWith("event:"))?.slice(6).trim();
          const dataLine = lines.find((line) => line.startsWith("data:"))?.slice(5).trim();
          if (!dataLine) {
            continue;
          }

          if (eventName === "connected") {
            handlers.onConnected?.();
            continue;
          }

          if (eventName === "workflow-event") {
            const payload = JSON.parse(dataLine) as WorkflowLiveEvent;
            if (payload.id === "heartbeat" || payload.payload?.heartbeat) {
              continue;
            }
            handlers.onEvent?.(payload);
          }
        }
      }
    } catch (error) {
      if (controller.signal.aborted) {
        return;
      }
      const message = error instanceof Error ? error.message : "Monitor stream disconnected.";
      handlers.onError?.(message);
    }
  })();

  return () => controller.abort();
}
