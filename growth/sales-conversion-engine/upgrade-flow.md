# Ordella Physio — Upgrade Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine  
**Paths:** Starter → Pro → Enterprise

---

## Upgrade Overview

```
Usage signal / limit hit → In-app CTA → Billing page → Stripe proration → Plan active
```

| Upgrade path | Motion | Owner |
|--------------|--------|-------|
| Starter → Pro | Self-serve + automated prompts | Product + CS |
| Pro → Enterprise | Sales-assisted | AE + Enterprise CSM |
| Add-on seats / locations | Self-serve | Billing |
| Usage-based (AI, SMS) | In-app + invoice | Automated |

---

## Starter → Pro Upgrade Triggers

### Automated triggers

| Trigger | Condition | Action |
|---------|-----------|--------|
| Therapist limit | 3rd therapist invite attempted | Block + upgrade modal |
| Feature gate | AI notes accessed | "Available on Pro" modal |
| Feature gate | Full reporting | Upgrade CTA |
| Feature gate | Marketplace (non-Google) | Upgrade CTA |
| Usage | 30+ days on Starter, 2 active therapists | Email: "Time for Pro?" |
| Onboarding | Trial was Pro, converted Starter | CS review call |

### In-app upgrade modal (therapist limit)

**Title:** Upgrade to Pro to add more therapists

**Body:** Starter includes 2 therapists. You have [N] active. Pro supports up to 10 therapists plus AI notes, reporting, and full Marketplace.

**CTA:** Upgrade to Pro — $99/mo  
**Secondary:** Manage therapists

**Path:** `/clinic/billing?upgrade=pro`

---

## Pro → Enterprise Upgrade Triggers

### Automated triggers

| Trigger | Condition | Action |
|---------|-----------|--------|
| Therapist limit | 11th therapist | Enterprise contact modal |
| Feature request | SSO / audit / API keys accessed | Enterprise gate + discovery link |
| Multi-location | 4th location | AE notification |
| Usage | 10+ therapists active 60 days | AE outreach |
| Support | Security questionnaire request | Enterprise track |

### Enterprise upgrade motion (not self-serve)

| Step | Owner | Action |
|------|-------|--------|
| 1 | Product | In-app "Contact sales" CTA |
| 2 | AE | Discovery call (`demo-booking-automation.md` enterprise link) |
| 3 | AE | Proposal + security brief |
| 4 | Legal | Contract + DPA |
| 5 | CSM | Pilot → production rollout |

### In-app Enterprise CTA

**Location:** `/clinic/enterprise` (gated) or billing page  
**Copy:** "SSO, audit logs, and unlimited therapists — talk to our enterprise team."  
**CTA:** Book discovery call

---

## Usage-Based Upgrade Prompts

### AI note generations (Pro)

| Usage | Prompt |
|-------|--------|
| 80% of quota | Banner: "You've used 400 of 500 AI notes this month" |
| 100% | Modal: "Upgrade AI bundle or wait until next cycle" |
| Overage enabled | Auto-bill per `gtm/pricing-model.md` add-on |

### SMS volume

| Usage | Prompt |
|-------|--------|
| 90% of included SMS | Email admin |
| 100% | Pause SMS + upgrade add-on CTA |

### Storage (Marketplace sync)

| Usage | Prompt |
|-------|--------|
| 90% storage | Email + billing add-on |

---

## In-App Upgrade CTA Catalog

| Location | Trigger | CTA text |
|----------|---------|----------|
| `/clinic/staff/create` | Seat limit | Upgrade to Pro |
| `/clinic/billing` | Always (Starter) | Compare plans |
| `/therapist` AI panel | Starter plan | Unlock AI on Pro |
| `/clinic/reports` | Starter | Unlock reporting on Pro |
| `/clinic/marketplace` | Provider gated | Available on Pro |
| `/clinic/enterprise` | Non-Enterprise | Contact sales |
| Dashboard banner | Behavioral rules | Dynamic |

### Banner rules engine

```typescript
// upgradePrompt = evaluate({ plan, therapistCount, featuresAttempted, mrr, tenureDays })
// Returns: { show: boolean, variant: 'starter-pro' | 'pro-enterprise' | 'addon', ctaHref }
```

---

## Upgrade Email Sequences

### Starter → Pro nurture (paid, 60+ days)

| Day | Subject |
|-----|---------|
| 0 | Ready for AI notes and more therapists? |
| 7 | [Clinic Name] — Pro case study |
| 14 | Limited time: first month Pro 20% off (placeholder) |

**Exit:** Upgraded or snooze 90 days.

### Pro → Enterprise (signal-based)

| Trigger | Email |
|---------|-------|
| SSO page visit | Enterprise security brief PDF |
| 10+ therapists | "Let's talk about Enterprise for [Clinic]" |

---

## Stripe Upgrade Mechanics

| Action | Stripe behavior |
|--------|-----------------|
| Starter → Pro mid-cycle | Prorated charge immediately |
| Monthly → Annual | New billing cycle |
| Add therapist seats | Per-seat proration |
| Enterprise | Custom subscription via sales |

**Portal:** `/clinic/billing` → Stripe Checkout or Customer Portal

---

## Upgrade Metrics

| Metric | Target |
|--------|--------|
| Starter → Pro (12 months) | 15% of Starter base |
| Pro → Enterprise (12 months) | 5% of Pro base |
| Upgrade modal CTR | > 12% |
| Therapist-limit trigger → upgrade | > 20% within 30d |
| Expansion MRR % of net new | 25% |

---

## CS / Sales Handoff

| Upgrade type | Owner |
|--------------|-------|
| Starter → Pro self-serve | CS (monitor) |
| Pro → Enterprise | AE required |
| Add-on purchase | Self-serve |
| Custom Enterprise contract | AE + CSM |

---

*Companion: `renewal-flow.md`, `gtm/pricing-model.md`, `sales-dashboard.md`*
