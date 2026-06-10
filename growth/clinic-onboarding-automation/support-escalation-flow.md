# Ordella Physio — Support Escalation Flow

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation

---

## Support Tiers Overview

```
Level 1: Self-service → Level 2: Email support → Level 3: Admin/CS escalation → Level 4: Engineering
```

| Level | Channel | Response SLA | Owner |
|-------|---------|--------------|-------|
| L1 | Help center, FAQ, in-app tooltips | Immediate | Customer |
| L2 | support@ordella-physio.com | 24 business hours | Support team |
| L3 | CS manager, onboarding@, enterprise@ | 4 business hours | Customer Success |
| L4 | Engineering on-call | 4–24 hours by severity | Engineering |

---

## Level 1: Self-Service

### Objective
Resolve common onboarding questions without human contact.

### Resources

| Resource | URL / location |
|----------|----------------|
| Help center | `help.ordella-physio.com` (placeholder) |
| Onboarding checklist | `growth/clinic-onboarding-automation/clinic-admin-checklist.md` |
| Clinic Onboarding Kit | `docs/Clinic-Onboarding-Kit.md` |
| FAQ | `/pricing` + help center FAQ |
| In-app onboarding wizard | `/clinic` dashboard |
| Training videos | `training-materials-outline.md` |
| System status | `status.ordella-physio.com` (placeholder) |

### L1 resolution targets

| Topic | Article / video |
|-------|-----------------|
| How to invite therapist | `admin/staff` |
| How to add patient | `admin/patients` |
| CSV import | `patient-import-guide.md` |
| Google Calendar | `integrations/google-calendar` |
| AI notes review | `therapist/ai-notes` |
| Trial and billing | `billing/trial` |

### When to escalate to L2
- Article does not resolve issue
- Error message not in troubleshooting docs
- Billing/payment blocked
- Integration OAuth fails after retry

**Customer action:** Email support@ordella-physio.com with subject prefix `[Onboarding]`

---

## Level 2: Email Support

### Contact
- **Email:** support@ordella-physio.com
- **Hours:** Mon–Fri 09:00–17:00 GMT (placeholder)
- **Languages:** English only

### Required ticket information

| Field | Example |
|-------|---------|
| Clinic name | London Physio Centre |
| Tenant ID | (from Super Admin or billing page) |
| User role | Clinic Admin / Therapist |
| Steps to reproduce | 1, 2, 3 |
| Screenshots | Attached |
| Browser / device | Chrome 120, iPhone 15 |

### L2 ticket categories

| Category | Typical issues | Target resolution |
|----------|----------------|-------------------|
| Onboarding | Wizard stuck, progress not updating | 24h |
| Account | Login, password reset, invite not received | 12h |
| Billing | Payment failed, invoice incorrect | 24h |
| Integrations | OAuth error, API key rejected | 24h |
| Mobile | Login, push notifications | 24h |
| Clinical workflow | Notes not saving, AI error message | 24h |

### L2 response templates

**Acknowledgment (auto-reply):**
> We've received your request ([ticket ID]). Our team responds within 24 business hours. For urgent billing issues, reply with URGENT in the subject.

**Resolution:**
> Hi [Name], [solution steps]. Let us know if this resolves the issue.

### Escalation to L3 triggers

| Condition | Auto-escalate |
|-----------|---------------|
| Pro+ customer, onboarding Day 1–14 | Yes |
| Enterprise tenant | Yes |
| Billing blocked > 4 hours | Yes |
| Stripe customer not provisioned | Yes |
| L2 open > 48 hours | Yes |
| Customer NPS ≤ 6 | Yes |
| Data/security concern | Yes — immediate |

---

## Level 3: Admin / CS Escalation

### Contacts

| Segment | Email | Owner |
|---------|-------|-------|
| Pro onboarding | onboarding@ordella-physio.com | CS Onboarding |
| Enterprise | enterprise@ordella-physio.com | Enterprise CSM |
| CS manager | cs-manager@ordella-physio.com | CS Manager |

### SLA

| Priority | Response | Resolution target |
|----------|----------|-------------------|
| P1 — Clinic cannot operate | 1 hour | 4 hours |
| P2 — Onboarding blocked | 4 hours | 1 business day |
| P3 — Degraded experience | 1 business day | 3 business days |

### L3 responsibilities

| Task | Owner |
|------|-------|
| Live onboarding call (30–60 min) | CS Onboarding |
| Manual Stripe customer fix coordination | CS + Engineering |
| Enterprise SSO setup assistance | Enterprise CSM |
| Migration import (500+ patients) | CS + Migration team |
| Executive escalation comms | CS Manager |
| Refund / billing exception approval | CS Manager + Finance |

### L3 onboarding playbooks

| Scenario | Playbook |
|----------|----------|
| Zero activation Day 7 | 30-min screen-share setup call |
| Integration OAuth loop | CS verifies env URLs; escalate L4 if platform bug |
| Therapist invite not delivered | Resend invite; check spam; manual password reset |
| Trial extension request | CS Manager approval — max 7 days |

### Escalation to L4 triggers

| Condition | Severity |
|-----------|----------|
| Service outage / 5xx errors | P1 |
| Data loss or corruption suspicion | P1 |
| Webhook / Stripe sync failure > 30 min | P2 |
| Marketplace OAuth platform bug | P2 |
| AI service misconfiguration tenant-wide | P2 |
| Mobile app crash reproducible | P2 |
| Security incident | P1 — immediate |

---

## Level 4: Engineering Escalation

### Contact
- **Channel:** Internal PagerDuty / Slack `#eng-oncall` (placeholder)
- **External comms:** CS Manager → customer; status page update

### Severity definitions

| Severity | Definition | Examples |
|----------|------------|----------|
| **SEV1** | Platform down or data breach | API Gateway down, DB unreachable |
| **SEV2** | Major feature broken for many tenants | Billing webhooks failing globally |
| **SEV3** | Single-tenant or workaround exists | One clinic OAuth callback misconfigured |
| **SEV4** | Minor bug, cosmetic | Tooltip typo, report label wrong |

### Engineering SLA

| Severity | Acknowledge | Mitigate | Resolve |
|----------|-------------|----------|---------|
| SEV1 | 15 min | 1 hour | 4 hours |
| SEV2 | 30 min | 4 hours | 1 business day |
| SEV3 | 4 hours | 1 business day | 3 business days |
| SEV4 | Next sprint | — | Backlog |

### L4 ticket requirements

| Field | Required |
|-------|----------|
| Tenant ID | Yes |
| Service name | auth, billing, marketplace, etc. |
| Request ID / correlation ID | From API logs |
| Reproduction steps | Yes |
| L2/L3 ticket reference | Yes |
| Impact count | Tenants affected |

### Post-incident
- CS sends resolution email to affected clinics
- Root cause summary to Enterprise customers (if SEV1/SEV2)
- Help center article updated if recurring issue

---

## Onboarding-Specific Escalation Matrix

| Onboarding blocker | Start level | Escalate to |
|--------------------|-------------|-------------|
| Don't know how to invite staff | L1 | — |
| Invite email not received | L2 | L3 if unresolved 24h |
| Stripe customer missing | L2 | L3 → L4 |
| CSV import errors | L1 → L2 | L4 if parser bug |
| Google Calendar OAuth fail | L1 → L2 | L4 if platform-wide |
| AI notes error | L2 | L4 if API failure |
| Trial expired, data access | L2 | L3 for extension |
| Enterprise SSO setup | L3 | L4 for SAML config bug |
| Mobile push not working | L2 | L4 if FCM token bug |

---

## CRM Integration

| Support event | CRM action |
|---------------|------------|
| L2 ticket opened (onboarding) | Note on deal; health → yellow |
| L3 engaged | CS task; health → red if P1/P2 |
| L4 SEV1/SEV2 | Account flag; exec notification |
| Ticket resolved | Health re-assess; NPS follow-up |

---

## Support Contacts Summary

| Level | Contact | SLA |
|-------|---------|-----|
| L1 | Help center / FAQ | Self-service |
| L2 | support@ordella-physio.com | 24h |
| L3 Pro | onboarding@ordella-physio.com | 4h |
| L3 Enterprise | enterprise@ordella-physio.com | 4h |
| L4 | Engineering on-call | By severity |

---

*Companion: `training-materials-outline.md`, `automated-onboarding-flow.md`, `growth/clinic-acquisition/onboarding-readiness-checklist.md`*
