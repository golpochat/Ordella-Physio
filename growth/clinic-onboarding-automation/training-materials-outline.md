# Ordella Physio — Training Materials Outline

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation  
**Languages:** English only (matches platform)

---

## Materials Overview

| Type | Count (planned) | Owner | Status |
|------|-----------------|-------|--------|
| Video tutorials | 12 | Product / CS | Placeholder |
| Help center articles | 40+ | Support / Product | Outline |
| FAQ entries | 25 | Support / Marketing | Outline |
| PDF quick guides | 5 | Marketing | Existing in GTM |
| In-app tooltips | 15 | Product | Planned |

---

## Video Tutorials (Placeholder)

**Host:** help.ordella-physio.com/video (placeholder)  
**Format:** 2–5 minutes each, English narration, clinic portal screen recordings

### Clinic Admin series

| # | Title | Duration | Topics |
|---|-------|----------|--------|
| 1 | Welcome to Ordella Physio | 3 min | Portals, trial, onboarding wizard |
| 2 | Setting up your clinic profile | 4 min | Name, timezone, currency, branding |
| 3 | Inviting therapists and staff | 3 min | Roles, invites, permissions |
| 4 | Adding and importing patients | 5 min | Manual entry, CSV import |
| 5 | Creating appointments | 4 min | Schedule, notifications, calendar |
| 6 | Billing and subscriptions | 5 min | Plans, Stripe, invoices |
| 7 | Marketplace integrations | 5 min | Google Calendar, Twilio, SendGrid |
| 8 | Reports and exports | 4 min | KPIs, CSV download |

### Therapist series

| # | Title | Duration | Topics |
|---|-------|----------|--------|
| 9 | Therapist portal tour | 3 min | Dashboard, appointments, patients |
| 10 | Creating SOAP notes | 5 min | Templates, save workflow |
| 11 | AI-assisted notes | 5 min | Generate, preview, accept/reject |
| 12 | Voice-to-note | 3 min | Dictation, review, save |

### Patient series (optional)

| # | Title | Duration | Topics |
|---|-------|----------|--------|
| P1 | Patient portal and mobile app | 3 min | Login, appointments, messages |

---

## Help Center Structure

**URL:** `https://help.ordella-physio.com` (placeholder)

### Top-level categories

```
Help Center
├── Getting Started
├── Clinic Admin
├── Therapist Guide
├── Patient Guide
├── Billing & Subscriptions
├── Integrations (Marketplace)
├── Mobile App
├── Enterprise & Security
├── Troubleshooting
└── Contact Support
```

### Getting Started (articles)

| Slug | Title |
|------|-------|
| `getting-started/overview` | What is Ordella Physio? |
| `getting-started/signup` | Creating your clinic account |
| `getting-started/onboarding-checklist` | Onboarding checklist (link to automation docs) |
| `getting-started/portals` | Understanding role-based portals |
| `getting-started/trial` | Your 14-day free trial |
| `getting-started/go-live` | Going live in 2 hours |

### Clinic Admin (articles)

| Slug | Title |
|------|-------|
| `admin/profile` | Clinic profile setup |
| `admin/staff` | Inviting therapists and staff |
| `admin/patients` | Managing patients |
| `admin/patients/import` | CSV patient import |
| `admin/appointments` | Scheduling appointments |
| `admin/billing` | Billing dashboard |
| `admin/marketplace` | Connecting integrations |
| `admin/reports` | Reports and analytics |
| `admin/messaging` | In-app messaging |
| `admin/notifications` | Notification settings |

### Therapist Guide (articles)

| Slug | Title |
|------|-------|
| `therapist/first-login` | First login and setup |
| `therapist/availability` | Setting your availability |
| `therapist/notes` | Clinical notes and SOAP templates |
| `therapist/ai-notes` | AI-assisted documentation |
| `therapist/voice-to-note` | Voice-to-note transcription |
| `therapist/messaging` | Messaging patients and staff |

### Patient Guide (articles)

| Slug | Title |
|------|-------|
| `patient/portal` | Using the patient portal |
| `patient/appointments` | Viewing appointments |
| `patient/messages` | Messaging your clinic |
| `patient/mobile` | Mobile app installation |
| `patient/billing` | Viewing invoices |

### Billing & Subscriptions (articles)

| Slug | Title |
|------|-------|
| `billing/plans` | Starter, Pro, and Enterprise plans |
| `billing/payment` | Adding a payment method |
| `billing/invoices` | Creating and sending invoices |
| `billing/stripe-portal` | Stripe customer portal |
| `billing/upgrade` | Upgrading your plan |

### Integrations (articles)

| Slug | Title |
|------|-------|
| `integrations/overview` | Marketplace overview |
| `integrations/google-calendar` | Google Calendar setup |
| `integrations/twilio` | Twilio SMS setup |
| `integrations/sendgrid` | SendGrid email setup |
| `integrations/dropbox` | Dropbox setup |
| `integrations/google-drive` | Google Drive setup |
| `integrations/onedrive` | OneDrive setup |
| `integrations/zoom` | Zoom telehealth setup |
| `integrations/physiotec` | Physiotec setup |
| `integrations/medbridge` | MedBridge setup |

### Enterprise & Security (articles)

| Slug | Title |
|------|-------|
| `enterprise/sso` | SSO configuration |
| `enterprise/roles` | Custom roles (RBAC v2) |
| `enterprise/audit-logs` | Audit and activity logs |
| `enterprise/api-keys` | API keys |
| `enterprise/webhooks` | Webhooks |
| `security/tenant-isolation` | How tenant isolation works |
| `security/data-residency` | Multi-region data residency |

### Troubleshooting (articles)

| Slug | Title |
|------|-------|
| `troubleshooting/login` | Login issues |
| `troubleshooting/notifications` | Notifications not received |
| `troubleshooting/integrations` | Integration connection failures |
| `troubleshooting/billing` | Payment and invoice issues |
| `troubleshooting/mobile` | Mobile app issues |

### Contact Support

| Slug | Title |
|------|-------|
| `support/contact` | How to contact support |
| `support/escalation` | Escalation process |
| `support/sla` | Enterprise SLA |

---

## FAQ Structure

**URL:** `/pricing` FAQ section + `help.ordella-physio.com/faq`

### Categories

| Category | # Questions |
|----------|-------------|
| General | 5 |
| Trial & pricing | 6 |
| Clinic setup | 5 |
| Clinical notes & AI | 4 |
| Billing | 3 |
| Integrations | 2 |

### General

| Question | Answer summary |
|----------|----------------|
| What is Ordella Physio? | All-in-one physio practice platform |
| Who is it for? | Physio clinics 1–50+ therapists |
| Is the UI available in other languages? | English only globally |
| How long does setup take? | 2–4 hours |
| Is my data secure? | Tenant isolation, TLS, RBAC |

### Trial & pricing

| Question | Answer summary |
|----------|----------------|
| Is there a free trial? | 14 days, Starter and Pro |
| Is a credit card required? | No for trial |
| Can I change plans? | Yes, upgrade/downgrade via billing |
| What happens when trial ends? | Choose plan or account paused 30 days |
| Enterprise pricing? | Custom — contact sales |

### Clinic setup

| Question | Answer summary |
|----------|----------------|
| How do I invite therapists? | Clinic Admin → Staff → Create |
| Can I import patients? | CSV import (bulk) or manual |
| How many therapists per plan? | 2 / 10 / unlimited |
| Multi-location support? | Pro+ |
| Can I migrate from another PMS? | Enterprise migration support |

### Clinical notes & AI

| Question | Answer summary |
|----------|----------------|
| Does AI save notes automatically? | No — therapist must review and accept |
| What note formats are supported? | SOAP templates |
| Is voice-to-note available? | Pro+ (Whisper) |
| Is AI HIPAA/GDPR compliant? | Enterprise audit + DPA; therapist control |

### Billing

| Question | Answer summary |
|----------|----------------|
| What payment methods? | Card via Stripe |
| Can patients pay online? | Invoice payment links |
| Annual billing discount? | 20% vs monthly (placeholder) |

### Integrations

| Question | Answer summary |
|----------|----------------|
| What integrations are available? | 10 marketplace providers |
| Do I need a developer? | No — self-serve OAuth/API key |

*Existing FAQ seeds: `apps/frontend-web/lib/marketing-content.ts` → `PRICING_FAQ_ITEMS`*

---

## Delivery in Onboarding Automation

| Trigger | Material delivered |
|---------|-------------------|
| Signup | Getting Started overview link |
| Day 1 | Video #3 (inviting staff) |
| Day 3 | Article: patient import |
| Day 5 | Video #7 (integrations) |
| Therapist invite | Video #9 (therapist tour) |
| Pro trial | Video #11 (AI notes) |
| Support ticket L1 | Relevant help article link |

---

## Content Maintenance

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Article review | Quarterly | Product |
| Video refresh on UI change | Per major release | Product |
| FAQ update from support tickets | Monthly | Support |
| New integration article | Per marketplace provider | Product |

---

*Companion: `support-escalation-flow.md`, `docs/Clinic-Onboarding-Kit.md`, `gtm/landing-page-copy.md`*
