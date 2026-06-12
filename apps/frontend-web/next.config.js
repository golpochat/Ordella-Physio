/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === "development";

const analyticsScriptOrigins = [
  "https://www.googletagmanager.com",
  "https://connect.facebook.net",
  "https://snap.licdn.com",
  "https://static.hotjar.com",
  "https://browser.sentry-cdn.com",
  "https://www.clarity.ms",
].join(" ");

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
].join(" ");

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isDev ? ["'unsafe-eval'"] : []),
  ...analyticsScriptOrigins.split(" "),
].join(" ");

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self'",
      `connect-src 'self' ${analyticsConnectOrigins}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "@ordella/shared-icons"],
  },
  transpilePackages: [
    "@ordella/ui",
    "@ordella/shared",
    "@ordella/utils",
    "@ordella/config",
    "@ordella/validation",
    "@ordella/security",
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
