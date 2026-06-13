"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDatasetVersions, useDatasets } from "@/hooks/useDatasetPortal";
import type { CreateTrainingJobInput, TrainingModelType, TrainingProvider } from "@/lib/training-types";

const MODEL_TYPES: TrainingModelType[] = ["LLM", "EMBEDDING"];
const PROVIDERS: TrainingProvider[] = ["OPENAI", "AZURE", "LOCAL"];
const BASE_MODELS = ["gpt-4o-mini", "gpt-4o", "llama3-8b", "text-embedding-3-small"];

export type TrainingJobFormProps = {
  isSubmitting?: boolean;
  onSubmit: (payload: CreateTrainingJobInput) => void;
};

export function TrainingJobForm({ isSubmitting = false, onSubmit }: TrainingJobFormProps) {
  const { data: datasets } = useDatasets();
  const [datasetId, setDatasetId] = useState("");
  const versionsQuery = useDatasetVersions(datasetId);
  const [datasetVersionId, setDatasetVersionId] = useState("");
  const [modelType, setModelType] = useState<TrainingModelType>("LLM");
  const [baseModel, setBaseModel] = useState(BASE_MODELS[0]);
  const [trainingProvider, setTrainingProvider] = useState<TrainingProvider>("LOCAL");
  const [epochs, setEpochs] = useState("3");
  const [learningRate, setLearningRate] = useState("0.0001");
  const [modelName, setModelName] = useState("");
  const [version, setVersion] = useState("v1");
  const [tuningEnabled, setTuningEnabled] = useState(false);
  const [tuningStrategy, setTuningStrategy] = useState<"GRID" | "RANDOM" | "BAYESIAN">("GRID");
  const [maxTrials, setMaxTrials] = useState("3");
  const [distributedEnabled, setDistributedEnabled] = useState(false);

  const versions = useMemo(() => versionsQuery.data ?? [], [versionsQuery.data]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!datasetId || !datasetVersionId) {
      return;
    }
    onSubmit({
      datasetId,
      datasetVersionId,
      modelType,
      baseModel,
      trainingProvider,
      hyperparameters: {
        epochs: Number(epochs),
        learningRate: Number(learningRate),
      },
      trainingConfig: {
        modelName: modelName.trim() || undefined,
        version: version.trim() || undefined,
        ...(distributedEnabled ? { distributedTraining: { enabled: true } } : {}),
      },
      hyperparameterTuning: tuningEnabled
        ? {
            enabled: true,
            strategy: tuningStrategy,
            maxTrials: Number(maxTrials),
            searchSpace: {
              learningRate: [0.0001, 0.0005, 0.001],
              epochs: [2, 3, 5],
            },
          }
        : undefined,
    });
  }

  return (
    <form className="training-job-form" onSubmit={handleSubmit}>
      <div className="dataset-form-field">
        <label className="automation-form-section-title" htmlFor="training-dataset">
          Dataset
        </label>
        <select
          id="training-dataset"
          className="automation-select"
          value={datasetId}
          onChange={(event) => {
            setDatasetId(event.target.value);
            setDatasetVersionId("");
          }}
        >
          <option value="">Select dataset</option>
          {(datasets ?? []).map((dataset) => (
            <option key={dataset.id} value={dataset.id}>
              {dataset.name}
            </option>
          ))}
        </select>
      </div>

      <div className="dataset-form-field">
        <label className="automation-form-section-title" htmlFor="training-version">
          Dataset version
        </label>
        <select
          id="training-version"
          className="automation-select"
          value={datasetVersionId}
          onChange={(event) => setDatasetVersionId(event.target.value)}
          disabled={!datasetId}
        >
          <option value="">Select version</option>
          {versions.map((entry) => (
            <option key={entry.id} value={entry.id}>
              v{entry.versionNumber} ({entry.recordCount} records)
            </option>
          ))}
        </select>
      </div>

      <div className="training-form-grid">
        <div className="dataset-form-field">
          <label className="automation-form-section-title" htmlFor="training-model-type">
            Model type
          </label>
          <select
            id="training-model-type"
            className="automation-select"
            value={modelType}
            onChange={(event) => setModelType(event.target.value as TrainingModelType)}
          >
            {MODEL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="dataset-form-field">
          <label className="automation-form-section-title" htmlFor="training-provider">
            Provider
          </label>
          <select
            id="training-provider"
            className="automation-select"
            value={trainingProvider}
            onChange={(event) => setTrainingProvider(event.target.value as TrainingProvider)}
          >
            {PROVIDERS.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="dataset-form-field">
        <label className="automation-form-section-title" htmlFor="training-base-model">
          Base model
        </label>
        <select
          id="training-base-model"
          className="automation-select"
          value={baseModel}
          onChange={(event) => setBaseModel(event.target.value)}
        >
          {BASE_MODELS.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </div>

      <div className="training-form-grid">
        <div className="dataset-form-field">
          <label className="automation-form-section-title" htmlFor="training-epochs">
            Epochs
          </label>
          <Input id="training-epochs" value={epochs} onChange={(event) => setEpochs(event.target.value)} />
        </div>
        <div className="dataset-form-field">
          <label className="automation-form-section-title" htmlFor="training-lr">
            Learning rate
          </label>
          <Input
            id="training-lr"
            value={learningRate}
            onChange={(event) => setLearningRate(event.target.value)}
          />
        </div>
      </div>

      <div className="training-form-grid">
        <div className="dataset-form-field">
          <label className="automation-form-section-title" htmlFor="training-model-name">
            Output model name
          </label>
          <Input
            id="training-model-name"
            value={modelName}
            onChange={(event) => setModelName(event.target.value)}
            placeholder="my-finetuned-model"
          />
        </div>
        <div className="dataset-form-field">
          <label className="automation-form-section-title" htmlFor="training-model-version">
            Output version
          </label>
          <Input
            id="training-model-version"
            value={version}
            onChange={(event) => setVersion(event.target.value)}
          />
        </div>
      </div>

      <div className="dataset-form-field">
        <label className="automation-checkbox-label">
          <input
            type="checkbox"
            checked={tuningEnabled}
            onChange={(event) => setTuningEnabled(event.target.checked)}
          />
          Enable hyperparameter tuning
        </label>
      </div>

      {tuningEnabled ? (
        <div className="training-form-grid">
          <div className="dataset-form-field">
            <label className="automation-form-section-title" htmlFor="tuning-strategy">
              Tuning strategy
            </label>
            <select
              id="tuning-strategy"
              className="automation-select"
              value={tuningStrategy}
              onChange={(event) =>
                setTuningStrategy(event.target.value as "GRID" | "RANDOM" | "BAYESIAN")
              }
            >
              <option value="GRID">Grid search</option>
              <option value="RANDOM">Random search</option>
              <option value="BAYESIAN">Bayesian (stub)</option>
            </select>
          </div>
          <div className="dataset-form-field">
            <label className="automation-form-section-title" htmlFor="tuning-trials">
              Max trials
            </label>
            <Input
              id="tuning-trials"
              value={maxTrials}
              onChange={(event) => setMaxTrials(event.target.value)}
            />
          </div>
        </div>
      ) : null}

      <div className="dataset-form-field">
        <label className="automation-checkbox-label">
          <input
            type="checkbox"
            checked={distributedEnabled}
            onChange={(event) => setDistributedEnabled(event.target.checked)}
          />
          Enable distributed training
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting || !datasetId || !datasetVersionId}>
        {isSubmitting ? "Queueing…" : "Start training job"}
      </Button>
    </form>
  );
}
