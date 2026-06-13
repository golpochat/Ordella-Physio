"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CheckpointList } from "@/components/ai/training/CheckpointList";
import { TrainingLossChart } from "@/components/ai/training/TrainingLossChart";
import { TrainingLogsStream } from "@/components/ai/training/TrainingLogsStream";
import { TrainingMetricsChart } from "@/components/ai/training/TrainingMetricsChart";
import { subscribeTrainingMetricsStream } from "@/lib/training-metrics-stream";
import type { TrainingDashboardData, TrainingCurvePoint } from "@/lib/training-types";

export type TrainingDashboardProps = {
  dashboard: TrainingDashboardData;
  canManage?: boolean;
  isResuming?: boolean;
  onResumeCheckpoint?: (checkpointNumber: number) => void;
};

export function TrainingDashboard({
  dashboard,
  canManage = false,
  isResuming = false,
  onResumeCheckpoint,
}: TrainingDashboardProps) {
  const [liveMetrics, setLiveMetrics] = useState(dashboard.liveMetrics);
  const [curve, setCurve] = useState<TrainingCurvePoint[]>(dashboard.trainingCurve);

  useEffect(() => {
    setLiveMetrics(dashboard.liveMetrics);
    setCurve(dashboard.trainingCurve);
  }, [dashboard]);

  useEffect(() => {
    return subscribeTrainingMetricsStream(dashboard.job.id, {
      onMetrics: (payload) => {
        setLiveMetrics({
          loss: payload.metrics.loss ?? null,
          accuracy: payload.metrics.accuracy ?? null,
          perplexity: payload.metrics.perplexity ?? null,
          epochs: payload.metrics.epochs ?? null,
          distributed: payload.metrics.distributedMode ?? null,
        });
        const epoch = Number(payload.metrics.epochs ?? 0);
        if (epoch > 0) {
          setCurve((current) => {
            if (current.some((point) => point.epoch === epoch)) {
              return current;
            }
            return [
              ...current,
              {
                epoch,
                loss: Number(payload.metrics.loss ?? 0),
                accuracy: Number(payload.metrics.accuracy ?? 0),
                perplexity: Number(payload.metrics.perplexity ?? 0) || undefined,
              },
            ];
          });
        }
      },
    });
  }, [dashboard.job.id]);

  return (
    <div className="training-dashboard">
      <section className="training-dashboard-overview">
        <div>
          <h3>Status</h3>
          <Badge variant="secondary">{dashboard.job.status}</Badge>
        </div>
        <div className="training-metrics-grid">
          <div className="training-metric-card">
            <div className="dashboard-cell-muted">Loss</div>
            <div className="training-metric-value">{String(liveMetrics.loss ?? "—")}</div>
          </div>
          <div className="training-metric-card">
            <div className="dashboard-cell-muted">Accuracy</div>
            <div className="training-metric-value">{String(liveMetrics.accuracy ?? "—")}</div>
          </div>
          <div className="training-metric-card">
            <div className="dashboard-cell-muted">Perplexity</div>
            <div className="training-metric-value">{String(liveMetrics.perplexity ?? "—")}</div>
          </div>
          <div className="training-metric-card">
            <div className="dashboard-cell-muted">Epochs</div>
            <div className="training-metric-value">{String(liveMetrics.epochs ?? "—")}</div>
          </div>
        </div>
      </section>

      {dashboard.hyperparameterTuning.enabled ? (
        <section className="training-dashboard-section">
          <h3>Hyperparameter tuning</h3>
          <p className="dashboard-cell-muted">
            Strategy: {dashboard.hyperparameterTuning.strategy} · Trials:{" "}
            {dashboard.hyperparameterTuning.completedTrials}/
            {dashboard.hyperparameterTuning.scheduledTrials}
          </p>
        </section>
      ) : null}

      <section className="training-dashboard-charts">
        <TrainingLossChart data={curve} />
        <TrainingMetricsChart data={curve} />
      </section>

      <section className="training-dashboard-section">
        <h3>Live logs</h3>
        <TrainingLogsStream jobId={dashboard.job.id} initialLogs={dashboard.job.logs} />
      </section>

      <section className="training-dashboard-section">
        <h3>Checkpoints</h3>
        <CheckpointList
          checkpoints={dashboard.checkpoints}
          canManage={canManage}
          isBusy={isResuming}
          onResume={onResumeCheckpoint}
        />
      </section>
    </div>
  );
}
