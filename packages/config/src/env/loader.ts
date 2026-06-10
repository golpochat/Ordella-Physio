import { config as loadDotenv } from "dotenv";
import type { ZodSchema, z } from "zod";
import { fullEnvSchema, type FullEnv } from "./schema";

export type LoadEnvOptions = {
  path?: string;
  override?: boolean;
};

function formatZodError(error: { issues: Array<{ path: (string | number)[]; message: string }> }): string {
  return error.issues
    .map((issue) => `${issue.path.join(".") || "env"}: ${issue.message}`)
    .join("\n");
}

export function loadEnv<S extends ZodSchema>(
  schema: S,
  options: LoadEnvOptions = {},
): z.output<S> {
  loadDotenv({ path: options.path, override: options.override ?? false });

  const parsed = schema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(`Invalid environment configuration:\n${formatZodError(parsed.error)}`);
  }

  return parsed.data;
}

let cachedEnv: FullEnv | undefined;

export function getValidatedEnv(options: LoadEnvOptions = {}): FullEnv {
  if (!cachedEnv) {
    cachedEnv = loadEnv(fullEnvSchema, options);
  }
  return cachedEnv;
}

/** Lazily validated environment using the full cross-service schema. */
export const env: FullEnv = new Proxy({} as FullEnv, {
  get(_target, prop) {
    return getValidatedEnv()[prop as keyof FullEnv];
  },
});

export { fullEnvSchema };
