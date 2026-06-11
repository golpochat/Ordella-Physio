import { trackEvent } from "@/lib/analytics";

const STORAGE_PREFIX = "exp_";

export function getVariant(key: string, variants: [string, string] = ["A", "B"]): string {
  if (typeof window === "undefined") {
    return variants[0];
  }

  const storageKey = `${STORAGE_PREFIX}${key}`;
  const stored = localStorage.getItem(storageKey);

  if (stored && variants.includes(stored)) {
    return stored;
  }

  const chosen = variants[Math.random() < 0.5 ? 0 : 1];
  localStorage.setItem(storageKey, chosen);

  trackEvent("experiment_exposure", {
    experiment_id: key,
    variant: chosen,
  });

  return chosen;
}

export function getExperimentVariant(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(`${STORAGE_PREFIX}${key}`);
}
