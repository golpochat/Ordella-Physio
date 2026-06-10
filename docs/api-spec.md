# API Specification — Ordella Physio

Base URL (local): `http://localhost:4000`

All authenticated endpoints require:

```
Authorization: Bearer <access_token>
```

Responses follow the envelope:

```json
{
  "data": { ... },
  "meta": { ... }
}
```

Errors:

```json
{
  "code": "ERROR_CODE",
  "message": "Human-readable message",
  "details": { }
}
```

---

## Auth Service — `/api/auth`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Authenticate with email/password |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Current user profile |
| POST | `/api/auth/logout` | Revoke refresh token |

### POST /api/auth/login

**Request:**
```json
{
  "email": "user@clinic.com",
  "password": "secret",
  "tenantId": "optional-tenant-id"
}
```

**Response:**
```json
{
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "expiresIn": 900,
    "user": {
      "id": "uuid",
      "email": "user@clinic.com",
      "roles": ["physiotherapist"],
      "tenantId": "uuid"
    }
  }
}
```

---

## Tenant Service — `/api/tenants`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/tenants` | List tenants (super admin) |
| POST | `/api/tenants` | Create tenant |
| GET | `/api/tenants/:id` | Get tenant |
| PATCH | `/api/tenants/:id` | Update tenant |
| GET | `/api/tenants/:id/locations` | List locations |
| POST | `/api/tenants/:id/locations` | Add location |
| GET | `/api/tenants/:id/staff` | List staff |
| POST | `/api/tenants/:id/staff/invite` | Invite staff member |

---

## Patient Service — `/api/patients`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/patients` | List patients (paginated) |
| POST | `/api/patients` | Create patient |
| GET | `/api/patients/:id` | Get patient |
| PATCH | `/api/patients/:id` | Update patient |
| DELETE | `/api/patients/:id` | Archive patient |

---

## Appointment Service — `/api/appointments`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/appointments` | List appointments (filter by date, provider) |
| POST | `/api/appointments` | Create appointment |
| GET | `/api/appointments/:id` | Get appointment |
| PATCH | `/api/appointments/:id` | Update appointment |
| POST | `/api/appointments/:id/cancel` | Cancel appointment |

---

## Notes Service — `/api/notes`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/notes` | List notes (filter by patient) |
| POST | `/api/notes` | Create SOAP note |
| GET | `/api/notes/:id` | Get note |
| PATCH | `/api/notes/:id` | Update draft note |
| POST | `/api/notes/:id/sign` | Sign and lock note |
| POST | `/api/notes/:id/attachments` | Upload attachment |

---

## Billing Service — `/api/billing`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/billing/invoices` | List invoices |
| POST | `/api/billing/invoices` | Create invoice |
| GET | `/api/billing/invoices/:id` | Get invoice with line items |
| PATCH | `/api/billing/invoices/:id` | Update draft invoice |

---

## Payment Service — `/api/payments`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/payments/intents` | Create Stripe PaymentIntent |
| POST | `/api/payments/webhooks/stripe` | Stripe webhook handler |
| GET | `/api/payments/:id` | Get payment status |

---

## Communication Service — `/api/communications`

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/communications/reminders` | Schedule reminder |
| GET | `/api/communications/reminders` | List scheduled reminders |
| POST | `/api/communications/send` | Send immediate message |

---

## Reporting Service — `/api/reports`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/reports/dashboard` | Dashboard summary metrics |
| GET | `/api/reports/appointments` | Appointment analytics |
| GET | `/api/reports/revenue` | Revenue analytics |
| GET | `/api/reports/export` | Export report (CSV) |

---

## Health Checks

Every service exposes:

```
GET /health
```

Response: `{ "status": "ok", "service": "<service-name>" }`
