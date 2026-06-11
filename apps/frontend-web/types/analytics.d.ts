export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _linkedin_data_partner_ids?: string[];
    _scroll25?: boolean;
    _scroll50?: boolean;
    _scroll75?: boolean;
    _scroll90?: boolean;
    __ORDELLA_META_PIXEL_ID__?: string;
    __ORDELLA_LINKEDIN_PARTNER_ID__?: string;
    __ORDELLA_HOTJAR_ID__?: string;
    __ORDELLA_CLARITY_ID__?: string;
    __ORDELLA_SENTRY_DSN__?: string;
    __ORDELLA_SENTRY_INITIALIZED__?: boolean;
    Sentry?: {
      init: (options: Record<string, unknown>) => void;
      captureException: (error: unknown) => void;
    };
  }
}
