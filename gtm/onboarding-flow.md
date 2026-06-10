# Ordella Physio — Onboarding Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — GTM Activation  
**Estimated total time:** 2–4 hours for full clinic setup

> **Technical reference:** `docs/Clinic-Onboarding-Kit.md` for detailed admin instructions.

---

## Onboarding Overview

```
Registration → Clinic Admin setup → Therapist setup → Patient setup → Billing → Integrations → Go live
```

| Role | Portal | Setup time | Owner |
|------|--------|------------|-------|
| Clinic Admin | `/clinic` | 60–90 min | Owner / practice manager |
| Therapist | `/therapist` | 15–30 min each | Individual therapists |
| Patient | `/patient` | 5 min each | Self-serve (invited) |
| Staff | `/staff` | 10 min | Clinic Admin |

---

## Phase 1: Clinic Admin Onboarding

### 1.1 Registration (10 min)

| Step | Action | Path |
|------|--------|------|
| 1 | Register with clinic name, admin email, password | `/register` |
| 2 | Verify email | Inbox link |
| 3 | Log in and select/create tenant | `/login` |
| 4 | Confirm landing on Clinic Admin portal | `/clinic` |

**Success criteria:** Admin logged in, tenant created, Stripe customer provisioned (background).

---

### 1.2 Clinic profile (15 min)

| Step | Action | Path |
|------|--------|------|
| 1 | Set clinic name, address, phone | `/clinic/profile` |
| 2 | Configure timezone and currency | `/clinic/profile` |
| 3 | Upload logo and branding (Pro+) | `/clinic/profile` |
| 4 | Review subscription plan | `/clinic/billing` |

**Success criteria:** Clinic profile complete, timezone correct for scheduling.

---

### 1.3 Staff and roles (30 min)

| Step | Action | Path |
|------|--------|------|
| 1 | Invite therapists | `/clinic/staff/create` |
| 2 | Invite front-desk staff | `/clinic/staff/create` |
| 3 | Assign roles: OWNER, ADMIN, THERAPIST, STAFF | Staff management |
| 4 | (Enterprise) Create custom roles | `/clinic/enterprise` |

**Role guide:**

| Role | Access |
|------|--------|
| OWNER | Full clinic admin + billing |
| ADMIN | Clinic management, no billing delete |
| THERAPIST | Appointments, notes, patients (assigned) |
| STAFF | Front desk, scheduling support |

**Success criteria:** ≥ 1 therapist invited and logged in.

---

### 1.4 Clinic configuration checklist

- [ ] Clinic profile complete
- [ ] At least 1 therapist invited
- [ ] At least 1 staff member invited (if applicable)
- [ ] Subscription plan selected (trial or paid)
- [ ] Notification preferences reviewed

---

## Phase 2: Therapist Onboarding

### 2.1 First login (5 min)

| Step | Action |
|------|--------|
| 1 | Accept invite email → set password |
| 2 | Log in at `/therapist` |
| 3 | Review assigned patients and appointments |

---

### 2.2 Availability setup (10 min)

| Step | Action | Path |
|------|--------|------|
| 1 | Set working hours and availability | Therapist portal → availability |
| 2 | Review upcoming appointments | `/therapist/appointments` |
| 3 | Configure notification preferences | Profile / settings |

---

### 2.3 Clinical workflow (15 min)

| Step | Action | Path |
|------|--------|------|
| 1 | Open an appointment | `/therapist/appointments/[id]` |
| 2 | Create a clinical note (SOAP) | Notes section |
| 3 | (Pro+) Try AI assistant → preview → accept | AI assistant panel |
| 4 | (Pro+) Try voice-to-note | AI assistant → voice input |
| 5 | Verify note saved and visible | `/therapist/notes` |

**Therapist onboarding email (Day 0):**

> Welcome to [Clinic Name] on Ordella Physio. Log in at [URL] to see your appointments and patients. Need help with notes? Try the AI assistant — it drafts SOAP notes, but you review everything before it's saved.

**Success criteria:** Therapist created ≥ 1 note, understands AI review workflow.

---

## Phase 3: Patient Onboarding

### 3.1 Patient record creation (Clinic Admin — 10 min per batch)

| Step | Action | Path |
|------|--------|------|
| 1 | Add patient (name, email, phone, DOB) | `/clinic/patients/create` |
| 2 | Assign primary therapist (optional) | Patient record |
| 3 | Send portal invite instructions | Email (manual or automated) |

---

### 3.2 Patient self-serve activation (5 min)

| Step | Action |
|------|--------|
| 1 | Patient receives invite email |
| 2 | Registers or sets password at `/register` or `/patient` |
| 3 | Logs in to patient portal |
| 4 | (Optional) Downloads mobile app (iOS / Android) |

---

### 3.3 Patient portal walkthrough

| Feature | What patient sees |
|---------|-------------------|
| Dashboard | Upcoming appointments, recent notifications |
| Appointments | Schedule, details, status |
| Messages | In-app messaging with clinic |
| Notifications | Appointment reminders, billing alerts |
| Profile | Contact info, password |

**Patient welcome email:**

> [Clinic Name] has set you up on Ordella Physio. View your appointments, message your clinic, and manage your care at [portal URL]. Download our mobile app for the best experience.

**Success criteria:** ≥ 3 patients added, ≥ 1 patient logged into portal.

---

## Phase 4: Billing Setup

### 4.1 Subscription (Clinic Admin — 15 min)

| Step | Action | Path |
|------|--------|------|
| 1 | Review plan options (Starter / Pro / Enterprise) | `/clinic/billing` |
| 2 | Select plan | Billing → plan selector |
| 3 | Add payment method via Stripe | Stripe checkout / portal |
| 4 | Confirm subscription active | Billing dashboard |

**Plan selection guide:**

| Clinic size | Recommended plan |
|-------------|-----------------|
| 1–2 therapists | Starter ($49/mo placeholder) |
| 3–10 therapists | Pro ($99/mo placeholder) |
| 10+ therapists, SSO needed | Enterprise (custom) |

---

### 4.2 Invoicing workflow (15 min)

| Step | Action | Path |
|------|--------|------|
| 1 | Complete an appointment | Appointments |
| 2 | Generate invoice for appointment | `/clinic/billing` → create invoice |
| 3 | Send invoice to patient (email) | Invoice actions |
| 4 | Verify patient sees invoice | Patient portal → billing |

**Success criteria:** Payment method on file, ≥ 1 test invoice generated.

---

## Phase 5: Marketplace Integrations Setup

### 5.1 Recommended integrations by priority

| Priority | Provider | Purpose | Plan |
|----------|----------|---------|------|
| 1 | Google Calendar | Appointment sync | All |
| 2 | Stripe | Payments (pre-configured) | All |
| 3 | Twilio | SMS reminders | Pro+ |
| 4 | SendGrid | Email notifications | Pro+ |
| 5 | Dropbox / Google Drive | Document storage | Pro+ |
| 6 | Zoom | Telehealth sessions | Pro+ |
| 7 | Physiotec / MedBridge | Exercise programs | Pro+ |

---

### 5.2 Connection flow (per provider — 5–10 min each)

| Step | Action | Path |
|------|--------|------|
| 1 | Open Marketplace | `/clinic/marketplace` |
| 2 | Select provider | Provider card |
| 3 | Click Connect | OAuth or API key form |
| 4 | Complete OAuth redirect or enter API key | Provider auth |
| 5 | Verify status: Connected | Marketplace dashboard |
| 6 | Test integration (e.g., create appointment → check calendar) | Manual test |

---

### 5.3 Enterprise integrations (Enterprise plan only)

| Feature | Path | Setup time |
|---------|------|------------|
| SSO (SAML / Azure AD / Google) | `/clinic/enterprise` → SSO | 30–60 min |
| Custom roles (RBAC v2) | `/clinic/enterprise` → Roles | 20 min |
| API keys | `/clinic/enterprise` → API Keys | 10 min |
| Webhooks | `/clinic/enterprise` → Webhooks | 15 min |
| Audit log review | `/clinic/enterprise` → Audit Logs | Ongoing |

---

## Go-Live Checklist

### Clinic Admin
- [ ] Clinic profile complete (name, address, timezone, currency)
- [ ] ≥ 1 therapist invited and logged in
- [ ] ≥ 3 patients added
- [ ] ≥ 1 appointment created
- [ ] Billing plan selected, payment method on file
- [ ] ≥ 1 integration connected (recommended: Google Calendar)
- [ ] Test notification received (appointment reminder)

### Therapist
- [ ] Logged in to therapist portal
- [ ] Availability configured
- [ ] ≥ 1 clinical note created
- [ ] (Pro+) AI assistant tested with review workflow

### Patient
- [ ] ≥ 1 patient logged into portal or mobile app
- [ ] Appointment visible in patient dashboard

### Enterprise (if applicable)
- [ ] SSO configured and tested
- [ ] Custom roles assigned
- [ ] Audit log accessible
- [ ] API key or webhook tested

---

## Onboarding Timeline

| Day | Focus | Owner |
|-----|-------|-------|
| Day 0 | Registration, profile, invite therapists | Clinic Admin |
| Day 1 | Add patients, create appointments | Clinic Admin |
| Day 2 | Therapist notes + AI workflow | Therapists |
| Day 3 | Billing setup, first invoice | Clinic Admin |
| Day 4 | Marketplace integrations | Clinic Admin |
| Day 5 | Patient portal invites, go-live | Clinic Admin |
| Day 7 | CS check-in call (Pro+) | Customer Success |
| Day 14 | Review + plan conversion (if trial) | Clinic Admin + Sales |

---

## Support Contacts (Placeholder)

| Channel | Contact | Hours |
|---------|---------|-------|
| Email | support@ordella-physio.com | 24h response |
| Onboarding (Pro+) | onboarding@ordella-physio.com | Business hours |
| Enterprise | enterprise@ordella-physio.com | Dedicated CSM |
| Documentation | `docs/Clinic-Onboarding-Kit.md` | Self-serve |
| Emergency | status@ordella-physio.com | Platform outages |

---

*Companion: `docs/Clinic-Onboarding-Kit.md`, `gtm/sales-funnel.md`, `gtm/outreach-strategy.md`*
