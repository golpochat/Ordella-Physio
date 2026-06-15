import Script from "next/script";
import { Suspense } from "react";
import GA from "./GA";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
const HOTJAR_ID = process.env.NEXT_PUBLIC_HOTJAR_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

type MarketingAnalyticsProps = {
  nonce?: string;
};

export function MarketingAnalytics({ nonce }: MarketingAnalyticsProps) {
  return (
    <>
      <Script id="ordella-consent" src="/consent.js" strategy="beforeInteractive" nonce={nonce} />

      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
            nonce={nonce}
          />
          <Script id="ordella-ga-init" strategy="afterInteractive" nonce={nonce}>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
            `}
          </Script>
          <Suspense fallback={null}>
            <GA />
          </Suspense>
        </>
      ) : null}

      {META_PIXEL_ID ? (
        <>
          <Script id="ordella-meta-config" strategy="afterInteractive" nonce={nonce}>
            {`window.__ORDELLA_META_PIXEL_ID__ = "${META_PIXEL_ID}";`}
          </Script>
          <Script src="/meta-pixel.js" strategy="afterInteractive" nonce={nonce} />
        </>
      ) : null}

      {LINKEDIN_PARTNER_ID ? (
        <>
          <Script id="ordella-linkedin-config" strategy="afterInteractive" nonce={nonce}>
            {`window.__ORDELLA_LINKEDIN_PARTNER_ID__ = "${LINKEDIN_PARTNER_ID}";`}
          </Script>
          <Script src="/linkedin.js" strategy="afterInteractive" nonce={nonce} />
        </>
      ) : null}

      {HOTJAR_ID ? (
        <>
          <Script id="ordella-hotjar-config" strategy="afterInteractive" nonce={nonce}>
            {`window.__ORDELLA_HOTJAR_ID__ = "${HOTJAR_ID}";`}
          </Script>
          <Script src="/hotjar.js" strategy="afterInteractive" nonce={nonce} />
        </>
      ) : null}

      {CLARITY_ID ? (
        <>
          <Script id="ordella-clarity-config" strategy="afterInteractive" nonce={nonce}>
            {`window.__ORDELLA_CLARITY_ID__ = "${CLARITY_ID}";`}
          </Script>
          <Script src="/clarity.js" strategy="afterInteractive" nonce={nonce} />
        </>
      ) : null}
    </>
  );
}
