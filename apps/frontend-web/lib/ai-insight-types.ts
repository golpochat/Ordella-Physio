export type PatientInsightResult = {
  summary: string;
  keyConcerns: string[];
  recommendedNextSteps: string[];
  riskScore: {
    score: number;
    level: string;
    factors: string[];
  };
  meta?: {
    provider: string;
    latencyMs: number;
  };
};

export type AppointmentInsightResult = {
  visitSummary: string;
  followUpActions: string[];
  flags: string[];
  meta?: {
    provider: string;
    latencyMs: number;
  };
};

export type InvoiceInsightResult = {
  explanation: string;
  anomalies: string[];
  suggestedActions: string[];
  meta?: {
    provider: string;
    latencyMs: number;
  };
};

export type ReportInsightResult = {
  summary: string;
  highlights: string[];
  risks: string[];
  meta?: {
    provider: string;
    latencyMs: number;
  };
};

export type AgentResult = {
  response: string;
  tools: Array<{ tool: string; success: boolean; output: unknown }>;
  suggestedActions: string[];
  meta?: {
    provider: string;
    latencyMs: number;
  };
};
