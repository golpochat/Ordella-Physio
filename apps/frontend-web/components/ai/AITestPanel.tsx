"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAIText } from "@/hooks/useAI";

type AITestPanelProps = {
  models: string[];
};

export function AITestPanel({ models }: AITestPanelProps) {
  const runText = useAIText();
  const [prompt, setPrompt] = useState("Summarize clinic onboarding in two sentences.");
  const [model, setModel] = useState(models[0] ?? "");
  const [response, setResponse] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);

  async function handleRunTest() {
    try {
      const result = await runText.mutateAsync({
        task: "SUMMARY",
        prompt,
        model: model || undefined,
        maxTokens: 200,
      });
      setResponse(result.text);
      setLatencyMs(result.latencyMs);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "AI test failed.");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI test panel</CardTitle>
        <CardDescription>Run a quick text completion against the configured provider chain.</CardDescription>
      </CardHeader>
      <CardBody className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="ai-test-model">
            Model
          </label>
          <select
            id="ai-test-model"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={model}
            onChange={(event) => setModel(event.target.value)}
          >
            {models.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium" htmlFor="ai-test-prompt">
            Prompt
          </label>
          <textarea
            id="ai-test-prompt"
            className="min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
        </div>

        <Button type="button" variant="primary" disabled={runText.isPending} onClick={() => void handleRunTest()}>
          Run test
        </Button>

        {response ? (
          <div className="space-y-2 rounded-md border p-3 text-sm">
            <p className="whitespace-pre-wrap">{response}</p>
            {latencyMs !== null ? (
              <p className="text-muted-foreground">Latency: {latencyMs} ms</p>
            ) : null}
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
}
