# Ordella Physio — Product-Led Growth Loop

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Growth Flywheel  
**Loop:** Product usage → value realized → upgrade / expand → deeper usage

---

## PLG Loop Model

```
Signup → Activation → Habit → Expansion (upgrade/add-on) → Advocacy → New signups
```

| Lever | Mechanism |
|-------|-----------|
| Self-serve trial | `/register` 14-day, no card |
| In-product value | Onboarding wizard, first appointment |
| Upgrade prompts | Plan gates + usage triggers |
| Viral surfaces | Patient portal, mobile app branding |

**Reference:** `growth/sales-conversion-engine/upgrade-flow.md`, `growth/clinic-onboarding-automation/automated-onboarding-flow.md`

---

## In-App Upgrade Prompts

### Prompt catalog

| ID | Trigger | Plan | UI | CTA |
|----|---------|------|-----|-----|
| `UPG-01` | 3rd therapist invite | Starter | Modal | Upgrade to Pro |
| `UPG-02` | AI panel opened | Starter | Inline gate | Unlock on Pro |
| `UPG-03` | Reports page visit | Starter | Banner | Pro reporting |
| `UPG-04` | Marketplace non-Google | Starter | Provider card lock | Pro integrations |
| `UPG-05` | 11th therapist | Pro | Modal | Contact Enterprise |
| `UPG-06` | Enterprise page visit | Pro | Full page gate | Book discovery |
| `UPG-07` | Trial Day 10 | Trial | Dashboard banner | Choose plan |
| `UPG-08` | Annual billing toggle | Any | Pricing nudge | Save 20% |

### Display rules

| Rule | Value |
|------|-------|
| Max modals per session | 1 |
| Same prompt cooldown | 7 days if dismissed |
| Never block critical path | Scheduling always works on Starter |
| Enterprise CTAs | Never hard-block; always "Contact sales" |

### Implementation (placeholder)

```typescript
// packages/ui or frontend-web: useUpgradePrompt({ tenantId, userId, feature })
// Evaluates: plan, usage, trialDaysRemaining, dismissals
```

---

## Feature Unlock Triggers

### Activation milestones → unlock messaging

| Milestone | Unlock message | Upsell |
|-----------|----------------|--------|
| First appointment | "Great start! Invite another therapist." | — |
| First note | "Try AI draft on your next note" | Pro |
| 5 appointments | "Connect Google Calendar" | Marketplace |
| 10 patients | "Send portal invites in bulk" | Pro import |
| 3 therapists active | "You've outgrown Starter" | Pro |
| 50 notes | "Download activity report" | Pro reporting |

### Feature discovery checklist (in-app)

**Location:** `/clinic` → "Explore features" panel (collapsible)

| Feature | Discovered when |
|---------|-----------------|
| Messaging | First message sent or Day 5 tooltip |
| AI notes | First appointment completed (Pro) |
| Reporting | Day 14 or 10 appointments |
| Marketplace | Day 5 email + dashboard link |
| Mobile app | Day 7 patient invite flow |

---

## Usage-Based Nudges

### Nudge engine inputs

| Signal | Source |
|--------|--------|
| `weekly_active_users` | Auth logs |
| `appointments_created_7d` | appointment-service |
| `notes_created_7d` | notes-service |
| `ai_generations_7d` | ai-notes-service |
| `integrations_connected` | marketplace-service |
| `onboarding_progress_pct` | tenant-service |

### Nudge rules

| Condition | Nudge | Channel |
|-----------|-------|---------|
| 0 appointments, Day 3 | "Create your first appointment" | In-app + email |
| 0 notes, Day 7, Pro | "Document your first session" | In-app |
| AI quota 80% | "Running low on AI notes" | Banner |
| Calendar not connected, 5+ appts | "Sync Google Calendar" | Tooltip |
| 0 patient portal logins | "Invite patients to the app" | Email admin |
| High usage, Starter, 60d | "You're ready for Pro" | Email + modal |

### SMS nudges (optional, opt-in)

- Trial Day 12 conversion only (`conversion-sequence.md`)
- Payment failure (`churn-prevention.md`)

---

## AI-Powered Recommendations

### Recommendation types

| Type | Example | Surface |
|------|---------|---------|
| **Workflow** | "Schedule follow-up for [Patient] — last visit 14d ago" | Therapist dashboard |
| **Clinical** | "Generate SOAP draft for today's 2pm appointment" | Appointment detail |
| **Operational** | "3 therapists haven't logged in this week" | Clinic Admin |
| **Growth** | "Clinics like yours upgrade to Pro at 4 therapists" | Billing |
| **Integration** | "80% of Pro clinics connect Twilio for SMS" | Marketplace |

### AI recommendation guardrails

| Rule | Requirement |
|------|-------------|
| Clinical recs | Suggestions only; therapist confirms all actions |
| No auto-send to patients | Admin must approve bulk comms |
| Explainability | "Why am I seeing this?" tooltip |
| Opt-out | Clinic Admin can disable operational recs |

### Data inputs for recommendations

```
Tenant plan + usage history + peer benchmarks (anonymized) + onboarding state
  → ai-notes-service or future recommendations-service
  → Ranked suggestions with confidence score
```

### Recommendation metrics

| Metric | Target |
|--------|--------|
| Recommendation click-through | > 15% |
| Recommendation → action completion | > 8% |
| Upgrade attributed to PLG prompt | 20% of Starter→Pro |

---

## PLG + Flywheel Integration

| Loop | PLG contribution |
|------|------------------|
| Referral | Prompt NPS ≥ 9 users with referral link |
| Content | In-app link to relevant help article |
| Community | Webinar invite after activation |
| Partner | Marketplace connect → partner co-marketing email |
| Retention | Usage nudges before churn signals |

---

## PLG Metrics

| Metric | Month 3 | Month 12 |
|--------|---------|----------|
| Self-serve trial % of new trials | 50% | 60% |
| Product-qualified leads (PQL): activation ≥ 70% | 30/mo | 80/mo |
| In-app upgrade prompt CTR | 10% | 15% |
| PLG-sourced expansion MRR | 15% of expansion | 30% |
| Time to activation (median) | 2 days | 1 day |

---

*Companion: `retention-loop.md`, `flywheel-dashboard.md`, `growth/sales-conversion-engine/upgrade-flow.md`*
