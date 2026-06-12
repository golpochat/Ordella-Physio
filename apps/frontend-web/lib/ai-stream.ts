type StreamChunkEvent = {
  type: "chunk" | "done" | "stopped" | "error";
  content: string;
  done: boolean;
};

export async function consumeAgentStream(
  input: {
    task: string;
    context?: Record<string, unknown>;
    sessionId?: string;
  },
  handlers: {
    onSession?: (sessionId: string) => void;
    onChunk?: (content: string) => void;
    onDone?: (fullText: string) => void;
    onError?: (message: string) => void;
  },
) {
  const response = await fetch("/api/ai/agent/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "text/event-stream" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  if (!response.ok || !response.body) {
    const message = `Stream failed (${response.status})`;
    handlers.onError?.(message);
    throw new Error(message);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let fullText = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const eventBlock of events) {
      const lines = eventBlock.split("\n");
      const eventName = lines.find((line) => line.startsWith("event:"))?.slice(6).trim();
      const dataLine = lines.find((line) => line.startsWith("data:"))?.slice(5).trim();
      if (!dataLine) {
        continue;
      }

      if (eventName === "session") {
        const payload = JSON.parse(dataLine) as { sessionId: string };
        handlers.onSession?.(payload.sessionId);
        continue;
      }

      if (eventName === "error") {
        const payload = JSON.parse(dataLine) as { message: string };
        handlers.onError?.(payload.message);
        continue;
      }

      if (eventName === "chunk" || eventName === "done" || eventName === "stopped") {
        const payload = JSON.parse(dataLine) as StreamChunkEvent;
        if (payload.type === "chunk") {
          fullText += payload.content;
          handlers.onChunk?.(payload.content);
        }
        if (payload.type === "done") {
          handlers.onDone?.(payload.content || fullText);
        }
      }
    }
  }

  return fullText;
}
