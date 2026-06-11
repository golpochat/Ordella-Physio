# Marketing Launch-Readiness Checklist

**Product:** Ordella Physio marketing site  
**App:** `apps/frontend-web`  
**Production URL (configured):** `https://ordella.com` (`app/(marketing)/seo.ts`)  
**Last updated:** 2026-06-10

Use this checklist before every production deploy of the public marketing site. Mark items complete only after manual verification in a **production-like build** (`npm run build && npm run start`), not dev-only (`next dev`).

**Sign-off roles (recommended):** Engineering · Design · Content · Marketing · Legal/Compliance

---

## Quick reference — marketing routes

| Route | Page |
|-------|------|
| `/` | Home |
| `/product` | Product overview |
| `/features` | Features |
| `/solutions` | Solutions |
| `/pricing` | Pricing |
| `/about` | About |
| `/blog` | Blog index |
| `/blog/[slug]` | Blog post (6 slugs in `lib/marketing-content.ts`) |
| `/faq` | FAQ |
| `/contact` | Contact |

**Auth links from marketing:** `/login`, `/register` (app routes, not marketing layout)

---

## How to verify

```bash
cd apps/frontend-web
npm run typecheck
npm run build
npm run start   # default port 3010; use production env vars
```

- **Health:** `GET /api/health` → `{ "status": "ok" }`
- **Sitemap:** `GET /sitemap.xml`
- **Robots:** `GET /robots.txt` and `GET /robots` (Next metadata route)
- **Security headers:** `curl -I https://ordella.com` (or staging URL)
- **Lighthouse:** Chrome DevTools → Lighthouse (mobile + desktop) on Home, Pricing, Contact
- **axe / WAVE:** Browser extension on all marketing routes
- **GA4:** DebugView with `NEXT_PUBLIC_GA_MEASUREMENT_ID` set

---

# P0 — Must fix before launch

> **Go/No-Go rule:** Do not launch until every P0 item below is checked.

---

## 1. Functionality

### Page load & stability

- [ ] Home (`/`) loads with HTTP 200 and no React error boundary fallback
- [ ] Product (`/product`) loads without errors
- [ ] Features (`/features`) loads without errors
- [ ] Solutions (`/solutions`) loads without errors
- [ ] Pricing (`/pricing`) loads without errors
- [ ] About (`/about`) loads without errors
- [ ] Blog index (`/blog`) loads without errors
- [ ] All blog slugs load without errors (`welcome-to-ordella`, `streamline-clinic-operations`, `role-based-dashboards`, `gdpr-ready-clinic-software`, `reduce-no-shows`, `billing-made-simple`)
- [ ] FAQ (`/faq`) loads without errors
- [ ] Contact (`/contact`) loads without errors
- [ ] No 404s on any navbar link (`lib/marketing-nav.ts`)
- [ ] No 500s on any marketing route under normal traffic

### Console & hydration

- [ ] Zero uncaught errors in browser console on every marketing page (hard refresh)
- [ ] Zero React hydration mismatch warnings on every marketing page
- [ ] No repeated `global_js_error` events in GA4 (see `analytics/monitor.tsx`)
- [ ] `ErrorBoundary` does not render on any standard user flow

### Links & navigation

- [ ] All internal navbar links resolve to correct pages
- [ ] All footer links resolve (Product, Company, Social columns in `Footer.tsx`)
- [ ] Logo links to `/` from navbar and footer
- [ ] `/login` link works from navbar (desktop + mobile)
- [ ] `/register` CTA on Features page (`CTASection`) resolves (route: `app/(auth)/register/page.tsx`)
- [ ] Hero secondary CTA → `/product` works
- [ ] All pricing card CTAs → `/contact` (or configured `ctaHref`) work
- [ ] Blog cards link to correct `/blog/[slug]` URLs
- [ ] Blog pagination (if multiple pages) navigates correctly
- [ ] External social links open in new tab with `rel="noopener noreferrer"` (LinkedIn, Twitter, Instagram in footer)
- [ ] `mailto:support@ordella.com` contact CTA opens mail client
- [ ] `#contact-form` anchor on contact page scrolls to form
- [ ] No broken `href="#"` or dead links anywhere on marketing site

### CTAs & experiments

- [ ] Hero A/B CTA (`ExperimentCta` / `hero_cta`) navigates to `/contact`
- [ ] Footer A/B CTA (`footer_cta`) navigates to `/contact`
- [ ] Solutions page CTA (`solutions_cta`) navigates to `/contact`
- [ ] Contact page CTA (`contact_cta`) works (email + form anchor variants)
- [ ] Pricing Pro card CTA experiment (`pricing_pro_cta`) works
- [ ] Exit-intent modal CTA → `/contact` works; dismiss does not trap focus

### Contact form (critical path)

- [ ] Form submits via `POST /api/contact` with valid payload `{ name, email, message }` (+ optional `clinicName`)
- [ ] Success state shown to user after successful submit
- [ ] Error state shown on 4xx/5xx responses
- [ ] Honeypot field (`website`) empty submissions succeed; filled submissions rejected (403)
- [ ] Rate limiting returns 429 after 20 requests/min/IP on `/api/*` (`middleware.ts`)
- [ ] **Production backend wired:** contact submissions reach email/CRM/webhook (currently `console.log` only in `app/api/contact/route.ts` — **must be replaced before launch**)
- [ ] Confirmation email or auto-reply sent to submitter (if promised in copy)

### Assets & layout

- [ ] Favicon loads (`/favicon.ico`, `/favicon.svg`)
- [ ] Logo loads on all pages (`MarketingLogo.tsx` / `/logo.svg`)
- [ ] Product mockup images render on Home and Product hero
- [ ] OpenGraph image exists and loads (`/og-default.png`)
- [ ] No broken images (Network tab → filter Img, no 404s)
- [ ] No visible layout shift on initial paint (hero, navbar, fonts) — CLS acceptable visually
- [ ] Page transition (`PageTransition.tsx`) does not cause flash of unstyled content

### Responsive & interaction

- [ ] Mobile (≤767px): navbar hamburger opens/closes; all links reachable
- [ ] Tablet (768–1023px): grids reflow correctly; no horizontal scroll
- [ ] Desktop (≥1024px): full nav visible; content max-width consistent (`marketing-container`)
- [ ] XL (≥1280px): no over-stretched text lines or broken grids
- [ ] All animations run at 60fps on mid-range mobile (no visible jank on scroll/hover)
- [ ] `prefers-reduced-motion: reduce` disables fade-in, stagger, and micro-interactions

---

## 2. SEO (P0)

- [ ] Every marketing page exports `metadata` via `generateSEO()` or layout default
- [ ] Home has unique title: `Home | Ordella Physio`
- [ ] Each route has unique `<title>` — no duplicates across pages
- [ ] Each route has unique `meta description` (not empty, not identical)
- [ ] Canonical URL set per page via `alternates.canonical` (`seo.ts`)
- [ ] `metadataBase` matches production domain (`https://ordella.com`)
- [ ] `siteConfig.url` updated to actual production domain (not staging)
- [ ] OpenGraph `og:image` resolves to absolute URL and returns 200
- [ ] Twitter `summary_large_image` card validates ([Twitter Card Validator](https://cards-dev.twitter.com/validator) or equivalent)
- [ ] `robots.txt` allows crawling (`public/robots.txt` + `app/robots.ts`)
- [ ] `sitemap.xml` generated and lists all static routes + blog slugs (`app/sitemap.ts`)
- [ ] Sitemap URL referenced in robots: `https://ordella.com/sitemap.xml`
- [ ] JSON-LD on Home and Pricing validates ([Google Rich Results Test](https://search.google.com/test/rich-results)) — `softwareApplicationJsonLd`
- [ ] `lang="en"` on `<html>` (`app/layout.tsx`)
- [ ] No marketing pages blocked by `noindex` unintentionally

---

## 3. Performance (P0)

- [ ] **LCP ≤ 2.5s** on mobile (Lighthouse, throttled) on Home
- [ ] **CLS ≤ 0.1** on mobile on Home
- [ ] **INP ≤ 200ms** on Home and Contact (Lighthouse / Chrome UX)
- [ ] Hero product mockup uses `priority` where applicable (`Hero.tsx`)
- [ ] Inter fonts preloaded (`app/layout.tsx` → `/fonts/Inter-*.woff2`)
- [ ] Fonts use `font-display: swap` (`styles/globals.css` `@font-face`)
- [ ] Next.js image optimization enabled (`formats: avif, webp` in `next.config.js`)
- [ ] Production build completes without errors (`npm run build`)
- [ ] No critical render-blocking third-party scripts in `<head>` before first paint
- [ ] Static assets (`/_next/static/`, `/fonts/`) return cache headers (`middleware.ts`)

---

## 4. Accessibility (P0)

- [ ] Skip-to-content link visible on keyboard focus and jumps to `#main-content` (`layout.tsx`, `styles/a11y.css`)
- [ ] Single logical `<main>` landmark per page
- [ ] `<header>`, `<footer>`, `<nav>` landmarks present with accessible names
- [ ] All form inputs have associated `<label>` (`ContactForm.tsx`)
- [ ] Contact form errors announced (`role="alert"`)
- [ ] All icon-only buttons have `aria-label` (navbar menu toggle)
- [ ] Navbar current page indicated (`aria-current="page"`)
- [ ] Keyboard Tab order is logical on every page
- [ ] All interactive elements reachable and operable via keyboard alone
- [ ] Focus ring visible on links, buttons, inputs (`focus-ring` / `a11y.css`)
- [ ] Color contrast ≥ 4.5:1 for body text (`--brand-gray: #4a5568` on white)
- [ ] Color contrast ≥ 3:1 for large headings and UI components
- [ ] FAQ accordion/items expand/collapse with keyboard
- [ ] Exit-intent modal traps focus and closes on Escape
- [ ] Reduced-motion preferences respected (`animations.css`, `micro.css`, `motion.css`)

---

## 5. Security (P0)

- [ ] `X-Frame-Options: DENY` present on responses
- [ ] `X-Content-Type-Options: nosniff` present
- [ ] `Referrer-Policy: strict-origin-when-cross-origin` present
- [ ] `Permissions-Policy` restricts camera, microphone, geolocation
- [ ] `Content-Security-Policy` present and does not break GA4, Sentry, or required assets
- [ ] `Strict-Transport-Security` present (HTTPS deployments only)
- [ ] `X-Powered-By` header removed (`poweredByHeader: false`)
- [ ] Rate limiting active on `/api/contact` and `/api/health`
- [ ] Contact payload sanitized server-side (`lib/security.ts` → `parseContactPayload`)
- [ ] Bot/honeypot detection rejects automated submissions
- [ ] No secrets in client bundle (grep `NEXT_PUBLIC_` — only non-sensitive IDs)
- [ ] `.env` / `.env.local` not committed; production secrets in secure vault
- [ ] No client-side `mailto:`-only contact flow as sole submission path (API must work)
- [ ] CSP `script-src` does not allow arbitrary third-party domains beyond documented analytics list

---

## 6. Analytics & tracking (P0)

- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` set in production environment
- [ ] GA4 script loads only when measurement ID is set (`MarketingAnalytics.tsx`)
- [ ] GA4 pageviews fire on route change (`GA.tsx` → `trackPageView`)
- [ ] `cta_click` events fire with `location` + `label` on all `CtaLink` clicks
- [ ] Scroll-depth events fire once each: `scroll_25`, `scroll_50`, `scroll_75`, `scroll_90`
- [ ] `contact_form_submit` fires on successful form submission
- [ ] Funnel events fire: `homepage_to_pricing`, `pricing_to_contact`, `contact_submit` (`FunnelTracker.tsx`)
- [ ] `experiment_exposure` fires for A/B tests (`experiments/ab.ts`)
- [ ] No duplicate pageview events per navigation
- [ ] No duplicate `cta_click` on single click
- [ ] GA4 DebugView shows events in staging before go-live
- [ ] Consent mode configured if required by jurisdiction (`public/consent.js`)

---

## 10. Final Go/No-Go (P0)

- [ ] **All P0 items above are checked**
- [ ] No critical console errors on any marketing page in production build
- [ ] No broken user flows: Home → Pricing → Contact → Submit
- [ ] No broken layouts on mobile, tablet, desktop
- [ ] No missing page-level metadata on any route
- [ ] GA4 receiving pageviews and conversion events in production
- [ ] Contact form delivers to real inbox/CRM (not `console.log`)
- [ ] `GET /api/health` returns 200 in production
- [ ] Production deploy completes without rollback
- [ ] `npm run build` passes with zero errors
- [ ] Smoke test completed on live URL within 15 minutes of deploy
- [ ] Rollback plan documented and tested

---

# P1 — Should fix before or immediately after launch

---

## 2. SEO (P1)

- [ ] Per-blog-post unique OG image (optional; currently shared `og-default.png`)
- [ ] Blog posts have full article body content (currently placeholder text in `blog/[slug]/page.tsx`)
- [ ] `hreflang` tags if multi-locale launch planned
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Validate structured data on Product page if additional schema added
- [ ] `og-default.png` optimized (file size; currently a large placeholder asset)
- [ ] Custom OG images per major page (Home, Pricing, Product)

---

## 3. Performance (P1)

- [ ] LCP ≤ 2.5s on **all** key pages (Pricing, Contact, Product), not just Home
- [ ] CLS ≤ 0.1 on all key pages
- [ ] Total page weight ≤ 1.5 MB on mobile Home
- [ ] JavaScript bundle analyzed; no large unused chunks on marketing routes
- [ ] CSS purged — no significant unused Tailwind in production bundle
- [ ] Third-party scripts (Meta, LinkedIn, Hotjar, Clarity) load only when env vars set
- [ ] `critters` / `optimizeCss` verified in production HTML (inline critical CSS)
- [ ] `compress: true` gzip/brotli confirmed at CDN/reverse-proxy layer
- [ ] CDN caching for `public/` assets (fonts, og image, favicons)
- [ ] Lighthouse Performance score ≥ 90 (mobile) on Home

---

## 4. Accessibility (P1)

- [ ] Full axe-core scan: zero critical/serious violations on all pages
- [ ] Screen reader walkthrough (VoiceOver or NVDA) on Home, Contact, Pricing
- [ ] All decorative emojis marked `aria-hidden` where used as icons
- [ ] Blog category filters accessible (keyboard + screen reader)
- [ ] Pricing toggle (`PricingToggle`) has accessible name and state
- [ ] Color contrast re-checked on brand CTA sections (primary background + white text)
- [ ] Focus order verified inside mobile menu after open/close
- [ ] WCAG 2.1 AA audit documented with remediation log

---

## 6. Analytics & tracking (P1)

- [ ] `exit_intent_shown`, `exit_intent_cta`, `exit_intent_dismissed` events verified
- [ ] `slow_load` and `slow_lcp` monitoring events reviewed (`monitor.tsx`)
- [ ] `marketing_error` events wired to alerting
- [ ] Sentry (`NEXT_PUBLIC_SENTRY_DSN`) capturing client errors in production
- [ ] Uptime monitoring configured (`public/uptime.js` or external ping on `/api/health`)
- [ ] Funnel report built in GA4 (Home → Pricing → Contact → Submit)
- [ ] CTA performance dashboard by `location` dimension
- [ ] Optional: Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) firing `PageView`
- [ ] Optional: LinkedIn Insight (`NEXT_PUBLIC_LINKEDIN_PARTNER_ID`) firing
- [ ] Optional: Hotjar (`NEXT_PUBLIC_HOTJAR_ID`) recording sessions
- [ ] Optional: Microsoft Clarity (`NEXT_PUBLIC_CLARITY_ID`) recording sessions
- [ ] Cookie consent banner integrated with analytics loading (GDPR)

---

## 7. Consistency & polish (P1)

- [ ] Hero sections use `py-3xl` (`MarketingPageHero`, `Hero`)
- [ ] Major sections use `py-2xl` (`HomeSection`, `FeatureSection`, etc.)
- [ ] Subsections use `py-xl` where applicable
- [ ] Card grids use `gap-lg`; large layouts use `gap-xl` / `gap-2xl`
- [ ] All cards use `marketing-card` pattern: `rounded-lg`, `p-xl`, `shadow-soft`, hover lift
- [ ] Buttons use `marketingButtonPrimaryClass` / `marketingButtonSecondaryClass`
- [ ] h1: `text-5xl leading-tight`; h2: `text-4xl leading-tight`; h3/h4 per `marketingHeading`
- [ ] Body copy uses `text-brand-gray leading-relaxed`
- [ ] Fade-in animations: 0.8s duration; stagger: 0.1s increments
- [ ] No leftover `btn-brand-glow`-only buttons (migrate to token classes)
- [ ] No unused marketing components in `components/marketing/`
- [ ] No duplicate `robots.txt` conflicts between `public/robots.txt` and `app/robots.ts`
- [ ] Design tokens (`styles/tokens.css`) single source of truth — no hardcoded px values in components
- [ ] Visual QA sign-off: spacing, shadows, radius consistent across all 10 routes

---

## 8. Content (P1)

- [ ] All marketing copy proofread (spelling, grammar, tone)
- [ ] No lorem ipsum anywhere on marketing site
- [ ] Blog posts have real article content (remove placeholder paragraph in `blog/[slug]/page.tsx`)
- [ ] Testimonials use real quotes with permission, or are clearly labeled as examples
- [ ] About page team section: replace "Coming Soon" placeholders or remove until ready
- [ ] Pricing amounts consistent across Pricing page, `marketing-content.ts`, and JSON-LD (`€24` starter in schema vs `€24/€49/€99` on cards — verify against business intent)
- [ ] Yearly/monthly pricing toggle math verified
- [ ] Contact email `support@ordella.com` is live and monitored
- [ ] Contact address/hours (Dublin, Mon–Fri 9–17) accurate
- [ ] FAQ answers reviewed by product/legal
- [ ] Legal pages linked if required: Privacy Policy, Terms of Service, Cookie Policy
- [ ] Register flow copy aligns with marketing CTAs ("Get Started")

---

## 9. Branding (P1)

- [ ] Logo consistent in navbar, footer, and OG contexts
- [ ] Brand primary `#4f46e5` consistent across buttons, links, accents
- [ ] Spacing scale from `styles/tokens.css` applied site-wide
- [ ] Inter font used consistently (display + body)
- [ ] Favicon correct in browser tab (ICO + SVG)
- [ ] Apple touch icon / `logo-mark.svg` correct
- [ ] OG image reflects current brand (not generic placeholder)
- [ ] Gradient heroes (`bg-brand-gradient-hero`) consistent across page heroes
- [ ] Footer social icons/links point to real company profiles (not generic twitter.com/instagram.com)

---

## 5. Security (P1)

- [ ] Replace in-memory rate limiting with Redis/shared store for multi-instance deploys
- [ ] Contact API wired to spam filtering (e.g. reCAPTCHA, Turnstile) if bot traffic expected
- [ ] Security headers verified on CDN edge (not stripped by proxy)
- [ ] Dependency audit clean: `npm audit` — no critical vulnerabilities in production deps
- [ ] CSP tested with all enabled analytics providers simultaneously

---

# P2 — Nice to fix (post-launch or polish sprint)

---

## 3. Performance (P2)

- [ ] Lighthouse Performance 100 on desktop Home
- [ ] Self-host analytics scripts vs third-party CDN
- [ ] Service worker / offline page for marketing (optional)
- [ ] Prefetch strategy reviewed (`Link prefetch` on nav — bandwidth vs speed)
- [ ] Image CDN with automatic format negotiation
- [ ] Bundle `@ordella/shared-icons` tree-shaken to icons used on marketing pages only

---

## 4. Accessibility (P2)

- [ ] AAA contrast on key body text where feasible
- [ ] Automated a11y tests in CI (axe-playwright / pa11y)
- [ ] High-contrast mode support verified
- [ ] Video/media captions if demo videos added

---

## 6. Analytics (P2)

- [ ] Server-side GA4 Measurement Protocol for form submissions (redundant conversion tracking)
- [ ] A/B test results dashboard for `hero_cta`, `footer_cta`, `pricing_pro_cta`, `solutions_cta`, `contact_cta`
- [ ] Heatmaps reviewed after 2 weeks (Hotjar/Clarity)
- [ ] Attribution modeling for multi-touch paths

---

## 7. Consistency & polish (P2)

- [ ] Dark mode for marketing site (if brand requires)
- [ ] Shared `MarketingPageHero` extended with optional eyebrow/kicker
- [ ] Illustration system or photography style guide applied
- [ ] Micro-interaction audit: ripple, card-tilt, link-underline feel consistent
- [ ] Print stylesheet for Pricing and Product pages

---

## 8. Content (P2)

- [ ] Case studies page with real clinic logos
- [ ] Customer logo bar on Home ("Trusted by clinics")
- [ ] Video demo embedded on Product page
- [ ] Press kit / media page
- [ ] Localized copy (en-IE → en-GB or multi-language)
- [ ] Changelog / release notes linked from blog
- [ ] Integration partner logos on Product page

---

## 9. Branding (P2)

- [ ] Animated logo variant for loading states
- [ ] Custom 1200×630 OG templates per page type in Figma
- [ ] Brand guidelines PDF linked from About
- [ ] PWA manifest + installable marketing app icon set (192, 512)

---

## 1. Functionality (P2)

- [ ] Blog search filters posts client-side correctly with empty states
- [ ] Blog category filter chips work across all categories
- [ ] Contact form optional fields validated (clinic name length, etc.)
- [ ] 404 page styled for marketing section (custom `not-found.tsx`)
- [ ] Staging environment password-protected before public DNS cutover

---

# Environment variables — production checklist

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | P0 | GA4 |
| `NEXT_PUBLIC_APP_URL` | P0 | Canonical base URL helpers |
| `NEXT_PUBLIC_SENTRY_DSN` | P1 | Error monitoring |
| `NEXT_PUBLIC_META_PIXEL_ID` | P2 | Meta ads |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | P2 | LinkedIn ads |
| `NEXT_PUBLIC_HOTJAR_ID` | P2 | Heatmaps |
| `NEXT_PUBLIC_CLARITY_ID` | P2 | Session replay |

---

# Known pre-launch gaps (as of checklist creation)

Track these explicitly — they are **not launch-ready** until resolved:

| Gap | Priority | Location |
|-----|----------|----------|
| Contact form logs to server console only; no email/CRM | **P0** | `app/api/contact/route.ts` |
| Blog article body is placeholder text | **P1** | `app/(marketing)/blog/[slug]/page.tsx` |
| Testimonials use fictional names | **P1** | `app/(marketing)/page.tsx` |
| Team cards show "Coming Soon" | **P1** | `app/(marketing)/about/page.tsx` |
| `og-default.png` is a large placeholder | **P1** | `public/og-default.png` |
| Footer social URLs are generic (not company profiles) | **P1** | `components/marketing/Footer.tsx` |
| In-memory rate limit resets on deploy / multi-instance | **P1** | `middleware.ts` |
| Pricing values may differ between JSON-LD (`€24`) and UI cards | **P1** | `seo.ts` vs `PricingPageContent.tsx` |

---

# Launch sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Engineering | | | |
| Design | | | |
| Content | | | |
| Marketing | | | |
| Product | | | |

**Launch decision:** ☐ GO  ☐ NO-GO

**Notes:**

---

*Generated for Ordella Physio `apps/frontend-web` marketing site. Re-run this checklist before each major marketing release.*
