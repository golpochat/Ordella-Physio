const isDev = process.env.NODE_ENV === "development";

const analyticsScriptOrigins = [
  "https://www.googletagmanager.com",
  "https://connect.facebook.net",
  "https://snap.licdn.com",
  "https://static.hotjar.com",
  "https://browser.sentry-cdn.com",
  "https://www.clarity.ms",
];

const analyticsConnectOrigins = [
  "https://www.google-analytics.com",
  "https://region1.google-analytics.com",
  "https://www.googletagmanager.com",
  "https://connect.facebook.net",
  "https://snap.licdn.com",
  "https://static.hotjar.com",
  "https://*.hotjar.com",
  "https://*.hotjar.io",
  "https://browser.sentry-cdn.com",
  "https://*.ingest.sentry.io",
  "https://www.clarity.ms",
  "https://*.clarity.ms",
];

function readConnectOrigins(): string[] {
  const origins = new Set<string>(["'self'"]);

  for (const value of [
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.NEXT_PUBLIC_CLINIC_BACKEND_URL,
    process.env.NEXT_PUBLIC_API_GATEWAY_URL,
  ]) {
    if (value) {
      origins.add(value);
    }
  }

  for (const origin of analyticsConnectOrigins) {
    origins.add(origin);
  }

  return [...origins];
}

export type CspOptions = {
  nonce?: string;
  reportUri?: string;
};

export function buildContentSecurityPolicy(options: CspOptions = {}): string {
  // Nonce + 'unsafe-inline' together cause browsers to ignore unsafe-inline, which breaks
  // Next.js dev hydration scripts. Use nonce only in production.
  const useNonce =
    !isDev && Boolean(options.nonce) && process.env.DISABLE_NONCE_CSP !== "true";
  const scriptSrc = ["'self'"];

  if (useNonce && options.nonce) {
    scriptSrc.push(`'nonce-${options.nonce}'`, "'strict-dynamic'");
  } else if (isDev) {
    scriptSrc.push("'unsafe-inline'", "'unsafe-eval'");
  } else {
    scriptSrc.push("'unsafe-inline'");
  }

  for (const origin of analyticsScriptOrigins) {
    scriptSrc.push(origin);
  }

  const directives = [
    "default-src 'self'",
    `script-src ${scriptSrc.join(" ")}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self'",
    `connect-src ${readConnectOrigins().join(" ")}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];

  if (options.reportUri) {
    directives.push(`report-uri ${options.reportUri}`);
  }

  return directives.join("; ");
}
