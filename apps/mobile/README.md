# Ordella Physio — Mobile App (Flutter)

Flutter 3.x mobile client for the Ordella Physio platform. Connects directly to the **API Gateway** (`http://localhost:3049` by default) with `Authorization` and `x-tenant-id` headers.

## Structure

```
lib/
  core/         # Config, theme, routing, constants, errors
  features/     # Auth, dashboards, appointments, notes, billing, messaging, notifications, profile
  common/       # Shared models
  services/     # API client, secure storage, feature services
  widgets/      # Reusable UI components
```

## Requirements

- Flutter 3.x / Dart 3.1+
- API Gateway running (`pnpm --filter @ordella/api-gateway dev`)
- Android emulator, iOS simulator, or physical device

## Setup

```bash
cd apps/mobile
flutter pub get
```

### API Gateway URL

| Target | URL |
|--------|-----|
| Android emulator | `http://10.0.2.2:3049` |
| iOS simulator | `http://localhost:3049` |
| Physical device | `http://<your-machine-ip>:3049` |

Run with dart-defines:

```bash
flutter run --dart-define=API_GATEWAY_URL=http://10.0.2.2:3049 --dart-define=DEFAULT_TENANT_ID=demo-tenant
```

## Features

- **Auth** — Login, registration, tenant selection, secure token storage (`flutter_secure_storage`), auto-login, global route guards (`go_router`)
- **Role dashboards** — Patient, Therapist, Clinic Admin, Staff, Pharmacy, User
- **Appointments** — List + detail
- **Notes** — Read-only for most roles; full CRUD for therapists
- **Billing** — Invoice list + detail
- **Messaging** — Polling-based real-time sync; optional WebSocket bridge via `MESSAGING_WS_URL`
- **Notifications** — Polling + FCM push (register device tokens with notification-service)
- **Profile** — View/update profile, tenant switch, sign out
- **Offline** — Hive cache with graceful fallback UI

## Push Notifications (FCM)

1. Create a Firebase project and add Android (`google-services.json`) / iOS (`GoogleService-Info.plist`) config files.
2. Device tokens are registered via `POST /notifications/device-tokens` on login.
3. notification-service triggers push delivery when notifications are created.

## Build

```bash
# Android
flutter build apk --dart-define=API_GATEWAY_URL=https://api.your-domain.com

# iOS (macOS required)
flutter build ios --dart-define=API_GATEWAY_URL=https://api.your-domain.com
```

## Test

```bash
flutter test
flutter analyze
```
