"use client";

import type { OptimizationReport } from "@/lib/cost-types";

export type OptimizationSuggestionsProps = {
  report: OptimizationReport | null | undefined;
};

export function OptimizationSuggestions({ report }: OptimizationSuggestionsProps) {
  if (!report) return null;

  return (
    <div className="ai-cost-optimization">
      <h3>Optimization suggestions</h3>
      <p className="ai-cost-savings-total">
        Estimated monthly savings: <strong>${report.totalEstimatedMonthlySavings.toFixed(2)}</strong>
      </p>

      {report.cheaperModels.length ? (
        <section>
          <h4>Cheaper models</h4>
          <ul>
            {report.cheaperModels.map((entry) =>
              entry.suggestion ? (
                <li key={entry.modelId}>
                  Switch from <strong>{entry.modelId}</strong> to <strong>{entry.suggestion.modelId}</strong> — save ~
                  {entry.suggestion.estimatedSavingsPercent}% ({entry.suggestion.reason})
                </li>
              ) : null,
            )}
          </ul>
        </section>
      ) : null}

      <section>
        <h4>Max tokens</h4>
        <p>
          Suggested cap: {report.maxTokens.suggestedMaxTokens} tokens (current avg: {report.maxTokens.currentAvgTokens}) — ~
          {report.maxTokens.estimatedSavingsPercent}% savings
        </p>
      </section>

      <section>
        <h4>Caching</h4>
        <p>{report.caching.globalRecommendation}</p>
        {report.caching.suggestions.length ? (
          <ul>
            {report.caching.suggestions.map((s) => (
              <li key={s.feature}>
                {s.feature}: {s.strategy} (~{s.estimatedSavingsPercent}% savings)
              </li>
            ))}
          </ul>
        ) : null}
      </section>

      {report.truncation.rules.length ? (
        <section>
          <h4>Truncation rules</h4>
          <ul>
            {report.truncation.rules.map((rule) => (
              <li key={rule.modelId}>
                {rule.modelId}: max {rule.maxInputTokens} input tokens (~{rule.estimatedSavingsPercent}% savings)
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
