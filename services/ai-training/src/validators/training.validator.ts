import { trainingValidationError } from "@/utils/training-errors";

const MODEL_TYPES = new Set(["LLM", "EMBEDDING"]);
const PROVIDERS = new Set(["OPENAI", "AZURE", "LOCAL"]);

export function validateCreateTrainingJob(body: Record<string, unknown>) {
  const fields: Array<{ field: string; message: string }> = [];

  const datasetId = typeof body.datasetId === "string" ? body.datasetId.trim() : "";
  const datasetVersionId =
    typeof body.datasetVersionId === "string" ? body.datasetVersionId.trim() : "";
  const modelType = typeof body.modelType === "string" ? body.modelType.trim().toUpperCase() : "";
  const baseModel = typeof body.baseModel === "string" ? body.baseModel.trim() : "";
  const trainingProvider =
    typeof body.trainingProvider === "string" ? body.trainingProvider.trim().toUpperCase() : "";

  if (!datasetId) fields.push({ field: "datasetId", message: "Dataset is required." });
  if (!datasetVersionId) {
    fields.push({ field: "datasetVersionId", message: "Dataset version is required." });
  }
  if (!MODEL_TYPES.has(modelType)) {
    fields.push({ field: "modelType", message: "Model type must be LLM or EMBEDDING." });
  }
  if (!baseModel) fields.push({ field: "baseModel", message: "Base model is required." });
  if (!PROVIDERS.has(trainingProvider)) {
    fields.push({ field: "trainingProvider", message: "Invalid training provider." });
  }

  if (fields.length) {
    throw trainingValidationError(fields);
  }

  return {
    datasetId,
    datasetVersionId,
    modelType: modelType as "LLM" | "EMBEDDING",
    baseModel,
    trainingProvider: trainingProvider as "OPENAI" | "AZURE" | "LOCAL",
    hyperparameters:
      body.hyperparameters && typeof body.hyperparameters === "object"
        ? (body.hyperparameters as Record<string, unknown>)
        : {},
    trainingConfig:
      body.trainingConfig && typeof body.trainingConfig === "object"
        ? (body.trainingConfig as Record<string, unknown>)
        : {},
    hyperparameterTuning:
      body.hyperparameterTuning && typeof body.hyperparameterTuning === "object"
        ? (body.hyperparameterTuning as Record<string, unknown>)
        : undefined,
  };
}

export function validateCreateExperiment(body: Record<string, unknown>) {
  const experimentName =
    typeof body.experimentName === "string" ? body.experimentName.trim() : "";
  if (!experimentName) {
    throw trainingValidationError([{ field: "experimentName", message: "Name is required." }]);
  }
  return {
    experimentName,
    hyperparameters:
      body.hyperparameters && typeof body.hyperparameters === "object"
        ? (body.hyperparameters as Record<string, unknown>)
        : {},
  };
}
