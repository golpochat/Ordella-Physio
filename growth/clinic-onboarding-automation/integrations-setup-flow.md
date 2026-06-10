# Ordella Physio — Integrations Setup Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation  
**Portal:** `/clinic/marketplace`  
**Service:** `marketplace-service` (port 3064)

---

## Setup Overview

| Priority | Provider | Auth type | Onboarding day |
|----------|----------|-----------|----------------|
| 1 | Google Calendar | OAuth | Day 5 (automated email) |
| 2 | Twilio | API key | Day 7+ |
| 3 | SendGrid | API key | Day 7+ |
| 4 | Google Drive | OAuth | Optional |
| 5 | Dropbox | OAuth | Optional |
| 6 | OneDrive | OAuth | Optional |
| 7 | Zoom | OAuth | Optional |
| 8 | Physiotec | API key | Pro+ |
| 9 | MedBridge | API key | Pro+ |

**Progress event:** `onboarding.integration.connected` (+10% clinic onboarding)

---

## General Connection Flow

```
Clinic Admin → Marketplace → Select provider → Connect → Auth (OAuth or API key) → Callback → Connected
```

| Step | Action |
|------|--------|
| 1 | Navigate to `/clinic/marketplace` |
| 2 | Find provider card |
| 3 | Click **Connect** |
| 4 | Complete OAuth redirect or enter API credentials |
| 5 | Return to marketplace — status **Connected** |
| 6 | Run connection test (where available) |
| 7 | Verify hook behavior (appointment sync, SMS, etc.) |

### OAuth callback URLs (local / production)

| Provider | Callback path |
|----------|---------------|
| Google (Calendar, Drive) | `/marketplace/oauth/redirect` |
| Dropbox | `/marketplace/oauth/redirect` |
| OneDrive | `/marketplace/oauth/redirect` |
| Zoom | `/marketplace/oauth/redirect` |

Configured via `MARKETPLACE_OAUTH_CALLBACK_URL` and `MARKETPLACE_FRONTEND_CALLBACK_URL`.

---

## Google Calendar

**Purpose:** Sync appointments between Ordella and Google Calendar.

### Prerequisites
- Google Workspace or personal Google account
- Clinic Admin or OWNER role
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` configured (platform)

### Setup steps

| # | Step | Done |
|---|------|------|
| 1 | Open Marketplace → Google Calendar | [ ] |
| 2 | Click Connect | [ ] |
| 3 | Sign in to Google account | [ ] |
| 4 | Grant calendar read/write permissions | [ ] |
| 5 | Redirect back to `/clinic/marketplace/oauth/callback` | [ ] |
| 6 | Status shows **Connected** | [ ] |

### Verification

| # | Test | Expected |
|---|------|----------|
| 1 | Create appointment in Ordella | Event appears in Google Calendar |
| 2 | Update appointment time | Calendar event updates |
| 3 | Cancel appointment | Calendar event removed/cancelled |

### Troubleshooting

| Issue | Fix |
|-------|-----|
| OAuth error | Clear browser cookies; retry Connect |
| Wrong Google account | Disconnect and reconnect with correct account |
| Events not syncing | Check integration usage logs in marketplace UI |

---

## Dropbox / Google Drive / OneDrive

**Purpose:** Upload clinical documents and note attachments to cloud storage.

| Provider | Auth | Setup |
|----------|------|-------|
| **Dropbox** | OAuth | Marketplace → Dropbox → Connect |
| **Google Drive** | OAuth | Marketplace → Google Drive → Connect |
| **OneDrive** | OAuth | Marketplace → OneDrive → Connect |

### Setup steps (each)

| # | Step | Done |
|---|------|------|
| 1 | Connect via Marketplace OAuth | [ ] |
| 2 | Grant folder/file permissions | [ ] |
| 3 | Upload test document from notes workflow | [ ] |
| 4 | Verify file in cloud storage | [ ] |

### Verification
- Note attachment or export appears in connected storage
- Usage logged in Marketplace usage logs

---

## Twilio

**Purpose:** SMS appointment reminders and patient notifications.

### Prerequisites
- Twilio account with SMS-enabled number
- Account SID and Auth Token

### Setup steps

| # | Step | Done |
|---|------|------|
| 1 | Marketplace → Twilio → Connect | [ ] |
| 2 | Enter Account SID | [ ] |
| 3 | Enter Auth Token | [ ] |
| 4 | Enter SMS sender number | [ ] |
| 5 | Save and verify connection | [ ] |
| 6 | Send test SMS from clinic (if UI available) | [ ] |

### Verification
- Patient receives SMS on appointment create/update (per notification rules)
- Usage logged in `IntegrationUsageLog`

### Billing note
SMS may incur usage-based charges (see `gtm/pricing-model.md` add-ons).

---

## SendGrid

**Purpose:** Transactional email (appointment confirmations, invoices, portal invites).

### Prerequisites
- SendGrid account with verified sender domain
- API key with Mail Send permission

### Setup steps

| # | Step | Done |
|---|------|------|
| 1 | Marketplace → SendGrid → Connect | [ ] |
| 2 | Enter API key | [ ] |
| 3 | Configure sender email (matches clinic domain) | [ ] |
| 4 | Send test email | [ ] |

### Verification
- Patient invite email delivered
- Appointment notification email received
- Bounce/spam check on test mailbox

---

## Physiotec / MedBridge

**Purpose:** Sync exercise programs between Ordella and exercise platform.

| Provider | Auth | Typical users |
|----------|------|---------------|
| **Physiotec** | API key | Pro+ clinics |
| **MedBridge** | API key | Pro+ clinics |

### Setup steps

| # | Step | Done |
|---|------|------|
| 1 | Obtain API credentials from provider | [ ] |
| 2 | Marketplace → Physiotec or MedBridge → Connect | [ ] |
| 3 | Enter API key / clinic ID per provider docs | [ ] |
| 4 | Run program sync test | [ ] |
| 5 | Assign program to patient from therapist portal | [ ] |

### Verification
- Exercise program visible in patient context
- Sync event in marketplace usage logs

---

## Zoom (optional)

**Purpose:** Telehealth video sessions linked to appointments.

| # | Step | Done |
|---|------|------|
| 1 | Marketplace → Zoom → OAuth Connect | [ ] |
| 2 | Grant meeting creation permissions | [ ] |
| 3 | Create appointment with Zoom link | [ ] |
| 4 | Verify meeting link in patient notification | [ ] |

---

## Stripe (pre-configured)

Stripe is native to billing — not Marketplace OAuth.

| # | Check | Path |
|---|-------|------|
| 1 | Stripe customer on signup | Auto |
| 2 | Subscription / trial visible | `/clinic/billing` |

See `billing-activation-flow.md`.

---

## Onboarding Automation

| Day | Email | Integration focus |
|-----|-------|-------------------|
| 5 | Connect Google Calendar (5 min) | Google Calendar |
| 7 | SMS and email reminders | Twilio + SendGrid (Pro+) |
| 14 | Explore exercise platforms | Physiotec / MedBridge |

### In-app prompt
When `integration` step incomplete at Day 5 → dashboard banner: "Connect Google Calendar to sync appointments."

---

## Integration Checklist (onboarding complete)

| # | Provider | Connected | Tested |
|---|----------|-----------|--------|
| 1 | Google Calendar | [ ] | [ ] |
| 2 | Twilio | [ ] | [ ] |
| 3 | SendGrid | [ ] | [ ] |
| 4 | Cloud storage (any) | [ ] | [ ] |
| 5 | Exercise platform | [ ] | [ ] |

**Minimum for Pro onboarding:** Google Calendar + one communication channel (Twilio or SendGrid).

---

## Escalation

| Issue | Level |
|-------|-------|
| OAuth redirect loop | L2 Support |
| API key rejected | L2 — verify credentials |
| Sync not working after 24h | L3 Engineering |
| Provider outage | Status page + L2 comms |

---

*Companion: `clinic-admin-checklist.md`, `automated-onboarding-flow.md`, `services/marketplace-service/`*
