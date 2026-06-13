export function populationStabilityIndex(baseline: number[], current: number[]) {
  let psi = 0;
  for (let index = 0; index < baseline.length; index += 1) {
    const expected = Math.max(baseline[index] ?? 0, 0.0001);
    const actual = Math.max(current[index] ?? 0, 0.0001);
    psi += (actual - expected) * Math.log(actual / expected);
  }
  return Number(Math.abs(psi).toFixed(4));
}

export function klDivergence(baseline: number[], current: number[]) {
  let divergence = 0;
  for (let index = 0; index < baseline.length; index += 1) {
    const p = Math.max(baseline[index] ?? 0, 0.0001);
    const q = Math.max(current[index] ?? 0, 0.0001);
    divergence += p * Math.log(p / q);
  }
  return Number(Math.abs(divergence).toFixed(4));
}

export function jensenShannonDivergence(baseline: number[], current: number[]) {
  const mixture = baseline.map((value, index) => (value + (current[index] ?? 0)) / 2);
  const left = klDivergence(baseline, mixture);
  const right = klDivergence(current, mixture);
  return Number(((left + right) / 2).toFixed(4));
}

export function kolmogorovSmirnovStatistic(baseline: number[], current: number[]) {
  const maxLength = Math.max(baseline.length, current.length);
  let maxDiff = 0;
  for (let index = 0; index < maxLength; index += 1) {
    const baselineCdf = baseline.slice(0, index + 1).reduce((sum, value) => sum + value, 0);
    const currentCdf = current.slice(0, index + 1).reduce((sum, value) => sum + value, 0);
    maxDiff = Math.max(maxDiff, Math.abs(baselineCdf - currentCdf));
  }
  return Number(maxDiff.toFixed(4));
}

export function cosineDistance(left: number[], right: number[]) {
  const length = Math.min(left.length, right.length);
  let dot = 0;
  let leftNorm = 0;
  let rightNorm = 0;
  for (let index = 0; index < length; index += 1) {
    dot += (left[index] ?? 0) * (right[index] ?? 0);
    leftNorm += (left[index] ?? 0) ** 2;
    rightNorm += (right[index] ?? 0) ** 2;
  }
  if (!leftNorm || !rightNorm) {
    return 1;
  }
  return Number((1 - dot / (Math.sqrt(leftNorm) * Math.sqrt(rightNorm))).toFixed(4));
}

export function severityFromScore(score: number): "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" {
  if (score >= 0.45) {
    return "CRITICAL";
  }
  if (score >= 0.3) {
    return "HIGH";
  }
  if (score >= 0.15) {
    return "MEDIUM";
  }
  return "LOW";
}
