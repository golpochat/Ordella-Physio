# Ordella Physio — Mobile App Rollout

**Version:** 1.0  
**Date:** 2026-06-10  
**Status:** Growth Phase — Clinic Onboarding Automation  
**App:** `apps/mobile` (Flutter 3.x)  
**Platforms:** iOS, Android

---

## Rollout Overview

| Audience | Priority | Onboarding day |
|----------|----------|----------------|
| Patients | Primary | Day 7–14 |
| Therapists | Secondary | Day 3–7 |
| Clinic Admin | Optional | Day 14+ |

```
Clinic enables mobile → Admin communicates → User installs → Login → Push notifications → Verify
```

---

## App Store Links (Placeholder)

| Platform | URL |
|----------|-----|
| iOS (App Store) | `https://apps.apple.com/app/ordella-physio/idXXXXXXXX` |
| Android (Google Play) | `https://play.google.com/store/apps/details?id=com.ordella.physio` |
| QR code (in-clinic poster) | Links to landing page with store badges |

*Update with live URLs at app store launch.*

---

## iOS Installation Steps

### For patients and therapists

| # | Step |
|---|------|
| 1 | Open App Store on iPhone/iPad |
| 2 | Search "Ordella Physio" or scan clinic QR code |
| 3 | Tap **Get** / **Install** |
| 4 | Open app after install |
| 5 | Tap **Log in** (not register — account created by clinic) |
| 6 | Enter email and password (same as web portal) |
| 7 | Select clinic/tenant if prompted |
| 8 | Allow push notifications when prompted |
| 9 | (Optional) Enable Face ID / Touch ID if offered |

### Requirements
- iOS 14.0+ (placeholder)
- Internet connection for first login
- Valid patient or staff account

---

## Android Installation Steps

| # | Step |
|---|------|
| 1 | Open Google Play Store |
| 2 | Search "Ordella Physio" or scan QR code |
| 3 | Tap **Install** |
| 4 | Open app |
| 5 | Tap **Log in** |
| 6 | Enter email and password |
| 7 | Select clinic/tenant if prompted |
| 8 | Allow notifications when prompted |
| 9 | Disable battery optimization for app (if notifications delayed) |

### Requirements
- Android 8.0+ (API 26) (placeholder)
- Google Play Services (for FCM push)

---

## Login Instructions

### Credential source

| Role | Account created by | Portal equivalent |
|------|-------------------|-------------------|
| Patient | Clinic Admin invite | `/patient` |
| Therapist | Clinic Admin invite | `/therapist` |
| Staff | Clinic Admin invite | `/staff` |

### Login flow

| # | Step | Notes |
|---|------|-------|
| 1 | Open Ordella Physio app | |
| 2 | Enter registered email | Must match tenant account |
| 3 | Enter password | Set via invite or `/register` |
| 4 | Tenant auto-selected or chosen | Multi-tenant users see picker |
| 5 | Land on role dashboard | Patient / Therapist / Staff |

### Common login issues

| Issue | Resolution |
|-------|------------|
| "Invalid credentials" | Reset password via web portal |
| Wrong clinic shown | Log out → select correct tenant |
| Account not found | Contact clinic admin — invite may not be sent |
| App crashes on login | Update app; contact support L2 |

### API connection
App connects to API Gateway (`API_GATEWAY_URL`). Tenant header `X-Tenant-Id` set after auth.

---

## Push Notification Setup

### Architecture
- **FCM** (Firebase Cloud Messaging) for Android and iOS
- Device token registered on login → `notification-service`
- Events: appointments, messages, billing alerts

### Patient setup

| # | Step | Done |
|---|------|------|
| 1 | Allow notifications on first prompt | [ ] |
| 2 | iOS: Settings → Ordella → Notifications enabled | [ ] |
| 3 | Android: Disable battery saver for Ordella | [ ] |
| 4 | Create test appointment → receive reminder | [ ] |

### Therapist setup

| # | Step | Done |
|---|------|------|
| 1 | Allow notifications | [ ] |
| 2 | Receive new appointment notification | [ ] |
| 3 | Receive new message notification | [ ] |

### Clinic Admin rollout tasks

| # | Task | Done |
|---|------|------|
| 1 | Add app store links to patient welcome email | [ ] |
| 2 | Print QR poster for reception (placeholder) | [ ] |
| 3 | Train front desk on app mention script | [ ] |
| 4 | Verify Twilio/SendGrid + push for reminders | [ ] |

### Front-desk script

> "We've moved to the Ordella app for appointments and messages. You can download it free — search Ordella Physio in your app store, or scan this QR code. Log in with the email we have on file."

---

## Mobile Features by Role

### Patient app

| Feature | Available |
|---------|-----------|
| Dashboard | Yes |
| Appointments (view) | Yes |
| Messages | Yes |
| Notifications | Yes |
| Billing / invoices | Yes |
| Notes (view, if permitted) | Policy-dependent |
| Offline cache (Hive) | Yes |

### Therapist app

| Feature | Available |
|---------|-----------|
| Appointments | Yes |
| Patients (assigned) | Yes |
| Notes (create/view) | Yes |
| Messages | Yes |
| Notifications | Yes |
| AI assistant | Web-preferred; mobile evolving |

---

## Rollout Timeline (onboarding automation)

| Day | Action | Channel |
|-----|--------|---------|
| 3 | Therapist mobile email | Email |
| 7 | Patient app mention in portal invite | Email |
| 10 | "Download the app" onboarding email | Email |
| 14 | Adoption check — CS if < 10% patients | CS task |

### Adoption targets (placeholder)

| Metric | Day 14 | Day 30 |
|--------|--------|--------|
| Patients with app install | 10% | 25% |
| Therapists with app install | 50% | 80% |
| Push delivery success rate | 90% | 95% |

---

## Clinic Rollout Checklist

| # | Item | Done |
|---|------|------|
| 1 | App store links in patient welcome template | [ ] |
| 2 | QR code at reception | [ ] |
| 3 | Staff trained on login support | [ ] |
| 4 | Test patient login on iOS | [ ] |
| 5 | Test patient login on Android | [ ] |
| 6 | Test push notification end-to-end | [ ] |
| 7 | Therapist mobile email sent | [ ] |

---

## Troubleshooting & Escalation

| Issue | Level |
|-------|-------|
| Cannot find app in store | L1 — verify region availability |
| Login fails | L2 Support |
| Push not received | L2 — check FCM token, device settings |
| Crash on launch | L3 Engineering |
| Offline sync conflict | L3 Engineering |

---

*Companion: `therapist-onboarding-flow.md`, `clinic-admin-checklist.md`, `apps/mobile/`*
