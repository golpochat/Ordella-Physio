import Script from "next/script";
import Monitor from "./monitor";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

type MarketingReliabilityProps = {
  nonce?: string;
};

export function MarketingReliability({ nonce }: MarketingReliabilityProps) {
  return (
    <>
      <Monitor />

      {SENTRY_DSN ? (
        <>
          <Script id="ordella-sentry-config" strategy="afterInteractive" nonce={nonce}>
            {`window.__ORDELLA_SENTRY_DSN__ = "${SENTRY_DSN}";`}
          </Script>
          <Script src="/sentry.js" strategy="afterInteractive" nonce={nonce} />
        </>
      ) : null}

      <Script src="/uptime.js" strategy="afterInteractive" nonce={nonce} />
    </>
  );
}
