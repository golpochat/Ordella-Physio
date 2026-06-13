"use client";

import type { EvaluationReport, ScorecardIndicator } from "@/lib/training-types";

export type ModelEvaluationScorecardProps = {
  report: EvaluationReport;
};

function indicatorLabel(indicator: ScorecardIndicator) {
  if (indicator === "green") {
    return "Pass";
  }
  if (indicator === "yellow") {
    return "Review";
  }
  return "Fail";
}

export function ModelEvaluationScorecard({ report }: ModelEvaluationScorecardProps) {
  const { scorecard } = report;

  return (
    <section className="training-scorecard">
      <h3>Evaluation scorecard</h3>
      <div className="training-scorecard-grid">
        <ScorecardTile label="Overall" indicator={scorecard.overall} />
        <ScorecardTile label="Quantitative" indicator={scorecard.quantitative} />
        <ScorecardTile label="Safety" indicator={scorecard.safety} />
        <ScorecardTile label="Bias" indicator={scorecard.bias} />
      </div>

      <div className="training-scorecard-columns">
        <div>
          <h4>Strengths</h4>
          <ul>
            {scorecard.strengths.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Weaknesses</h4>
          <ul>
            {scorecard.weaknesses.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Recommendations</h4>
          <ul>
            {scorecard.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ScorecardTile({ label, indicator }: { label: string; indicator: ScorecardIndicator }) {
  return (
    <div className={`training-scorecard-tile training-scorecard-${indicator}`}>
      <div className="dashboard-cell-muted">{label}</div>
      <div className="training-scorecard-value">{indicatorLabel(indicator)}</div>
    </div>
  );
}
