"use client";

import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { useMessagingContext } from "@/hooks/useMessaging";
import { useAuthStore } from "@/store/auth.store";

/**
 * Subscribes to messaging SSE stream and invalidates React Query caches on events.
 */
export function useMessagingRealtime() {
  const queryClient = useQueryClient();
  const api = useApi();
  const { tenantId, userId } = useMessagingContext();
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!api || !tenantId || !userId || !accessToken) {
      return;
    }

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${baseUrl}/api/messaging/stream`;
    const controller = new AbortController();

    void (async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "x-tenant-id": tenantId,
            Accept: "text/event-stream",
          },
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
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
            if (!chunk.startsWith("event:")) continue;
            const eventLine = chunk.split("\n")[0] ?? "";
            const eventType = eventLine.replace("event: ", "").trim();
            if (eventType === "message.created" || eventType === "message.read") {
              void queryClient.invalidateQueries({ queryKey: ["messaging"] });
            }
          }
        }
      } catch {
        // SSE reconnect handled by effect re-run on token change
      }
    })();

    return () => controller.abort();
  }, [accessToken, api, queryClient, tenantId, userId]);
}
