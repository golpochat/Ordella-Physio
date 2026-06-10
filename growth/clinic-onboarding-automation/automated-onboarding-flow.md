# Ordella Physio — Automated Onboarding Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation  
**Trigger:** Clinic signup complete (`/register` → tenant provisioned)

---

## Journey Overview

```
Signup → Welcome (email + in-app) → Admin setup → Team → Patients → Go-live → Conversion
         └──────────────────────────────────────────────────────────────────────────────┘
                              Progress tracked in onboarding widget + CRM events
```

| Phase | Duration | Channels | Owner |
|-------|----------|----------|-------|
| 0 — Activation | Hour 0 | Email, in-app wizard | Automated |
| 1 — Admin setup | Day 0–1 | In-app, email Day 1 | Clinic Admin |
| 2 — Team | Day 1–3 | In-app, email Day 1 | Clinic Admin |
| 3 — Patients | Day 2–5 | In-app, email Day 3 | Clinic Admin |
| 4 — Go-live | Day 3–7 | In-app, email Day 5 | Admin + Therapists |
| 5 — Conversion | Day 7–14 | Email Day 10–14 | CS + automated |

**Total time to go-live:** 2–4 hours active work; 14-day trial window for conversion.

---

## Trigger: Clinic Signup

### Event

| Event | Source | Payload |
|-------|--------|---------|
| `onboarding.clinic.signup` | `auth-service` / `tenant-service` | `tenantId`, `adminUserId`, `plan`, `utm`, `trialEndsAt` |

### Immediate actions (automated, < 60 seconds)

| # | Action | System |
|---|--------|--------|
| 1 | Provision Stripe customer (NATS → `billing-service`) | Backend |
| 2 | Send welcome email | Email automation |
| 3 | Create CRM deal → Trial Started | CRM webhook |
| 4 | Initialize onboarding progress record | Tenant metadata / onboarding service |
| 5 | Show in-app onboarding wizard on first `/clinic` login | Frontend |

---

## Onboarding Progress Model

### Steps (weighted progress)

| Step ID | Label | Weight | Required | Portal path |
|---------|-------|--------|----------|-------------|
| `profile` | Complete clinic profile | 15% | Yes | `/clinic/profile` |
| `therapist` | Invite first therapist | 20% | Yes | `/clinic/staff/create` |
| `patient` | Add first patient | 15% | Yes | `/clinic/patients/create` |
| `appointment` | Create first appointment | 20% | Yes | `/clinic/appointments/create` |
| `billing` | Review billing plan | 10% | Yes (trial: review; paid: activate) | `/clinic/billing` |
| `integration` | Connect one integration | 10% | No (Pro+) | `/clinic/marketplace` |
| `note` | Create first clinical note | 10% | No (Pro+) | `/therapist` |

**Activation threshold:** `profile` + `therapist` + `patient` + `appointment` = **70%** → status **Trial Active** (CRM).

**Onboarding complete:** All required steps + `billing` = **85%** → status **Onboarding Complete**.

### Progress events (product → automation)

| Event | Progress update | CRM / email trigger |
|-------|-----------------|---------------------|
| `onboarding.profile.completed` | +15% | — |
| `onboarding.therapist.invited` | +20% | Email: therapist invite sent |
| `onboarding.patient.created` | +15% | — |
| `onboarding.appointment.created` | +20% | **Trial Active** if ≥ 70% |
| `onboarding.billing.reviewed` | +10% | — |
| `onboarding.integration.connected` | +10% | Email: integration tips |
| `onboarding.note.created` | +10% | Email: AI notes tip (Pro) |

---

## In-App Guidance

### Onboarding wizard (first login)

Displayed as modal or sidebar widget on Clinic Admin dashboard until dismissed or 100% complete.

| Screen | Content | CTA |
|--------|---------|-----|
| Welcome | "Let's set up [Clinic Name] in under 2 hours" | Start setup |
| Step 1 | Clinic profile (name, timezone, currency) | Go to profile |
| Step 2 | Invite your first therapist | Invite staff |
| Step 3 | Add your first patient | Add patient |
| Step 4 | Book first appointment | Create appointment |
| Step 5 | Review billing / trial | View billing |
| Complete | "You're live!" + next steps (integrations, mobile) | Explore marketplace |

### Persistent progress widget

**Location:** Clinic Admin dashboard (`/clinic`)  
**Display:**
- Progress bar (0–100%)
- Checklist of 7 steps with ✓ / pending
- "Need help?" → help center + book setup call (Pro+)
- Dismiss when ≥ 85% (reopen from Settings → Onboarding)

### Contextual tooltips (first visit)

| Page | Tooltip |
|------|---------|
| `/clinic/staff` | "Invite therapists — they get their own portal" |
| `/clinic/patients` | "Add patients manually or import CSV" |
| `/clinic/appointments` | "Link a patient and therapist to get started" |
| `/clinic/billing` | "14-day trial — choose a plan before [date]" |
| `/clinic/marketplace` | "Connect Google Calendar in 2 minutes" |

---

## Email Automation (aligned with trial sequence)

Runs in parallel with `growth/clinic-acquisition/follow-up-automation.md` trial sequence.

| Day | Email | Tied to progress step |
|-----|-------|----------------------|
| 0 | Welcome + onboarding checklist | All |
| 1 | Invite therapists | `therapist` |
| 3 | Add patients + import guide link | `patient` |
| 5 | Connect calendar (Marketplace) | `integration` |
| 7 | Week 1 check-in | Activation review |
| 10 | Plan recommendation | `billing` |
| 12 | 2 days left | Conversion |
| 14 | Trial ends today | Conversion |

**Personalization:** Skip steps already complete (e.g., don't send "invite therapists" if `therapist` = done).

---

## Role-Specific Journeys

### Clinic Admin
Full wizard + all email steps. Primary owner of progress.

### Therapist (on invite)
| Trigger | Action |
|---------|--------|
| `onboarding.therapist.invited` | Invite email with setup link |
| First `/therapist` login | Therapist mini-wizard (profile, availability, first note) |
| Day 2 (no note) | Email: "Create your first note" |

See `therapist-onboarding-flow.md`.

### Patient (on invite)
| Trigger | Action |
|---------|--------|
| Patient record created | Portal invite email (manual or automated) |
| First `/patient` login | Patient welcome tooltip |

### Staff
| Trigger | Action |
|---------|--------|
| Staff invited | Invite email → `/staff` orientation tooltip |

---

## At-Risk Detection & CS Triggers

| Condition | Day | Automated action |
|-----------|-----|------------------|
| Progress < 30% | 3 | Email: "Need help getting started?" |
| No therapist invited | 3 | CS task (Pro+); email (all) |
| No appointment by Day 7 | 7 | CS call task; in-app banner |
| Progress ≥ 70% but no billing review | 10 | Email: plan recommendation |
| Trial Day 13, not converted | 13 | AE + CS joint task |

---

## Implementation Architecture (placeholder)

```
Frontend (onboarding widget)
    → POST /tenants/internal/onboarding/progress
        → tenant-service (persist progress)
        → NATS publish onboarding.* events
            → notification-service (emails)
            → CRM webhook (HubSpot deal update)
            → reporting-service (onboarding metrics)
```

### API surface (to implement)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/tenants/internal/onboarding/progress` | GET | Current progress for tenant |
| `/tenants/internal/onboarding/progress` | PATCH | Mark step complete |
| `/tenants/internal/onboarding/events` | POST | Product event ingestion |

### Frontend components (to implement)

| Component | Location |
|-----------|----------|
| `OnboardingWizard` | Clinic Admin dashboard |
| `OnboardingProgressCard` | `/clinic` sidebar |
| `TherapistOnboardingBanner` | `/therapist` first login |
| `useOnboardingProgress` | Shared hook |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Time to first appointment | < 24 hours (median) |
| Activation rate (≥ 70% in 7 days) | 60% |
| Onboarding complete (≥ 85%) | 45% |
| Wizard completion rate | 70% |
| Email open rate (onboarding series) | > 40% |
| CS intervention rate | < 25% of trials |

---

## Document Map

| Topic | Document |
|-------|----------|
| Admin checklist | `clinic-admin-checklist.md` |
| Therapist flow | `therapist-onboarding-flow.md` |
| Patient import | `patient-import-guide.md` |
| Billing | `billing-activation-flow.md` |
| Integrations | `integrations-setup-flow.md` |
| Mobile | `mobile-app-rollout.md` |
| Training | `training-materials-outline.md` |
| Support | `support-escalation-flow.md` |

---

*Companion: `growth/clinic-acquisition/follow-up-automation.md`, `gtm/onboarding-flow.md`, `docs/Clinic-Onboarding-Kit.md`*
