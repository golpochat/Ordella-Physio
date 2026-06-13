"use client";

import Link from "next/link";
import { adminAiPaths } from "@/lib/ai-admin-paths";

export type AIDashboardStatsProps = {
  datasetCount: number;
  trainingJobCount: number;
  activeExperiments: number;
  stagingModels: number;
  productionModels: number;
  driftAlerts: number;
};

export function AIDashboardStats({
  datasetCount,
  trainingJobCount,
  activeExperiments,
  stagingModels,
  productionModels,
  driftAlerts,
}: AIDashboardStatsProps) {
  const stats = [
    { label: "Datasets", value: datasetCount, href: adminAiPaths.datasets },
    { label: "Training jobs", value: trainingJobCount, href: adminAiPaths.training },
    { label: "Active experiments", value: activeExperiments, href: adminAiPaths.experiments },
    { label: "Staging models", value: stagingModels, href: adminAiPaths.models },
    { label: "Production models", value: productionModels, href: adminAiPaths.models },
    { label: "Drift alerts", value: driftAlerts, href: adminAiPaths.drift },
  ];

  return (
    <div className="ai-admin-stats-grid">
      {stats.map((stat) => (
        <Link key={stat.label} href={stat.href} className="ai-admin-stat-card">
          <div className="dashboard-cell-muted">{stat.label}</div>
          <div className="ai-admin-stat-value">{stat.value}</div>
        </Link>
      ))}
    </div>
  );
}
