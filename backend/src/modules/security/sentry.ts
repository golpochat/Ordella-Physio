type SentryModule = {
  init: (options: { dsn: string; environment: string; tracesSampleRate: number }) => void;
  captureMessage: (message: string, level?: "warning" | "error") => void;
};

let sentry: SentryModule | null = null;
let initialized = false;

async function getSentry(): Promise<SentryModule | null> {
  if (sentry) {
    return sentry;
  }

  try {
    const module = (await import("@sentry/node")) as SentryModule;
    sentry = module;
    return module;
  } catch {
    return null;
  }
}

export async function initSentry(dsn: string, environment: string): Promise<void> {
  if (initialized || !dsn) {
    return;
  }

  const module = await getSentry();
  if (!module) {
    return;
  }

  module.init({
    dsn,
    environment,
    tracesSampleRate: environment === "production" ? 0.1 : 1,
  });
  initialized = true;
}

export async function captureSecurityEvent(payload: Record<string, unknown>): Promise<void> {
  const module = await getSentry();
  if (!module) {
    return;
  }

  module.captureMessage(`[security] ${String(payload.type)}: ${String(payload.message)}`, "warning");
}
