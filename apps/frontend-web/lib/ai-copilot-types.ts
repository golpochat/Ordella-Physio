export type CopilotEntityType = "patient" | "appointment" | "invoice" | "report";

export type PredictiveScore = {
  score: number;
  factors: string[];
  recommendedActions: string[];
  predictionType: string;
};

export type CopilotResult = {
  response: string;
  summary: string | null;
  insights: string[];
  predictions: PredictiveScore[];
  suggestedActions: string[];
  workflows: Array<{ trigger: string; label: string }>;
  tools: Array<{ tool: string; success: boolean; output: unknown }>;
  memory: {
    recentInteractions: number;
    entityMemory: number;
  };
  meta?: {
    provider: string;
    latencyMs: number;
  };
};

export type MultiStepAgentResult = {
  response: string;
  tools: Array<{ tool: string; success: boolean; output: unknown }>;
  suggestedActions: string[];
  steps: Array<{ step: string; output: unknown }>;
  meta?: {
    provider: string;
    latencyMs: number;
  };
};

export type WorkflowRunResult = {
  runId: string;
  trigger: string;
  status: string;
  steps: Array<{ action: string; success: boolean; output: unknown }>;
  error?: string;
};
