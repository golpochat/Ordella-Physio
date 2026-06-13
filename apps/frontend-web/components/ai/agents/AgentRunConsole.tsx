"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AgentStepTimeline } from "@/components/ai/agents/AgentStepTimeline";
import type { AgentRunRecord } from "@/lib/agent-types";

export type AgentRunConsoleProps = {
  onRun: (input: string) => void;
  running?: boolean;
  latestRun?: AgentRunRecord | null;
};

export function AgentRunConsole({ onRun, running, latestRun }: AgentRunConsoleProps) {
  const [input, setInput] = useState("");

  return (
    <div className="ai-agents-console">
      <textarea
        className="ai-agents-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask the agent to search patients, check invoices, or run a workflow step…"
        rows={4}
      />
      <Button type="button" variant="primary" disabled={running || !input.trim()} onClick={() => onRun(input)}>
        {running ? "Running…" : "Run agent"}
      </Button>
      {latestRun ? (
        <div className="ai-agents-run-output">
          <h4>Final output</h4>
          <pre>{latestRun.finalOutput ?? "—"}</pre>
          <p className="ai-observability-muted">Status: {latestRun.status}</p>
          <AgentStepTimeline steps={latestRun.steps} />
        </div>
      ) : null}
    </div>
  );
}
