# Ordella Physio — Onboarding Readiness Checklist

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Acquisition Pipeline  
**Use when:** Trial Started, Converted, or CS onboarding call

> **Technical reference:** `gtm/onboarding-flow.md`, `docs/Clinic-Onboarding-Kit.md`

---

## Readiness Overview

| Phase | Owner | Target completion |
|-------|-------|-------------------|
| Clinic admin setup | Clinic Admin | Day 0–1 |
| Therapist setup | Therapists + Admin | Day 1–3 |
| Patient import | Clinic Admin | Day 2–5 |
| Billing setup | Clinic Admin | Day 3–7 (before trial end) |
| Marketplace integrations | Clinic Admin | Day 5–10 |
| Mobile app rollout | Clinic Admin + Patients | Day 7–14 |

**Go-live ready:** All required items (✓) complete below.

---

## 1. Clinic Admin Setup

**Portal:** `/clinic`  
**Owner:** Clinic Admin (OWNER or ADMIN role)  
**Time:** 60–90 minutes

### Account & profile

- [ ] ✓ Admin logged in successfully
- [ ] ✓ Clinic name, address, phone set (`/clinic/profile`)
- [ ] ✓ Timezone configured (critical for scheduling)
- [ ] ✓ Currency configured (billing)
- [ ] Logo and branding uploaded (Pro+ optional)
- [ ] ✓ Subscription plan reviewed (`/clinic/billing`)

### Staff & access

- [ ] ✓ At least 1 therapist invited (`/clinic/staff/create`)
- [ ] Front-desk staff invited (if applicable)
- [ ] Roles assigned correctly (OWNER, ADMIN, THERAPIST, STAFF)
- [ ] (Enterprise) Custom roles configured (`/clinic/enterprise`)

### Scheduling foundation

- [ ] ✓ At least 1 appointment created (`/clinic/appointments`)
- [ ] Therapist availability configured (or delegated to therapist)
- [ ] Notification preferences reviewed

### CS verification (internal)

- [ ] Admin contact email confirmed
- [ ] Plan fit matches therapist count
- [ ] No support blockers logged in CRM

---

## 2. Therapist Setup

**Portal:** `/therapist`  
**Owner:** Each therapist (invited by admin)  
**Time:** 15–30 minutes per therapist

### Access

- [ ] ✓ Therapist accepted invite and logged in
- [ ] ✓ Can view assigned appointments
- [ ] ✓ Can view assigned patients

### Availability

- [ ] Working hours / availability set
- [ ] Calendar reflects clinic timezone

### Clinical workflow

- [ ] ✓ At least 1 clinical note created
- [ ] (Pro+) AI assistant tested — preview → accept workflow understood
- [ ] (Pro+) Therapist understands: AI drafts only; therapist approves all saves
- [ ] SOAP template used or custom note created

### Communication

- [ ] Notification preferences set
- [ ] Messaging accessible (if clinic uses in-app messaging)

### CS verification (internal)

- [ ] ≥ 50% of invited therapists have logged in
- [ ] ≥ 1 note created (Pro trial)
- [ ] No clinical AI concerns escalated

---

## 3. Patient Import

**Portal:** `/clinic/patients` (admin), `/patient` (patient)  
**Owner:** Clinic Admin  
**Time:** 30–60 minutes (depends on volume)

### Data entry

- [ ] ✓ Minimum 3 patients added (trial); full roster imported (production)
- [ ] Required fields complete: name, email, phone
- [ ] Primary therapist assigned (optional but recommended)
- [ ] Duplicate patients checked

### Import methods

| Method | When to use | Checklist |
|--------|-------------|-----------|
| Manual entry | < 20 patients | [ ] Each patient verified |
| CSV import (placeholder) | 20–200 patients | [ ] Template validated; [ ] Import tested |
| Migration support | 200+ patients | [ ] Enterprise migration ticket opened |

### Patient activation

- [ ] ✓ At least 1 patient portal invite sent
- [ ] ✓ At least 1 patient logged into portal (or mobile app)
- [ ] Welcome email template used (see `gtm/onboarding-flow.md`)

### CS verification (internal)

- [ ] Patient count in CRM matches admin report
- [ ] No PHI import errors logged

---

## 4. Billing Setup

**Portal:** `/clinic/billing`  
**Owner:** Clinic Admin  
**Time:** 15–30 minutes

### Subscription (converted customers)

- [ ] ✓ Payment method on file (Stripe)
- [ ] ✓ Correct plan selected (Starter / Pro / Enterprise)
- [ ] ✓ Billing contact email confirmed
- [ ] Annual vs monthly selection confirmed

### Trial customers (pre-conversion)

- [ ] Trial end date communicated to admin
- [ ] Plan recommendation documented in CRM (based on therapist count)
- [ ] Billing page reviewed by admin before Day 10

### Invoicing workflow

- [ ] ✓ Test invoice generated for completed appointment
- [ ] Invoice delivery tested (email to patient)
- [ ] Patient can view invoice in portal
- [ ] Stripe customer portal accessible (if offered to patients)

### CS verification (internal)

- [ ] Stripe subscription active (converted)
- [ ] MRR recorded in CRM
- [ ] No failed payment on file

---

## 5. Marketplace Integrations

**Portal:** `/clinic/marketplace`  
**Owner:** Clinic Admin  
**Time:** 5–15 minutes per integration

### Priority integrations

| Priority | Provider | Connected | Tested |
|----------|----------|-----------|--------|
| 1 (recommended) | Google Calendar | [ ] | [ ] Appointment syncs |
| 2 | Twilio (SMS) | [ ] | [ ] Test SMS sent |
| 3 | SendGrid (email) | [ ] | [ ] Test email sent |
| 4 | Dropbox / Google Drive | [ ] | [ ] Test file upload |
| 5 | Zoom | [ ] | [ ] Test meeting link |
| 6 | Physiotec / MedBridge | [ ] | [ ] Test program sync |

### Enterprise integrations (Enterprise plan)

| Feature | Configured | Tested |
|---------|------------|--------|
| SSO (SAML / Azure AD / Google) | [ ] | [ ] Login flow |
| API keys | [ ] | [ ] Test API call |
| Webhooks | [ ] | [ ] Test delivery |
| Audit logs | [ ] | [ ] Admin can view |

### CS verification (internal)

- [ ] ≥ 1 marketplace integration connected (Pro+)
- [ ] Integration errors logged and resolved
- [ ] OAuth callbacks working in production

---

## 6. Mobile App Rollout

**Apps:** iOS + Android (Flutter)  
**Owner:** Clinic Admin (promotion); Patients (adoption)  
**Time:** Ongoing from Day 7

### Clinic preparation

- [ ] Admin aware of mobile app availability
- [ ] App store links shared with patients (placeholder URLs)
- [ ] Patient welcome email includes mobile download CTA
- [ ] Front-desk staff trained to mention app at check-in

### Patient adoption

- [ ] App download instructions in patient portal
- [ ] ≥ 1 patient installed app (target: 20% of active patients by Day 30)
- [ ] Push notifications enabled (patient device)
- [ ] Patient can view appointments in app
- [ ] Patient can receive notifications in app

### Rollout communications

| Channel | Message |
|---------|---------|
| Patient email | "Download the Ordella app for appointments and messages" |
| In-clinic poster (placeholder) | QR code → app store |
| Front-desk script | "You can view your appointments on our mobile app" |

### CS verification (internal)

- [ ] Mobile app links tested (iOS + Android)
- [ ] FCM push delivery confirmed (if applicable)
- [ ] No app crash reports from clinic patients

---

## Go-Live Readiness Summary

### Required for "Onboarding Complete" status

| Area | Required items |
|------|----------------|
| Clinic admin | Profile, 1 therapist, 1 appointment |
| Therapist | 1 logged in, 1 note (Pro+) |
| Patients | 3+ added, 1 portal login |
| Billing | Payment on file (converted) or plan selected (trial) |
| Integrations | 1 connected (Pro+ recommended) |
| Mobile | Instructions sent to patients |

### Readiness tiers

| Tier | Criteria | CRM status |
|------|----------|------------|
| **Minimum viable** | Admin + 1 therapist + 1 appointment | Trial Active |
| **Onboarding complete** | All required items above | Onboarding Complete |
| **Fully ramped** | All therapists active, integrations live, mobile adoption > 10% | Healthy Customer |

---

## CS Onboarding Call Agenda (30 min, Pro+)

| Time | Topic |
|------|-------|
| 0–5 min | Confirm profile, timezone, plan |
| 5–10 min | Walk through staff invite live |
| 10–15 min | Add 1 patient + create 1 appointment |
| 15–20 min | Therapist note workflow (AI if Pro) |
| 20–25 min | Billing + marketplace (Google Calendar) |
| 25–30 min | Patient portal + mobile app; Q&A |

---

## Onboarding Blockers & Escalation

| Blocker | Owner | SLA |
|---------|-------|-----|
| Cannot invite therapist | Support | 24h |
| Stripe payment failure | Billing / Support | 4h |
| Marketplace OAuth error | Engineering | 48h |
| SSO configuration (Enterprise) | Enterprise CS | 5 business days |
| Patient import > 500 records | Migration team | Custom timeline |
| Mobile app not loading | Engineering | 24h |

---

## Post-Onboarding Handoff

When all required items are complete:

1. Mark CRM deal: **Onboarding Complete**
2. Send Day 14 NPS (see `follow-up-automation.md`)
3. Schedule Day 30 check-in
4. Identify referral opportunity (NPS ≥ 8)
5. Move account to **Healthy Customer** monitoring

---

*Companion: `follow-up-automation.md`, `gtm/onboarding-flow.md`, `docs/Clinic-Onboarding-Kit.md`*
