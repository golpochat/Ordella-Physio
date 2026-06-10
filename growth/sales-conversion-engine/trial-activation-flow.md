# Ordella Physio — Trial Activation Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Sales & Conversion Engine

---

## Flow Overview

```
Demo completed / Self-serve signup → Trial provisioned → 14-day clock → Activation → Conversion or expiry
```

| Path | Trigger | Trial plan default |
|------|---------|-------------------|
| Post-demo | AE sends trial link / CRM "Start trial" | Pro (if 3+ therapists) or Starter |
| Self-serve | `/register` | Starter |
| Inbound pricing | `/pricing` → Start free trial | Selected tier |
| Sales-assisted | AE creates tenant + invite | Per deal |

---

## Auto-Start Trial After Demo

### Option A: Trial link (current)

| Step | System |
|------|--------|
| 1 | AE marks demo complete |
| 2 | CRM workflow sends email with `{{trial_link}}` |
| 3 | Link includes `?deal_id=&utm_source=demo&plan=pro` |
| 4 | Clinic registers at `/register` |
| 5 | Tenant + Stripe customer + trial created |

### Option B: One-click trial (automated — to implement)

| Step | System |
|------|--------|
| 1 | AE clicks "Start trial" in CRM |
| 2 | API creates pending invite for clinic email |
| 3 | Email: "Your trial is ready — set password" |
| 4 | Admin sets password → lands on `/clinic` with wizard |

### Post-demo automation (within 1 hour)

| # | Action | Automated |
|---|--------|-----------|
| 1 | Send trial link email | Yes |
| 2 | CRM deal → Trial Started (on register) | Yes |
| 3 | Assign CS owner (Pro+ trials) | Yes |
| 4 | Enroll trial nurture sequence | Yes |
| 5 | Initialize onboarding progress | Yes |

**Email subject:** Your Ordella trial is ready — [Clinic Name]

---

## Trial Duration Rules

| Plan trial | Duration | Credit card | Extension |
|------------|----------|-------------|-----------|
| Starter | 14 days | Not required | +7 days (CS approval, once) |
| Pro | 14 days | Not required | +7 days (CS approval, once) |
| Enterprise | 30–90 days pilot | Contract | Per agreement |

### Clock start

| Event | `trialStartsAt` |
|-------|-----------------|
| Tenant created on `/register` | `now()` |
| Sales-provisioned tenant | AE-specified or `now()` |

### Clock end

| Event | `trialEndsAt` |
|-------|---------------|
| Default | `trialStartsAt` + 14 days |
| Extension approved | +7 days (logged in CRM) |

### Expiry behavior

| Day | Action |
|-----|--------|
| 14 | Trial ends; write access may continue 24h grace |
| 15 | Account **paused** — read-only or login blocked (configurable) |
| 15–44 | Data retained |
| 45 | Data deletion policy applies (per ToS) |

---

## Trial Limitations

### Feature gates by trial plan

| Feature | Starter trial | Pro trial |
|---------|---------------|-----------|
| Therapists | 2 max | 10 max |
| Patients | Unlimited | Unlimited |
| Appointments | Unlimited | Unlimited |
| Clinical notes | Manual only | Manual + AI assistant |
| Reporting | Basic | Full |
| Marketplace | Google Calendar only | All providers |
| Enterprise (SSO, audit) | — | — |
| API keys / webhooks | — | — |
| Multi-location | 1 | 2 |
| Mobile app | Yes | Yes |

### Usage limits (placeholder)

| Limit | Starter trial | Pro trial |
|-------|---------------|-----------|
| AI note generations | — | 100 total |
| SMS sent | 50 | 200 |
| Storage sync | 1 GB | 5 GB |

### Enforcement

| Gate | Layer |
|------|-------|
| Therapist seat cap | `tenant-service` subscription check |
| AI notes | `ai-notes-service` plan guard |
| Enterprise features | `enterprise-service` ENTERPRISE plan guard |
| Marketplace providers | `marketplace-service` per-plan allowlist |

### Upgrade during trial

- Clinic may convert early anytime via `/clinic/billing`
- Converting removes trial limitations immediately
- Proration handled by Stripe on first payment

---

## Trial-to-Paid Triggers

### Automated triggers

| Trigger | Day | Action |
|---------|-----|--------|
| Trial started | 0 | Welcome + onboarding wizard |
| Activation (≥ 70% onboarding) | 1–7 | CRM → Trial Active; CS health green |
| Low activation | 7 | CS task if no appointment |
| Plan recommendation | 10 | Email based on therapist count |
| Pre-expiry | 12–13 | Conversion sequence (`conversion-sequence.md`) |
| Trial expiry | 14 | Pause + win-back enrollment |

### Behavioral triggers (in-app + email)

| Signal | Threshold | Action |
|--------|-----------|--------|
| Therapist count > 2 on Starter trial | Any | In-app: "Upgrade to Pro" |
| AI usage exhausted | Pro trial | In-app: convert to keep AI |
| High engagement + Day 10 | Logins ≥ 5, notes ≥ 3 | AE optional call |
| Zero logins | Day 5 | At-risk email + CS task |

### Conversion events

| Event | CRM | Billing |
|-------|-----|---------|
| `billing.subscription.created` | → Converted | Paid active |
| `trial.converted_early` | → Converted | Stripe checkout complete |
| `trial.expired` | → Nurture | Paused |

### Trial-to-paid rate targets

| Metric | Month 1 | Month 3 |
|--------|---------|---------|
| Trial → paid (active trials) | 20% | 25% |
| Demo → trial → paid (full path) | 8% | 12% |
| Median days to convert | 14 | 12 |

---

## CRM + Product Event Map

| Product event | CRM update | Email sequence |
|---------------|------------|----------------|
| `trial.registered` | Trial Started | Welcome (Day 0) |
| `onboarding.appointment.created` | Trial Active | — |
| `trial.day.10` | — | Plan recommendation |
| `trial.day.13` | — | Conversion CTA |
| `trial.expired` | Nurture | Win-back Day 7 |

---

## Implementation Checklist

- [ ] Trial metadata on Stripe customer
- [ ] Plan parameter on trial registration URL
- [ ] Post-demo CRM → trial email workflow
- [ ] Trial expiry cron + account pause job
- [ ] Feature gates wired to subscription plan
- [ ] Trial extension approval in Super Admin or CRM
- [ ] `trial.day.N` scheduled events for nurture

---

*Companion: `trial-nurture-sequence.md`, `conversion-sequence.md`, `growth/clinic-onboarding-automation/automated-onboarding-flow.md`*
