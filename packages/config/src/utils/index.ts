export function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function parseBoolean(value: string | undefined, fallback = false): boolean {
  if (value === undefined) return fallback;
  const normalized = value.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) return true;
  if (["false", "0", "no", "off"].includes(normalized)) return false;
  throw new Error(`Invalid boolean environment value: ${value}`);
}

export function parseNumber(value: string | undefined, fallback?: number): number {
  if (value === undefined) {
    if (fallback === undefined) {
      throw new Error("Missing required numeric environment variable");
    }
    return fallback;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid numeric environment value: ${value}`);
  }
  return parsed;
}

export function isProduction(nodeEnv: string = process.env.NODE_ENV ?? "development"): boolean {
  return nodeEnv === "production";
}

export function isDevelopment(nodeEnv: string = process.env.NODE_ENV ?? "development"): boolean {
  return nodeEnv === "development";
}

export function isTest(nodeEnv: string = process.env.NODE_ENV ?? "development"): boolean {
  return nodeEnv === "test";
}

export function resolveJwtSecret(env: {
  JWT_SECRET?: string;
  JWT_ACCESS_SECRET?: string;
}): string {
  return env.JWT_SECRET ?? env.JWT_ACCESS_SECRET ?? "";
}

export function createLazyConfig<T extends object>(factory: () => T): T {
  let cached: T | undefined;

  const getConfig = (): T => {
    if (!cached) {
      cached = factory();
    }
    return cached;
  };

  return new Proxy({} as T, {
    get(_target, prop) {
      const value = getConfig()[prop as keyof T];
      return typeof value === "function" ? (value as (...args: unknown[]) => unknown).bind(getConfig()) : value;
    },
  });
}
