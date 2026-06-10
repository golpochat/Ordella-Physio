# Ordella Physio — Clinic Onboarding Kit

**Version:** 1.0  
**Date:** 2026-06-10  
**Audience:** Clinic administrators, therapists, and patients

---

## Overview

This kit walks new clinics through setup from tenant creation to daily operations. Estimated time: **2–4 hours** for full setup.

**Prerequisites:**
- Clinic Admin account with OWNER or ADMIN role
- Valid email for all staff
- Stripe payment method (for paid plans)
- English as the clinic's operating language (platform UI is English-only)

---

## Step-by-Step Onboarding Guide

### Phase 1: Account & tenant (15 min)

1. Register at `/register` with clinic name and admin email
2. Select or create your tenant (clinic)
3. Verify email and complete login
4. Confirm you land on **Clinic Admin** portal (`/clinic`)

### Phase 2: Clinic profile (15 min)

1. Go to **Clinic → Profile**
2. Set clinic name, address, phone, timezone, currency
3. Upload branding (logo, colors) if on Professional or Enterprise plan
4. Review subscription plan under **Clinic → Billing**

### Phase 3: Staff & roles (30 min)

1. Go to **Clinic → Staff → Create**
2. Invite therapists, front-desk staff, and admins
3. Assign roles: OWNER, ADMIN, THERAPIST, STAFF
4. (Enterprise) Configure custom roles under **Clinic → Enterprise → Roles**

### Phase 4: Patients (30 min)

1. Go to **Clinic → Patients → Create**
2. Import or add patients manually
3. Send portal invite instructions (email with login link)
4. Verify patient can log in at `/patient`

### Phase 5: Scheduling (30 min)

1. Go to **Clinic → Appointments**
2. Create first appointments linking patients and therapists
3. Configure therapist availability (Therapist portal)
4. (Optional) Connect Google Calendar via **Marketplace**

### Phase 6: Clinical workflow (30 min)

1. Therapist logs in at `/therapist`
2. Open appointment → create clinical note
3. (Professional+) Try AI assistant for SOAP draft → review → accept
4. Verify note visible in **Clinic → Notes**

### Phase 7: Billing (20 min)

1. Go to **Clinic → Billing**
2. Select plan (Starter / Professional / Enterprise)
3. Add payment method via Stripe
4. Generate test invoice for a completed appointment

### Phase 8: Integrations (20 min, optional)

1. Go to **Clinic → Marketplace**
2. Connect desired providers (calendar, SMS, email, storage)
3. (Enterprise) Configure webhooks and API keys under **Clinic → Enterprise**

---

## Admin Setup Instructions

| Task | Location | Notes |
|------|----------|-------|
| Manage staff | `/clinic/staff` | Invite by email, assign roles |
| Manage roles | `/clinic/roles` | System roles; custom roles in Enterprise |
| Subscription | `/clinic/billing` | Stripe plan, invoices, customer portal |
| Reports | `/clinic/reports` | KPIs, exports |
| Marketplace | `/clinic/marketplace` | Third-party integrations |
| Enterprise | `/clinic/enterprise` | SSO, audit, API keys (Enterprise plan) |
| Notifications | `/clinic/notifications` | Alert preferences |
| Messages | `/clinic/messages` | Staff-patient communication |

**Security recommendations:**
- Use strong passwords; enable SSO on Enterprise plan
- Review audit logs weekly (`/clinic/enterprise` → Audit)
- Rotate API keys quarterly

---

## Therapist Setup Instructions

1. Accept staff invitation email
2. Log in at `/therapist`
3. Review **Appointments** for today's schedule
4. Configure availability if self-managed
5. Practice creating a clinical note with AI assistant (if enabled)
6. Enable notifications and messaging for patient communication
7. Download mobile app for on-the-go access (`apps/mobile`)

**Daily workflow:**
- Check appointments → conduct session → write note → mark complete
- Respond to patient messages via **Messages**
- Review notifications for schedule changes

---

## Patient Onboarding Flow

1. Clinic admin creates patient record
2. Patient receives welcome email with portal link
3. Patient registers or logs in at `/patient`
4. Patient views upcoming appointments
5. Patient can message clinic staff
6. (Optional) Patient installs mobile app for push notifications

**Patient self-service:**
- View appointments and history
- Read clinical note summaries (as permitted by clinic)
- Pay invoices (Billing portal)
- Update profile

---

## Billing Setup

### For clinic platform subscription
1. **Clinic → Billing**
2. Choose Starter, Professional, or Enterprise
3. Enter payment method (Stripe Elements)
4. Confirm subscription active

### For patient invoicing
1. Complete appointment
2. System generates invoice (or manual via billing module)
3. Patient pays via Patient portal or Stripe link
4. Webhook confirms payment → notification sent

**Stripe webhook URL:** `https://api.ordella-physio.com/billing/webhook`

---

## Marketplace Integrations Setup

| Provider | Type | Use case |
|----------|------|----------|
| Google Calendar | OAuth | Sync appointments |
| Stripe Billing | Linked | Platform subscription (auto) |
| Twilio | API Key | SMS reminders |
| SendGrid | API Key | Email notifications |
| Dropbox / Drive / OneDrive | OAuth | Note document backup |
| Zoom | OAuth | Telehealth sessions |
| Physiotec / MedBridge | API Key | Exercise programs |

**Steps:**
1. Go to `/clinic/marketplace`
2. Select provider → **Connect**
3. Complete OAuth or enter API key
4. Verify integration status badge shows **Connected**
5. Check usage logs on provider detail page

---

## Support Contacts

| Channel | Contact | Hours |
|---------|---------|-------|
| Email support | support@ordella-physio.com | Mon–Fri 9am–6pm GMT |
| Enterprise SLA | enterprise@ordella-physio.com | 24/7 (Enterprise plan) |
| Documentation | `docs/` in repository | Self-service |
| Status page | status.ordella-physio.com (placeholder) | 24/7 |

**Escalation path:**
1. Email support with tenant ID and screenshot
2. Enterprise customers: dedicated Slack channel (placeholder)
3. Critical outage: on-call via enterprise SLA

---

## Post-Onboarding Checklist

- [ ] All therapists invited and logged in
- [ ] At least one test appointment completed end-to-end
- [ ] Clinical note created and reviewed
- [ ] Billing subscription active
- [ ] Patient portal tested
- [ ] Messaging and notifications working
- [ ] Marketplace integrations connected (if needed)
- [ ] Mobile app tested (optional)

---

*Welcome to Ordella Physio. Your platform is ready for scale.*
