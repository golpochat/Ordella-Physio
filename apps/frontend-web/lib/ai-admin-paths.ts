export const CLINIC_AI_BASE = "/clinic/ai";
export const ADMIN_AI_BASE = "/admin/ai";

export function createAiPaths(base: string) {
  return {
    dashboard: `${base}/dashboard`,
    datasets: `${base}/datasets`,
    dataset: (id: string) => `${base}/datasets/${id}`,
    datasetVersion: (datasetId: string, versionId: string) =>
      `${base}/datasets/${datasetId}/versions/${versionId}`,
    datasetLabel: (datasetId: string) => `${base}/datasets/${datasetId}/label`,
    training: `${base}/training`,
    trainingNew: `${base}/training/new`,
    trainingJob: (id: string) => `${base}/training/${id}`,
    trainingDashboard: (id: string) => `${base}/training/${id}/dashboard`,
    experiments: `${base}/experiments`,
    experiment: (id: string) => `${base}/experiments/${id}`,
    experimentsCompare: (jobId: string, ids?: string[]) =>
      `${base}/experiments/compare?jobId=${jobId}${ids?.length ? `&ids=${ids.join(",")}` : ""}`,
    models: `${base}/models`,
    model: (id: string) => `${base}/models/${id}`,
    modelEvaluation: (id: string) => `${base}/models/${id}/evaluation`,
    modelPromotion: (id: string) => `${base}/models/${id}/promotion`,
    modelDeployment: (id: string) => `${base}/models/${id}/deployment`,
    modelDrift: (id: string) => `${base}/models/${id}/drift`,
    featureExperiments: `${base}/feature-experiments`,
    featureExperiment: (id: string) => `${base}/feature-experiments/${id}`,
    flags: `${base}/flags`,
    drift: `${base}/drift`,
    gatewayKeys: `${base}/gateway/keys`,
    gatewayUsage: `${base}/gateway/usage`,
    gatewayLimits: `${base}/gateway/limits`,
    cost: `${base}/cost`,
    costBudget: `${base}/cost/budget`,
    costAlerts: `${base}/cost/alerts`,
    securityAudit: `${base}/security/audit`,
    securityPolicies: `${base}/security/policies`,
    securityPii: `${base}/security/pii`,
    observability: `${base}/observability`,
    observabilityTraces: `${base}/observability/traces`,
    observabilityLogs: `${base}/observability/logs`,
    observabilityMetrics: `${base}/observability/metrics`,
    agents: `${base}/agents`,
    agent: (id: string) => `${base}/agents/${id}`,
  };
}

export const clinicAiPaths = createAiPaths(CLINIC_AI_BASE);
export const adminAiPaths = createAiPaths(ADMIN_AI_BASE);
