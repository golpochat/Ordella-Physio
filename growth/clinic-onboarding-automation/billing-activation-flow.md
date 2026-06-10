# Ordella Physio — Billing Activation Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation  
**Portal:** `/clinic/billing`  
**Service:** `billing-service` + Stripe

---

## Flow Overview

```
Signup → Stripe customer (auto) → Trial → Plan selection → Payment method → Subscription active → Invoicing
```

| Phase | Trigger | Automated |
|-------|---------|-----------|
| Customer creation | Clinic signup | Yes (NATS) |
| Trial | Default on register | Yes |
| Plan selection | Admin action or Day 10 email | Partial |
| Payment method | Stripe Checkout / Portal | Stripe |
| Subscription | Payment success webhook | Yes |
| Invoice verification | Admin test invoice | Manual |

---

## Phase 1: Stripe Customer Creation

### Trigger
`onboarding.clinic.signup` → `tenant-service` publishes `tenant.created` → `billing-service` consumer.

### Automated steps

| # | Action | System |
|---|--------|--------|
| 1 | Create Stripe Customer | `billing-service` |
| 2 | Link `stripeCustomerId` to tenant | `tenant-service` / billing DB |
| 3 | Set trial metadata on customer | Stripe `metadata.tenantId` |
| 4 | Log provisioning event | Audit / activity log |

### Verification (admin)

| # | Check | Path |
|---|-------|------|
| 1 | Billing page loads without error | `/clinic/billing` |
| 2 | Trial status displayed | Billing dashboard |
| 3 | Trial end date shown | Billing dashboard |

**Failure:** If Stripe customer missing → Support L3 (see `support-escalation-flow.md`).

---

## Phase 2: Subscription Selection

### Plans

| Plan | Stripe price env | Therapists | Monthly (placeholder) |
|------|------------------|------------|----------------------|
| Starter | `STRIPE_PRICE_STARTER` | 2 | $49 |
| Pro | `STRIPE_PRICE_PRO` | 10 | $99 |
| Enterprise | `STRIPE_PRICE_ENTERPRISE` | Unlimited | Custom |

### Selection paths

| Path | When | Flow |
|------|------|------|
| **Trial default** | Signup | Starter trial for 14 days (no card) |
| **Self-serve upgrade** | Admin chooses plan | `/clinic/billing` → Select plan |
| **Sales-assisted** | Enterprise / high-touch | AE sends Stripe payment link |
| **Automated nudge** | Trial Day 10 | Email with plan recommendation |

### Plan recommendation logic (automated email)

| Therapist count | Recommended plan |
|-----------------|------------------|
| 1–2 | Starter |
| 3–10 | Pro |
| 11+ | Enterprise (contact sales) |

### Admin steps

| # | Task | Done |
|---|------|------|
| 1 | Open billing dashboard | [ ] |
| 2 | Review plan comparison | [ ] |
| 3 | Select Starter or Pro | [ ] |
| 4 | (Enterprise) Complete sales process first | [ ] |

**Progress event:** `onboarding.billing.reviewed` (trial review completes onboarding billing step)

---

## Phase 3: Payment Method Setup

### Stripe flows

| Method | UI | Use case |
|--------|-----|----------|
| Stripe Checkout | Redirect to Stripe-hosted page | New subscription |
| Stripe Customer Portal | Link from billing dashboard | Update card, view invoices |
| Payment Element (embedded) | In-app (if implemented) | Inline checkout |

### Admin steps

| # | Task | Done |
|---|------|------|
| 1 | Click "Add payment method" or "Subscribe" | [ ] |
| 2 | Complete Stripe Checkout (card details) | [ ] |
| 3 | Return to Ordella billing dashboard | [ ] |
| 4 | Confirm "Active" subscription status | [ ] |
| 5 | Save billing email for invoices | [ ] |

### Webhook events (automated)

| Stripe event | Action |
|--------------|--------|
| `customer.subscription.created` | Activate plan; CRM → Converted |
| `customer.subscription.updated` | Plan change logged |
| `invoice.paid` | Invoice marked paid |
| `invoice.payment_failed` | Email admin; CS task |
| `customer.subscription.deleted` | Churn handling |

---

## Phase 4: Invoice Verification

### Test invoice workflow (onboarding)

| # | Step | Path |
|---|------|------|
| 1 | Complete at least one appointment | `/clinic/appointments` |
| 2 | Open billing → Create invoice | `/clinic/billing` |
| 3 | Link invoice to patient / appointment | Invoice form |
| 4 | Generate and send invoice | Submit |
| 5 | Verify invoice in billing history | Billing list |
| 6 | Verify patient sees invoice | `/patient` billing section |
| 7 | (Optional) Test Stripe payment on invoice | Patient or admin pay link |

### Verification checklist

| # | Check | Expected |
|---|-------|----------|
| 1 | Invoice number generated | Sequential per tenant |
| 2 | Correct amount and currency | Matches clinic profile |
| 3 | Patient email received | If email integration active |
| 4 | Invoice PDF/download available | Billing dashboard |
| 5 | Stripe line items correct | Stripe dashboard |

---

## Trial → Paid Conversion Timeline

| Day | Automated action | Billing action |
|-----|------------------|----------------|
| 0 | Stripe customer created | Trial starts |
| 1–9 | — | Admin may self-convert anytime |
| 10 | Plan recommendation email | Review billing |
| 12 | Plan comparison email | Select plan |
| 13 | Urgency email | Add payment method |
| 14 | Trial expiry email | Subscribe or pause |
| 15+ | Account paused (data retained 30 days) | Win-back sequence |

---

## Billing Activation Checklist

| # | Item | Trial | Paid |
|---|------|-------|------|
| 1 | Stripe customer exists | Auto | Auto |
| 2 | Billing dashboard accessible | [ ] | [ ] |
| 3 | Plan reviewed or selected | [ ] | [ ] |
| 4 | Payment method on file | — | [ ] |
| 5 | Subscription active | — | [ ] |
| 6 | Test invoice generated | [ ] | [ ] |
| 7 | Patient invoice visibility confirmed | [ ] | [ ] |

---

## Error Handling

| Error | User message | Escalation |
|-------|--------------|------------|
| Stripe customer missing | "Billing setup in progress — retry in 5 min" | L3 if > 1 hour |
| Payment declined | Stripe error message | Admin retries |
| Webhook delay | "Payment processing" | L3 if > 30 min |
| Plan limit exceeded | "Upgrade to add more therapists" | In-app upgrade CTA |
| Enterprise custom pricing | "Contact sales" | AE task |

---

## Environment Variables

| Variable | Service | Purpose |
|----------|---------|---------|
| `STRIPE_SECRET_KEY` | billing-service | API calls |
| `STRIPE_WEBHOOK_SECRET` | billing-service | Webhook verification |
| `STRIPE_PRICE_STARTER` | billing-service | Starter plan |
| `STRIPE_PRICE_PRO` | billing-service | Pro plan |
| `STRIPE_PRICE_ENTERPRISE` | billing-service | Enterprise plan |

---

*Companion: `clinic-admin-checklist.md`, `automated-onboarding-flow.md`, `gtm/pricing-model.md`*
