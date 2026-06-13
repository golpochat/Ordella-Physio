"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import type { AgentToolRecord, CreateAgentInput } from "@/lib/agent-types";

export type AgentEditorProps = {
  tools: AgentToolRecord[];
  onSubmit: (payload: CreateAgentInput) => void;
  submitting?: boolean;
};

export function AgentEditor({ tools, onSubmit, submitting }: AgentEditorProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modelId, setModelId] = useState("gpt-4o-mini");
  const [systemPrompt, setSystemPrompt] = useState("You are a Sheba360 AI assistant for clinic operations.");
  const [maxSteps, setMaxSteps] = useState(5);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);

  return (
    <form
      className="ai-agents-editor"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit({
          name,
          description: description || undefined,
          modelId,
          systemPrompt,
          maxSteps,
          tools: selectedTools,
        });
      }}
    >
      <div className="ai-agents-field">
        <Label htmlFor="agent-name">Name</Label>
        <Input id="agent-name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="ai-agents-field">
        <Label htmlFor="agent-description">Description</Label>
        <Input id="agent-description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="ai-agents-field">
        <Label htmlFor="agent-model">Model</Label>
        <Input id="agent-model" value={modelId} onChange={(e) => setModelId(e.target.value)} required />
      </div>
      <div className="ai-agents-field">
        <Label htmlFor="agent-prompt">System prompt</Label>
        <textarea
          id="agent-prompt"
          className="ai-agents-textarea"
          value={systemPrompt}
          onChange={(e) => setSystemPrompt(e.target.value)}
          rows={4}
          required
        />
      </div>
      <div className="ai-agents-field">
        <Label htmlFor="agent-steps">Max steps</Label>
        <Input id="agent-steps" type="number" min={1} max={20} value={maxSteps} onChange={(e) => setMaxSteps(Number(e.target.value))} />
      </div>
      <div className="ai-agents-field">
        <Label>Tools</Label>
        <div className="ai-agents-tool-picker">
          {tools.map((tool) => (
            <label key={tool.id} className="ai-agents-tool-option">
              <input
                type="checkbox"
                checked={selectedTools.includes(tool.id)}
                onChange={(e) => {
                  setSelectedTools((current) =>
                    e.target.checked ? [...current, tool.id] : current.filter((id) => id !== tool.id),
                  );
                }}
              />
              <span>{tool.name}</span>
              <small>{tool.type}</small>
            </label>
          ))}
        </div>
      </div>
      <Button type="submit" variant="primary" disabled={submitting || !name.trim()}>
        {submitting ? "Creating…" : "Create agent"}
      </Button>
    </form>
  );
}
