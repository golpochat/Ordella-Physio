# Ordella Physio — Conversion Sequence

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine  
**Window:** Trial Day 10–14 + post-expiry win-back  
**Goal:** Trial Active → Paid subscription

---

## Conversion Overview

```
Trial Day 10 → Plan emails → In-app banners → SMS (optional) → Sales call (optional) → Stripe checkout → Converted
```

| Channel | Days active | Owner |
|---------|-------------|-------|
| Email | 10, 12, 13, 14 | Automated |
| In-app banners | 10–14 | Product |
| SMS | 13 (opt-in) | Automated |
| Sales call | 12–14 (Pro+, high score) | AE / CS |

**Overlaps:** `trial-nurture-sequence.md` Day 10 and 13; this doc adds conversion-specific layers.

---

## Automated Emails

### Email 1 — Day 10: Plan recommendation

*Same as trial nurture Day 10.* See `trial-nurture-sequence.md`.

**Dynamic fields:**
- `recommended_plan` — logic: therapists ≤ 2 → Starter; 3–10 → Pro; 11+ → Enterprise contact
- `therapist_count` — from tenant
- `expiry_date` — from trial metadata

---

### Email 2 — Day 12: Plan comparison + objection handling

**Subject:** Starter vs Pro for [Clinic Name] — which fits?

**Body:**

Hi [First Name],

2 days left on your trial. Quick comparison:

| | Starter ($49/mo) | Pro ($99/mo) |
|---|------------------|--------------|
| Therapists | 2 | 10 |
| AI-assisted notes | — | ✓ |
| Reporting | Basic | Full |
| Marketplace | Calendar | All integrations |

**You have [Therapist Count] therapists** → we recommend **[Plan]**.

**Upgrade:** {{billing_link}}

**Common questions:**
- *Can I switch plans later?* Yes, anytime.
- *Annual discount?* Save 20% with yearly billing.
- *Need more time?* Reply — we may extend 7 days.

Ordella Physio

---

### Email 3 — Day 13: Urgency

*Same as trial nurture Day 13.*

---

### Email 4 — Day 14: Trial expired / last chance

**Subject:** Your Ordella trial has ended — reactivate [Clinic Name]

**Body:**

Hi [First Name],

Your trial ended today. Your clinic data is **saved for 30 days**.

**Reactivate in 2 minutes:** {{billing_link}}

Need help choosing a plan? Reply or book a call: {{sales_call_link}}

We'd love to have you back,  
Ordella Physio

**Branch:**
- If grace period allows same-day upgrade → subject: "Last day to upgrade without interruption"

---

### Post-conversion email (Hour 0)

**Subject:** Welcome to Ordella [Plan Name], [Clinic Name]!

See `growth/clinic-acquisition/follow-up-automation.md` post-conversion sequence.

---

## In-App Banners

### Banner schedule

| Day | Location | Variant | Dismissible |
|-----|----------|---------|-------------|
| 10 | `/clinic` dashboard | Info — "4 days left" | Yes (24h) |
| 11 | `/clinic` dashboard | Info — plan recommendation | Yes (24h) |
| 12 | `/clinic/billing` | Highlight — plan cards | N/A |
| 13 | `/clinic` all pages | Warning — "Ends tomorrow" | No |
| 14 | Login screen | Critical — "Trial ended" | No (CTA only) |

### Banner copy templates

**Day 10 (info):**
> Your trial ends on [date]. [Recommended Plan] fits your [N] therapists. [Choose plan]

**Day 13 (warning):**
> Trial ends tomorrow. Upgrade now to keep appointments, patients, and notes. [Choose plan]

**Day 14 (critical):**
> Your trial has ended. Upgrade within 30 days to restore full access. [Reactivate]

### Behavioral banners (any day)

| Condition | Banner |
|-----------|--------|
| Therapists > 2 on Starter trial | "You've outgrown Starter — upgrade to Pro" |
| AI quota exhausted | "Convert to Pro to continue AI notes" |
| High usage, not converted Day 12 | "You're getting great value — lock in [Plan] today" |

### Implementation (placeholder)

```typescript
// useConversionBanner(tenantId) → { variant, message, ctaHref, dismissible }
// Rules engine: trialDaysRemaining, plan, therapistCount, converted
```

---

## SMS Reminders (Optional)

**Prerequisite:** Twilio connected; SMS opt-in on registration or Day 1 email.

| Day | Message |
|-----|---------|
| 12 | [First Name], 2 days left on your Ordella trial. Plans from $49/mo: {{short_link}} STOP to opt out |
| 13 | Trial ends tomorrow. Upgrade: {{short_billing_link}} STOP to opt out |
| 14 | Trial ended — reactivate within 30 days: {{short_link}} STOP to opt out |

**Compliance:** STOP handling via Twilio; business hours only; max 3 SMS per trial.

---

## Sales Call Script (Optional)

**When:** Trial Day 12–14, Pro+ or qualification score ≥ 80, not converted  
**Owner:** AE or CS  
**Duration:** 10–15 minutes

### Opening

> "Hi [First Name], it's [Name] from Ordella. Your trial ends in [X] days — I wanted to check in and help you pick the right plan so there's no interruption. Got 10 minutes?"

### Discovery

> "How has the team found Ordella this week?"  
> "How many therapists are actively using it?"  
> "Anything blocking you from upgrading?"

### Recommendation

| Situation | Recommend |
|-----------|-----------|
| 1–2 therapists, basic needs | Starter $49 |
| 3–10 therapists, notes/reporting | Pro $99 |
| 11+ or SSO ask | Enterprise discovery |

### Close

> "I can send a Stripe payment link right now — takes 2 minutes. Or you can upgrade at {{billing_link}}. Which works better?"

### Objection handling

| Objection | Response |
|-----------|----------|
| Too expensive | Compare to current tool spend; annual 20% off |
| Need approval | Send one-pager PDF; schedule follow-up before Day 14 |
| Not enough usage | Offer 7-day extension if they commit to setup call |
| Evaluating competitor | Emphasize physio-specific + AI review gate |

### CRM logging

- Call outcome: converted / follow-up / lost / extension granted
- Next step date

---

## Conversion Workflow (CRM)

| Day | Automated | Human |
|-----|-----------|-------|
| 10 | Email + banner | — |
| 11 | — | — |
| 12 | Email + SMS | AE call (high value) |
| 13 | Email + SMS + banner | CS call (Pro+) |
| 14 | Expiry email | AE manager (enterprise deals) |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Billing page visit (Day 10–14) | 40% of active trials |
| Email CTR to billing | > 8% |
| Sales call conversion | > 35% |
| Overall trial → paid | 25% (Month 3) |
| Day 14 same-day conversion | > 10% |

---

*Companion: `trial-nurture-sequence.md`, `sales-dashboard.md`, `churn-prevention.md`*
