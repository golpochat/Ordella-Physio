# Ordella Physio — Therapist Onboarding Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation  
**Portal:** `/therapist`  
**Trigger:** Clinic Admin sends therapist invitation

---

## Flow Overview

```
Invite email → Account creation → First login → Profile → Calendar → Notes training → Mobile app
```

| Phase | Time | Automated |
|-------|------|-----------|
| Invite & account | 5 min | Invite email |
| First login wizard | 10 min | In-app banner |
| Calendar setup | 10 min | Tooltip |
| Notes training | 15 min | Email Day 2 (Pro+) |
| Mobile install | 5 min | Email Day 3 (optional) |

---

## Phase 1: Account Creation

### Trigger
Clinic Admin creates staff record with role **THERAPIST** at `/clinic/staff/create`.

### Automated invite email

**Subject:** You've been invited to [Clinic Name] on Ordella Physio

**Body:**

Hi [Therapist Name],

[Admin Name] invited you to join **[Clinic Name]** on Ordella Physio.

Ordella is your clinic's practice platform — view appointments, create clinical notes, and message patients from your own therapist portal.

**Get started:** {{invite_link}}

You'll set your password on first login. The platform is English-only.

Questions? Contact your clinic admin or support@ordella-physio.com.

Ordella Physio

### Account creation steps

| # | Step | Action |
|---|------|--------|
| 1 | Click invite link | Opens `/register` or password setup |
| 2 | Set password | Min 8 characters |
| 3 | Log in | `/login` → redirect to `/therapist` |
| 4 | Confirm tenant | Auto-selected to inviting clinic |

**Progress event:** `onboarding.therapist.activated` (first login)

---

## Phase 2: Profile Setup

**Path:** `/therapist/profile` (or settings)

| # | Field | Required |
|---|-------|----------|
| 1 | Display name | Yes |
| 2 | Professional title | Recommended |
| 3 | Phone (optional) | No |
| 4 | Notification preferences | Yes |
| 5 | Email notifications: appointments, messages | Configure |

### First-login mini-wizard (in-app)

| Screen | Content |
|--------|---------|
| Welcome | "Welcome to [Clinic Name]" |
| Profile | Confirm name and notifications |
| Next | "Set your availability" → calendar |

---

## Phase 3: Calendar Setup

**Path:** Therapist portal → availability / appointments

| # | Task | Done |
|---|------|------|
| 1 | Review assigned appointments from admin | [ ] |
| 2 | Set weekly working hours / availability | [ ] |
| 3 | Confirm timezone matches clinic | [ ] |
| 4 | Block unavailable times (if supported) | [ ] |
| 5 | (Optional) Verify Google Calendar sync via clinic Marketplace | [ ] |

### Calendar guidance (in-app tooltip)

> Your availability helps the clinic schedule appointments. Patients see confirmed times in their portal — not your internal calendar blocks.

### Automated email (Day 1, if no availability set)

**Subject:** Set your availability on Ordella

**Body:**

Hi [Name], make sure your working hours are set so [Clinic Name] can book appointments for you. Log in: {{therapist_portal_link}}

---

## Phase 4: Notes Training

**Path:** `/therapist/appointments/[id]` → Notes  
**Plan:** Pro+ for AI features; all plans for manual SOAP notes

### 4.1 Manual SOAP note (all plans)

| # | Step | Action |
|---|------|--------|
| 1 | Open an appointment | From calendar or list |
| 2 | Open Notes section | Create new note |
| 3 | Select SOAP template | Subjective, Objective, Assessment, Plan |
| 4 | Complete each section | Free text |
| 5 | Save note | Therapist review implicit (author) |

### 4.2 AI-assisted notes (Pro+)

| # | Step | Action |
|---|------|--------|
| 1 | Open AI assistant panel | On appointment or note create |
| 2 | Generate SOAP draft | From appointment + patient context |
| 3 | Review preview modal | Edit if needed |
| 4 | Click **Accept** or **Reject** | Nothing saved on reject |
| 5 | Confirm note in list | Visible to clinic admin |

### 4.3 Voice-to-note (Pro+)

| # | Step | Action |
|---|------|--------|
| 1 | Open AI assistant → Voice | Microphone permission |
| 2 | Dictate session notes | Whisper transcription |
| 3 | Review transcript → generate SOAP | Same preview flow |
| 4 | Accept after review | Mandatory |

### Training messaging (clinical guardrail)

**Always communicate:**
> AI drafts your note — you review and approve before anything is saved. You stay in control of clinical documentation.

### Automated emails

| Day | Subject | Content |
|-----|---------|---------|
| 2 | Create your first clinical note | Link to appointment + SOAP guide |
| 4 (Pro+) | Try the AI note assistant | AI review workflow + disclaimer |

**Progress event:** `onboarding.note.created` (updates clinic onboarding progress)

---

## Phase 5: Mobile App Installation

**Apps:** iOS + Android (Flutter) — `apps/mobile`

| # | Task | Done |
|---|------|------|
| 1 | Download from App Store / Google Play | [ ] |
| 2 | Log in with therapist credentials | [ ] |
| 3 | Confirm tenant / clinic selected | [ ] |
| 4 | Enable push notifications | [ ] |
| 5 | View appointments on mobile | [ ] |
| 6 | (Optional) Create note from mobile | [ ] |

**Detail:** See `mobile-app-rollout.md` (therapist section).

### Automated email (Day 3)

**Subject:** Ordella mobile app for therapists

**Body:**

Hi [Name], manage appointments on the go: {{ios_link}} | {{android_link}}

---

## Therapist Onboarding Checklist (summary)

| # | Item | Required |
|---|------|----------|
| 1 | Account created, first login | Yes |
| 2 | Profile and notifications configured | Yes |
| 3 | Availability set | Yes |
| 4 | Viewed ≥ 1 assigned appointment | Yes |
| 5 | Created ≥ 1 clinical note | Pro+ recommended |
| 6 | (Pro+) AI assistant used with accept/reject understood | Pro+ |
| 7 | Mobile app installed | Optional |

---

## At-Risk Therapist Signals

| Signal | Day | Action |
|--------|-----|--------|
| Invite sent, no login | 3 | Admin reminder + automated resend |
| Logged in, no availability | 5 | In-app banner + email |
| No note created | 7 | Training email + admin nudge |
| AI note rejected 5+ times | — | Support L2 — check AI config |

---

## CRM / Progress Integration

| Event | Clinic onboarding impact |
|-------|--------------------------|
| Therapist first login | — |
| Therapist note created | +10% clinic progress (`note` step) |
| All invited therapists logged in | CS health signal: green |

---

*Companion: `automated-onboarding-flow.md`, `training-materials-outline.md`, `gtm/demo-script.md` (AI section)*
