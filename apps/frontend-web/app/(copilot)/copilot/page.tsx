"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2 } from "@ordella/shared-icons";
import { toast } from "sonner";
import { AIInsightCard } from "@/components/ai/AIInsightCard";
import { AIWorkflowSuggestions } from "@/components/ai/AIWorkflowSuggestions";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { useCopilot, useCopilotMemory } from "@/hooks/useAI";
import { ApiError } from "@/lib/api-client";
import type { CopilotResult } from "@/lib/ai-copilot-types";
import { consumeAgentStream } from "@/lib/ai-stream";
import { WithPermission } from "@/lib/auth/withPermission";

export default function CopilotWorkspacePage() {
  const copilot = useCopilot();
  const memoryQuery = useCopilotMemory();
  const [query, setQuery] = useState("");
  const [streamText, setStreamText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastResult, setLastResult] = useState<CopilotResult | null>(null);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>(
    [],
  );

  async function handleAsk(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      return;
    }

    setMessages((current) => [...current, { role: "user", content: trimmed }]);
    setQuery("");

    try {
      const result = await copilot.mutateAsync({ query: trimmed });
      setLastResult(result);
      setMessages((current) => [...current, { role: "assistant", content: result.response }]);
    } catch (error) {
      toast.error(error instanceof ApiError ? error.message : "Copilot request failed.");
    }
  }

  async function handleStream() {
    const trimmed = query.trim() || "Provide an operational clinic summary.";
    setIsStreaming(true);
    setStreamText("");
    setQuery("");

    try {
      await consumeAgentStream(
        { task: trimmed, context: { workspace: "copilot" } },
        {
          onChunk: (chunk) => setStreamText((current) => current + chunk),
          onDone: (fullText) => {
            setMessages((current) => [...current, { role: "assistant", content: fullText }]);
            toast.success("Stream completed.");
          },
          onError: (message) => toast.error(message),
        },
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Streaming failed.");
    } finally {
      setIsStreaming(false);
    }
  }

  return (
    <WithPermission permission="ai.use">
      <div className="mx-auto max-w-5xl space-y-6 p-6">
        <PageHeader
          title="AI Copilot"
          subtitle="Full-screen workspace for multi-entity reasoning, streaming responses, and memory-enabled assistance."
          action={
            <Button asChild variant="ghost">
              <Link href="/clinic">&larr; Back to clinic</Link>
            </Button>
          }
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Conversation</CardTitle>
              </CardHeader>
              <CardBody className="min-h-[320px] space-y-3">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-md px-3 py-2 text-sm ${
                      message.role === "user" ? "bg-muted" : "bg-primary/5"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}
                {streamText ? (
                  <div className="rounded-md bg-primary/5 px-3 py-2 text-sm">{streamText}</div>
                ) : null}
                {copilot.isPending || isStreaming ? (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isStreaming ? "Streaming response…" : "Processing…"}
                  </div>
                ) : null}
              </CardBody>
            </Card>

            <form onSubmit={(event) => void handleAsk(event)} className="flex gap-2">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask anything about patients, appointments, billing, or reports…"
                disabled={copilot.isPending || isStreaming}
              />
              <Button type="submit" disabled={copilot.isPending || isStreaming}>
                Ask
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={copilot.isPending || isStreaming}
                onClick={() => void handleStream()}
              >
                Stream
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            {lastResult ? (
              <AIInsightCard
                title="Latest insights"
                summary={lastResult.summary ?? lastResult.response}
                insights={lastResult.insights}
                actions={lastResult.suggestedActions}
              />
            ) : null}

            <AIWorkflowSuggestions />

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Memory</CardTitle>
              </CardHeader>
              <CardBody className="space-y-2 text-sm text-muted-foreground">
                {(memoryQuery.data ?? []).slice(0, 5).map((entry) => (
                  <p key={entry.key} className="truncate">
                    {String((entry.value as { query?: string })?.query ?? entry.key)}
                  </p>
                ))}
                {!memoryQuery.data?.length ? <p>No recent interactions stored yet.</p> : null}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </WithPermission>
  );
}
