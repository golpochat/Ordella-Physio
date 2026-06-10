import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

export type MockEnvOptions = {
  envFile?: string;
  cwd?: string;
  override?: boolean;
};

export function loadTestEnv(options: MockEnvOptions = {}): Record<string, string> {
  const cwd = options.cwd ?? process.cwd();
  const envFile = options.envFile ?? ".env.test";
  const envPath = resolve(cwd, envFile);
  const loaded: Record<string, string> = {};

  if (!existsSync(envPath)) {
    return loaded;
  }

  const content = readFileSync(envPath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");
    loaded[key] = value;

    if (options.override !== false || process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return loaded;
}

export function mockEnv(values: Record<string, string | undefined>): () => void {
  const previous = new Map<string, string | undefined>();

  for (const [key, value] of Object.entries(values)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }

  return () => {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  };
}
