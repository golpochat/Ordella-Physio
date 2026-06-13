import { Injectable } from "@nestjs/common";

export type TuningStrategy = "GRID" | "RANDOM" | "BAYESIAN";

export type HyperparameterTuningConfig = {
  enabled: boolean;
  strategy: TuningStrategy;
  searchSpace: Record<string, unknown>;
  maxTrials?: number;
};

export type TuningCandidate = {
  trialNumber: number;
  hyperparameters: Record<string, unknown>;
};

@Injectable()
export class HyperparameterTuningService {
  generateSearchSpace(config: HyperparameterTuningConfig): TuningCandidate[] {
    if (!config.enabled) {
      return [];
    }

    const searchSpace = config.searchSpace;
    const maxTrials = config.maxTrials ?? 5;

    if (config.strategy === "GRID") {
      return this.gridSearch(searchSpace).slice(0, maxTrials);
    }
    if (config.strategy === "RANDOM") {
      return this.randomSearch(searchSpace, maxTrials);
    }
    return this.bayesianSearch(searchSpace, maxTrials);
  }

  scheduleExperimentRuns(candidates: TuningCandidate[]) {
    return candidates.map((candidate) => ({
      experimentName: `trial-${candidate.trialNumber}`,
      hyperparameters: candidate.hyperparameters,
    }));
  }

  evaluateResults(
    results: Array<{ experimentId: string; metrics: Record<string, unknown> }>,
  ) {
    let best = results[0] ?? null;
    let bestScore = Number.NEGATIVE_INFINITY;

    for (const result of results) {
      const accuracy = Number(result.metrics.accuracy ?? 0);
      const loss = Number(result.metrics.loss ?? result.metrics.finalLoss ?? Infinity);
      const score = accuracy > 0 ? accuracy : loss > 0 ? 1 / loss : 0;
      if (score > bestScore) {
        bestScore = score;
        best = result;
      }
    }

    return { bestExperimentId: best?.experimentId ?? null, bestScore, evaluated: results.length };
  }

  private gridSearch(searchSpace: Record<string, unknown>): TuningCandidate[] {
    const axes = Object.entries(searchSpace).map(([key, value]) => {
      if (Array.isArray(value)) {
        return { key, values: value };
      }
      if (value && typeof value === "object" && Array.isArray((value as { values?: unknown[] }).values)) {
        return { key, values: (value as { values: unknown[] }).values };
      }
      return { key, values: [value] };
    });

    const combos: Record<string, unknown>[] = [{}];
    for (const axis of axes) {
      const next: Record<string, unknown>[] = [];
      for (const combo of combos) {
        for (const axisValue of axis.values) {
          next.push({ ...combo, [axis.key]: axisValue });
        }
      }
      combos.splice(0, combos.length, ...next);
    }

    return combos.map((hyperparameters, index) => ({
      trialNumber: index + 1,
      hyperparameters,
    }));
  }

  private randomSearch(searchSpace: Record<string, unknown>, maxTrials: number): TuningCandidate[] {
    const candidates: TuningCandidate[] = [];
    for (let trial = 1; trial <= maxTrials; trial += 1) {
      const hyperparameters: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(searchSpace)) {
        if (Array.isArray(value) && value.length) {
          hyperparameters[key] = value[Math.floor(Math.random() * value.length)];
        } else if (value && typeof value === "object") {
          const range = value as { min?: number; max?: number; values?: unknown[] };
          if (Array.isArray(range.values) && range.values.length) {
            hyperparameters[key] = range.values[Math.floor(Math.random() * range.values.length)];
          } else if (typeof range.min === "number" && typeof range.max === "number") {
            hyperparameters[key] = range.min + Math.random() * (range.max - range.min);
          } else {
            hyperparameters[key] = value;
          }
        } else {
          hyperparameters[key] = value;
        }
      }
      candidates.push({ trialNumber: trial, hyperparameters });
    }
    return candidates;
  }

  private bayesianSearch(searchSpace: Record<string, unknown>, maxTrials: number): TuningCandidate[] {
    return this.randomSearch(searchSpace, Math.min(maxTrials, 3)).map((candidate, index) => ({
      ...candidate,
      hyperparameters: {
        ...candidate.hyperparameters,
        _bayesianSuggestion: index + 1,
      },
    }));
  }
}
