# Ordella Physio — Clinic Admin Checklist

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation  
**Portal:** `/clinic`  
**Owner:** Clinic Admin (OWNER or ADMIN)

---

## Checklist Overview

| Section | Time | Progress weight | Required |
|---------|------|-----------------|----------|
| Admin account setup | 10 min | — | Yes |
| Clinic profile setup | 15 min | 15% | Yes |
| Therapist invitations | 20 min | 20% | Yes |
| Patient setup | 20 min | 15% | Yes |
| First appointment | 10 min | 20% | Yes |
| Billing activation | 15 min | 10% | Yes |
| Marketplace integrations | 20 min | 10% | Pro+ recommended |

**Printable goal:** Complete required items in one session (~90 min).

---

## 1. Admin Account Setup

**Trigger:** Immediately after `/register`  
**Automated:** Welcome email, Stripe customer, onboarding wizard

| # | Task | Path | Done |
|---|------|------|------|
| 1.1 | Verify email address | Inbox → verification link | [ ] |
| 1.2 | Log in successfully | `/login` | [ ] |
| 1.3 | Select or confirm tenant (clinic) | Tenant selector | [ ] |
| 1.4 | Land on Clinic Admin dashboard | `/clinic` | [ ] |
| 1.5 | Complete onboarding wizard welcome screen | Dashboard modal | [ ] |
| 1.6 | Confirm OWNER or ADMIN role assigned | Profile / staff list | [ ] |

**Automated emails received:**
- [ ] Welcome email (Day 0)
- [ ] Onboarding checklist link

**Blockers:** Cannot proceed without verified email.

---

## 2. Clinic Profile Setup

**Progress event:** `onboarding.profile.completed`  
**Path:** `/clinic/profile`

| # | Field | Required | Notes |
|---|-------|----------|-------|
| 2.1 | Clinic name | Yes | Matches legal/trading name |
| 2.2 | Address (line 1, city, postcode) | Yes | Used on invoices |
| 2.3 | Phone number | Yes | Patient contact |
| 2.4 | Timezone | Yes | **Critical** — affects all scheduling |
| 2.5 | Currency | Yes | Billing (USD, GBP, AUD, etc.) |
| 2.6 | Logo upload | Pro+ | Branding on patient comms |
| 2.7 | Brand colors | Pro+ | Optional white-label |

| # | Task | Done |
|---|------|------|
| 2.8 | Save profile and confirm no validation errors | [ ] |
| 2.9 | Verify timezone on test appointment preview | [ ] |

---

## 3. Therapist Invitations

**Progress event:** `onboarding.therapist.invited`  
**Path:** `/clinic/staff/create`

| # | Task | Done |
|---|------|------|
| 3.1 | Open staff creation form | [ ] |
| 3.2 | Enter therapist name and email | [ ] |
| 3.3 | Assign role: **THERAPIST** | [ ] |
| 3.4 | Send invitation | [ ] |
| 3.5 | Confirm invite email delivered | [ ] |
| 3.6 | (Optional) Invite additional therapists | [ ] |
| 3.7 | (Optional) Invite STAFF for front desk | [ ] |
| 3.8 | Verify therapist count within plan limit | [ ] |

**Plan limits:**
- Starter: up to 2 therapists
- Pro: up to 10 therapists
- Enterprise: unlimited

**Automated:** Invite email to therapist with link to `/therapist` setup.

---

## 4. Patient Setup (first patient)

**Progress event:** `onboarding.patient.created`  
**Path:** `/clinic/patients/create` or CSV import

| # | Task | Done |
|---|------|------|
| 4.1 | Add first patient manually OR import CSV | [ ] |
| 4.2 | Required fields: name, email, phone | [ ] |
| 4.3 | Assign primary therapist (recommended) | [ ] |
| 4.4 | Send portal invite instructions | [ ] |
| 4.5 | Add ≥ 2 more patients (trial target: 3+) | [ ] |

**Bulk import:** See `patient-import-guide.md`.

---

## 5. First Appointment

**Progress event:** `onboarding.appointment.created`  
**Path:** `/clinic/appointments/create`

| # | Task | Done |
|---|------|------|
| 5.1 | Create appointment with patient + therapist + date/time | [ ] |
| 5.2 | Confirm appointment appears on clinic calendar | [ ] |
| 5.3 | Confirm notification sent (if configured) | [ ] |
| 5.4 | Therapist can see appointment in `/therapist` | [ ] |

**Milestone:** Completing 5.1 with profile + therapist + patient = **Trial Active** (70% progress).

---

## 6. Billing Activation

**Progress event:** `onboarding.billing.reviewed` (trial) or `billing.subscription.active` (paid)  
**Path:** `/clinic/billing`

### Trial (review only)

| # | Task | Done |
|---|------|------|
| 6.1 | Open billing dashboard | [ ] |
| 6.2 | Review trial end date | [ ] |
| 6.3 | Confirm recommended plan (Starter vs Pro) | [ ] |
| 6.4 | Understand therapist seat limits | [ ] |

### Paid conversion

| # | Task | Done |
|---|------|------|
| 6.5 | Select plan (Starter / Pro / Enterprise) | [ ] |
| 6.6 | Add payment method via Stripe | [ ] |
| 6.7 | Confirm subscription active | [ ] |
| 6.8 | Generate test invoice | [ ] |

**Detail:** See `billing-activation-flow.md`.

---

## 7. Marketplace Integrations

**Progress event:** `onboarding.integration.connected`  
**Path:** `/clinic/marketplace`

| # | Integration | Priority | Done |
|---|-------------|----------|------|
| 7.1 | Google Calendar | High | [ ] |
| 7.2 | Twilio (SMS) | Medium (Pro+) | [ ] |
| 7.3 | SendGrid (email) | Medium (Pro+) | [ ] |
| 7.4 | Dropbox / Drive / OneDrive | Low | [ ] |
| 7.5 | Physiotec / MedBridge | Low (Pro+) | [ ] |

**Detail:** See `integrations-setup-flow.md`.

---

## 8. Post-Setup Verification

| # | Verification | Done |
|---|--------------|------|
| 8.1 | Onboarding progress ≥ 85% | [ ] |
| 8.2 | At least 1 therapist logged in | [ ] |
| 8.3 | At least 1 patient in portal (optional Day 7) | [ ] |
| 8.4 | Notification preferences reviewed | [ ] |
| 8.5 | Mobile app rollout communicated to patients | [ ] |

---

## Quick Reference: Portal Paths

| Task | Path |
|------|------|
| Profile | `/clinic/profile` |
| Staff | `/clinic/staff` |
| Patients | `/clinic/patients` |
| Appointments | `/clinic/appointments` |
| Billing | `/clinic/billing` |
| Marketplace | `/clinic/marketplace` |
| Enterprise | `/clinic/enterprise` |
| Reports | `/clinic/reports` |

---

## Admin Onboarding Email Schedule

| Day | Email subject (automated) |
|-----|---------------------------|
| 0 | Welcome to Ordella — your setup checklist |
| 1 | Step 2: Invite your therapists |
| 3 | Add your first patients |
| 5 | Connect Google Calendar (5 min) |
| 7 | How's your first week? |
| 10 | 4 days left — choose your plan |
| 14 | Trial ends today |

---

*Companion: `automated-onboarding-flow.md`, `docs/Clinic-Onboarding-Kit.md`*
