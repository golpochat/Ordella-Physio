# Ordella Physio — Pricing Model

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Placeholder — finalize with finance before public launch

> **Disclaimer:** All figures below are placeholders for GTM planning. Final pricing requires finance sign-off and Stripe live price configuration (`STRIPE_PRICE_STARTER`, `STRIPE_PRICE_PRO`, `STRIPE_PRICE_ENTERPRISE`).

---

## Pricing Philosophy

- **Per-clinic base** — Each tenant (clinic) pays a monthly or annual subscription.
- **Therapist seats included** — Plans include a therapist cap; additional seats available as add-ons.
- **Value-aligned tiers** — Starter for solo/small, Pro for growing clinics, Enterprise for groups and compliance-heavy organizations.
- **Transparent upgrade path** — Clinics can move Starter → Pro → Enterprise without migration.

---

## Three-Tier Overview

| Tier | Monthly (placeholder) | Annual (placeholder) | Therapists included | Best for |
|------|----------------------|----------------------|---------------------|----------|
| **Starter** | $49 / clinic / mo | $39 / clinic / mo (billed yearly) | Up to 2 | Solo practitioners, new clinics |
| **Pro** | $99 / clinic / mo | $79 / clinic / mo (billed yearly) | Up to 10 | Growing practices, multi-therapist clinics |
| **Enterprise** | Custom | Custom | Unlimited | Clinic groups, franchises, compliance-heavy orgs |

*Annual pricing reflects ~20% savings vs monthly (aligned with marketing site).*

---

## Per-Clinic Pricing

Each subscription is tied to one **tenant** (clinic). Multi-location clinics on Pro or Enterprise may add locations as add-ons or negotiate custom Enterprise pricing.

| Plan | Base clinic fee (monthly) | Locations included | Additional location (placeholder) |
|------|---------------------------|-------------------|-----------------------------------|
| Starter | $49 | 1 | N/A (upgrade to Pro) |
| Pro | $99 | 1 | +$29 / location / mo |
| Enterprise | Custom | Negotiated | Included in contract |

### What's included in the clinic base

| Capability | Starter | Pro | Enterprise |
|------------|---------|-----|------------|
| Clinic Admin portal | ✓ | ✓ | ✓ |
| Patient portal | ✓ | ✓ | ✓ |
| Therapist portal | ✓ | ✓ | ✓ |
| Staff portal | — | ✓ | ✓ |
| Appointment scheduling | ✓ | ✓ | ✓ |
| Patient records | ✓ | ✓ | ✓ |
| Basic billing & invoicing | ✓ | ✓ | ✓ |
| Clinical notes | — | ✓ | ✓ |
| AI-assisted notes | — | ✓ | ✓ |
| Reporting & analytics | — | ✓ | ✓ |
| In-app messaging | ✓ | ✓ | ✓ |
| Notifications | ✓ | ✓ | ✓ |
| Marketplace integrations | Limited | Full | Full + custom |
| Enterprise (SSO, audit, API) | — | — | ✓ |
| Dedicated support / SLA | — | Priority | Dedicated + SLA |

---

## Per-Therapist Pricing

Therapist seats are bundled into each plan. Additional therapists beyond the plan cap are billed per seat.

| Plan | Therapists included | Additional therapist (placeholder) |
|------|---------------------|-----------------------------------|
| Starter | 2 | +$19 / therapist / mo |
| Pro | 10 | +$15 / therapist / mo |
| Enterprise | Unlimited | Included in contract |

### Seat rules

- A **therapist seat** is any user with the THERAPIST role who creates appointments or clinical notes.
- Admin, staff, and front-desk roles do not count toward therapist seats (unless assigned THERAPIST role).
- Seat overages are prorated monthly via Stripe.
- Downgrading below active therapist count requires deactivating users first.

---

## Usage-Based Add-Ons (Optional)

These are optional metered or flat add-ons beyond the base subscription. Placeholder pricing for planning only.

| Add-on | Billing model | Placeholder price | Notes |
|--------|---------------|-------------------|-------|
| **AI note generations** | Per 1,000 generations | $25 / 1k | Pro: 500/mo included; Enterprise: negotiated |
| **SMS notifications** | Per message | $0.04 / SMS | Twilio pass-through + margin |
| **Email volume** | Per 10,000 emails | $10 / 10k | SendGrid pass-through + margin |
| **Additional storage** | Per 50 GB | $15 / 50 GB / mo | Dropbox/Drive sync storage |
| **API calls** | Per 100,000 calls | $50 / 100k | Enterprise API keys |
| **Webhook deliveries** | Per 10,000 deliveries | $20 / 10k | Enterprise webhooks |
| **Extra location** | Per location / mo | $29 / location | Pro tier only |
| **White-label branding** | Flat monthly | $49 / mo | Pro+; full white-label in Enterprise |
| **Priority onboarding** | One-time | $299 | Guided 4-hour setup session |
| **Data export / migration** | One-time | From $499 | Custom quote for large migrations |

---

## Free Trial

| Plan | Trial length | Credit card required |
|------|--------------|---------------------|
| Starter | 14 days | No |
| Pro | 14 days | No |
| Enterprise | Pilot (30–90 days) | Contract-based |

Trial includes full access to plan features. At trial end, clinic selects a paid plan or account is paused (data retained 30 days).

---

## Enterprise Pricing Framework (Placeholder)

Enterprise contracts are custom-quoted. Use this framework for sales conversations:

| Component | Typical range (placeholder) |
|-----------|----------------------------|
| Base platform fee | $500–$2,000 / mo |
| Per therapist (above 10) | $10–$15 / therapist / mo |
| Per location | $50–$150 / location / mo |
| SSO + audit + API package | Included or +$200 / mo |
| SLA (99.9% uptime) | +$100–$300 / mo |
| Dedicated CSM | +$500 / mo |
| Multi-region data residency | +$200 / mo per region |

**Minimum annual contract (placeholder):** $12,000 / year

---

## Discounts & Promotions (Placeholder)

| Program | Discount | Eligibility |
|---------|----------|-------------|
| Annual prepay | 20% vs monthly | All self-serve plans |
| Non-profit clinics | 15% | Verified 501(c)(3) or equivalent |
| Early adopter (launch) | 25% first 6 months | First 50 clinics |
| Referral | 1 month free | Referrer + referee both convert |
| Multi-clinic group | Custom | 3+ tenants under one operator |

---

## Billing Mechanics

- **Payment processor:** Stripe (subscriptions, invoices, customer portal)
- **Billing cycle:** Monthly or annual (clinic selects at checkout)
- **Currency:** USD (placeholder; multi-currency TBD)
- **Invoicing:** Stripe-hosted invoices; clinic admin views under `/clinic/billing`
- **Upgrades:** Immediate proration via Stripe
- **Downgrades:** Effective next billing cycle

---

## Competitive Price Positioning (Placeholder)

| Competitor type | Typical range | Ordella position |
|-----------------|-----------------|------------------|
| Generic PMS | $30–$80 / mo | Premium for physio-specific value |
| Physio niche tools | $60–$150 / mo | Competitive on Pro tier |
| Enterprise EMR | $500+ / mo | Lower TCO with native enterprise features |

---

*Finalize with finance. Stripe price IDs configured in `billing-service` env. Marketing site tiers: `apps/frontend-web/lib/marketing-content.ts`.*
