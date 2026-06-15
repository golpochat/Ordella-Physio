# Security Architecture

## Ordella Clinic Management System

This document describes the security architecture of the Ordella platform: authentication, authorization, tenant isolation, audit logging, hardening controls, and production infrastructure expectations. It reflects the **current implementation** across the monolithic clinic backend (`backend/`), the Next.js BFF (`apps/frontend-web`), the microservices stack (`services/*`), and shared packages (`packages/security`).

Ordella is a **multi-tenant, internal-use** clinic management system. Patients do not log in; all access is by clinic personnel (Admin, Staff, Therapist) or platform operators (Super Admin).

---

## Architecture Overview

The platform uses a **defence-in-depth** model with security enforced at multiple layers:

```
┌─────────────────────────────────────────────────────────────────┐
│  Browser                                                         │
│  • Signed session cookie (edge RBAC)                             │
│  • Access token in memory only                                   │
│  • HttpOnly refresh cookie (BFF)                                 │
└───────────────────────────┬─────────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│  Next.js Frontend (apps/frontend-web)                            │
│  • Edge middleware: portal isolation, rate limits, nonce CSP       │
│  • BFF: /api/auth/login|refresh|logout|session                   │
│  • Client: permission gates, session validation                  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
         ┌──────────────────┴──────────────────┐
         │                                     │
┌────────▼────────────┐            ┌───────────▼──────────────┐
│ Clinic Backend      │            │ API Gateway + Services   │
│ (backend/)          │            │ (Docker microservices)   │
│ localhost:4000      │            │ localhost:3049           │
└────────┬────────────┘            └───────────┬──────────────┘
         │                                     │
         └──────────────────┬──────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────────┐
│  PostgreSQL (tenant-scoped rows)  •  Redis (rate limits, brute)  │
└─────────────────────────────────────────────────────────────────┘
```

**Dual auth stacks:** Local development may use either the **clinic monolith** (`USE_CLINIC_BACKEND=true`) or the **auth microservice** behind the API gateway. The frontend BFF always stores refresh tokens in HttpOnly cookies regardless of which backend issues them.

---

## 1. Authentication Security

### 1.1 HttpOnly Refresh Cookies

Refresh tokens are **never stored in JavaScript-accessible storage** (`localStorage`, `sessionStorage`, or in-memory client state for persistence).

**BFF implementation** (`apps/frontend-web/app/api/auth/login/route.ts`):

- On successful login, the BFF proxies to the upstream auth endpoint.
- Returns the **access token in the JSON response body** (short-lived, held in memory client-side).
- Sets `ordella-refresh` as an **HttpOnly, SameSite=Strict** cookie.
- Sets a signed `ordella-session` cookie for edge middleware RBAC.

**Cookie options** (`apps/frontend-web/lib/auth/cookie-names.ts`):

```typescript
export function getSecureCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge,
  };
}
```

**Client storage policy** (`apps/frontend-web/lib/utils/authStorage.ts`):

- `getAccessToken()` reads from an in-memory variable only.
- `getRefreshToken()` always returns `null` — refresh is cookie-only.
- Legacy `localStorage` refresh keys are actively purged on logout.

**Cookie names:**

| Cookie | Purpose | Max age |
|--------|---------|---------|
| `ordella-refresh` | Refresh token (HttpOnly) | 7 days |
| `ordella-session` | HMAC-signed user/role/tenant for middleware | 8 hours |

**Environment variables:**

| Variable | Location | Purpose |
|----------|----------|---------|
| `SESSION_COOKIE_SECRET` | `apps/frontend-web` | HMAC signing key for session cookie (min 32 chars) |
| `NEXTAUTH_SECRET` | `apps/frontend-web` | NextAuth session signing |

---

### 1.2 Rotating Refresh Tokens

Refresh token rotation is implemented on every successful refresh. A used refresh token is revoked and cannot be replayed.

**Clinic backend flow** (`backend/src/modules/auth/auth.service.ts` → `refresh()`):

1. Verify refresh JWT signature and `tv` (token version) claim.
2. Look up hashed refresh token in `refresh_tokens` table.
3. Revoke the matched row (`revokedAt` timestamp).
4. Revoke the prior access token `jti` via `revokeAccessToken()`.
5. Issue a new access + refresh pair via `buildAuthResponse()`.

**BFF refresh route** (`apps/frontend-web/app/api/auth/refresh/route.ts`):

- Reads refresh token from `ordella-refresh` cookie.
- Proxies to upstream `POST /api/auth/refresh`.
- Rotates the HttpOnly cookie on success.
- Clears both session and refresh cookies on 401.

**Auth microservice** (`services/auth-service/src/services/token.service.ts`):

- Maintains a `replacedByTokenId` chain for full rotation auditability.
- Stores `ipAddress`, `deviceInfo`, and `sessionId` on token records.

**JWT claims** (`backend/src/utils/jwt.ts`):

```typescript
// Access token payload
{ sub, tenantId, email, roles, permissions, jti, tv }

// Refresh token payload
{ sub, tenantId, type: "refresh", jti, tv }
```

| Claim | Purpose |
|-------|---------|
| `jti` | Unique token ID — used for access-token revocation |
| `tv` | Token version — invalidated on password change, logout-all, or reuse detection |

**Token lifetimes** (configurable via env):

| Token | Default | Env var |
|-------|---------|---------|
| Access | 15 minutes | `JWT_EXPIRES_IN` |
| Refresh | 7 days | `JWT_REFRESH_EXPIRES_IN` |

---

### 1.3 Token Reuse Detection

When a revoked refresh token is presented again, the system treats this as a potential compromise.

**Auth microservice** — **fully implemented:**

- `handleReuseDetected()` in `services/auth-service/src/services/token.service.ts`
- Increments `tokenVersion` for the user
- Revokes all outstanding refresh tokens
- Writes audit event `TOKEN_REUSE_DETECTED`
- Returns error code `TOKEN_REUSE_DETECTED`

**Frontend handling** (`apps/frontend-web/lib/session-manager.ts`):

```typescript
function isTokenReuseError(error: unknown): boolean {
  return getApiErrorCode(error.payload) === "TOKEN_REUSE_DETECTED";
}
// On detection → clearAuthSession() + redirectToLogin("token-reuse-detected")
```

User-facing message (`apps/frontend-web/lib/auth-error-messages.ts`):

> "Your session was compromised. Please log in again."

**Clinic backend** — **partial:**

- Reused refresh tokens return a generic `UnauthorizedError("Invalid refresh token")`.
- Explicit `TOKEN_REUSE_DETECTED` code and automatic token-family revocation are **not yet implemented** in `backend/`.
- Manual overlap verification via `JWT_SECRET_PREVIOUS` / `JWT_REFRESH_SECRET_PREVIOUS` supports **scheduled key rotation** without downtime.

---

### 1.4 Session Binding

Sessions are bound to identity and tenant context at multiple layers:

| Layer | Binding mechanism |
|-------|-------------------|
| JWT access token | `sub` (user ID), `tenantId`, `tv` (version) |
| Refresh token | `sub`, `tenantId`, `tv`; stored as bcrypt hash in DB |
| Signed session cookie | `user.id`, `user.role`, `user.tenantId`, `user.roles` |
| Header validation | `x-tenant-id` header must match JWT `tenantId` or request is rejected |

**Middleware enforcement** (`backend/src/middleware/tenant.middleware.ts`):

```typescript
if (headerTenantId && headerTenantId !== payload.tenantId) {
  next(new ForbiddenError("Tenant mismatch"));
  return;
}
```

**Session cookie signing** (`apps/frontend-web/lib/auth/session-signing.ts`):

- HMAC-SHA256 over base64url-encoded JSON payload.
- Verified on every edge middleware request via `verifySignedSessionCookie()`.
- Invalid or tampered cookies are rejected — user is redirected to `/login`.

---

### 1.5 Device / IP Soft Binding

**Auth microservice:**

- Records `ipAddress` and `deviceInfo` on each refresh token row.
- Enables forensic analysis of session origin.

**Clinic backend:**

- `login_attempts` table records IP and user-agent for every login attempt.
- Brute-force counters are keyed by `IP:email` combination.
- Refresh token model does **not** currently store IP/device (soft binding at refresh layer is auth-service only).

**Brute-force key** (`backend/src/modules/security/brute-force.service.ts`):

```typescript
function bruteForceKey(ipAddress: string | undefined, email: string): string {
  return `${ipAddress ?? "unknown"}:${email.toLowerCase()}`;
}
```

---

### 1.6 Forced Re-authentication on Compromise

The following events force the user to sign in again:

| Event | Response |
|-------|----------|
| `TOKEN_REUSE_DETECTED` | Clear cookies + redirect to `/login?reason=token-reuse-detected` |
| Refresh token expired or revoked | Clear cookies + redirect to `/login?reason=session-expired` |
| Access token version mismatch (`tv`) | 401 Unauthorized |
| `revokeAllUserTokens()` (logout all devices) | All `tv` values invalidated |
| Account locked (`lockedUntil`) | 429 with `Retry-After` header |
| Missing tenant in session | Redirect to `/login?reason=missing-tenant` |

**Token revocation service** (`backend/src/modules/security/token-revocation.service.ts`):

- `isAccessTokenRevoked(jti)` — checked during `verifyAccessToken()`
- `revokeAccessToken({ jti, userId, tenantId, expiresAt })`
- `revokeAllUserTokens(userId)` — bumps `tokenVersion`, revokes all refresh rows
- `purgeExpiredRevokedTokens()` — housekeeping cron

---

## 2. Authorization Security

### 2.1 RBAC Roles

Ordella uses **Role-Based Access Control** with tenant-scoped roles stored in the database.

**Clinic backend roles** (`backend/src/modules/rbac/roles.ts`):

| Role | Portal | Description |
|------|--------|-------------|
| `ADMIN` | `/clinic` | Clinic administrator — full clinic operations |
| `STAFF` | `/staff` | Front desk / reception |
| `THERAPIST` | `/therapist` | Clinician — own schedule, patients, notes |
| `PATIENT` | `/patient` | Sample patient portal (limited) |

**Platform role** (microservices / auth-service):

| Role | Portal | Description |
|------|--------|-------------|
| `SYSTEM` | `/super-admin` | Platform super administrator |

**Role assignment:**

- Roles are stored per-tenant in the `roles` and `user_roles` tables.
- `ensureDefaultRoles(tenantId)` seeds ADMIN, STAFF, THERAPIST on tenant creation.
- `getUserRolesAndPermissions(userId, tenantId)` resolves effective permissions at login.

**Frontend role mapping** (`apps/frontend-web/lib/auth/roleRedirect.ts`):

- Auth-service `ADMIN` maps to portal role `CLINIC_ADMIN`.
- `getPortalForRole()` and `getPortalForRoles()` resolve the correct dashboard URL.

---

### 2.2 Permission-Level Enforcement

Permissions use **dot-notation** canonical names with legacy colon-notation aliases for backward compatibility.

**Canonical permissions** (`backend/src/middleware/permissions.ts`):

```typescript
export const Permission = {
  PATIENT_VIEW:       "patient.view",
  PATIENT_MANAGE:     "patient.manage",
  PATIENT_EDIT:       "patient.edit",
  PATIENT_ATTACHMENTS:"patient.attachments",
  APPOINTMENT_MANAGE: "appointment.manage",
  NOTES_READ:         "notes.read",
  NOTES_WRITE:        "notes.write",
  BILLING_MANAGE:     "billing.manage",
  REPORTING_VIEW:     "reporting.view",
  REPORTING_READ:     "reporting.read",
  ROLE_MANAGE:        "role.manage",
  USER_MANAGE:        "user.manage",
  SETTINGS_MANAGE:    "settings.manage",
  TENANT_MANAGE:      "tenant.manage",
  ORGANIZATION_MANAGE:"organization.manage",
  TERMINAL_MANAGE:    "terminal.manage",
} as const;
```

**Legacy alias example:**

| Canonical | Legacy grants |
|-----------|---------------|
| `patient.view` | `patients:read` |
| `notes.write` | `notes:write` |
| `billing.manage` | `billing:write`, `billing:read` |
| `role.manage` | `rbac:write` |

`expandCanonicalPermissions()` normalizes both notations into JWT claims at login.

**Shared permission catalog** (`packages/security/src/rbac/permissions.ts`):

- 70+ permissions for microservices including AI, files, audit export, notifications.
- Used by NestJS guards in `packages/security/src/guards/permission.guard.ts`.

---

### 2.3 UI-Level Permission Hiding

The frontend hides navigation items and page actions the user cannot perform. UI hiding is a **convenience layer only** — all enforcement happens on the API.

**Navigation filtering** (`apps/frontend-web/lib/permissions.ts`):

- `can(user, permission)` — checks user permissions or infers from role.
- `canAll(user, permissions)` — requires all listed permissions.
- `filterNavItems(menu, user)` — removes nav entries the user cannot access.

**Declarative gates** (`apps/frontend-web/lib/auth/withPermission.tsx`):

```tsx
<WithPermission permission={Permission.PATIENT_VIEW}>
  <PatientList />
</WithPermission>

<WithAllPermissions permissions={[Permission.BILLING_MANAGE, Permission.PATIENT_VIEW]}>
  <BillingPanel />
</WithAllPermissions>
```

Unauthorized users are redirected to `/forbidden`.

**Nav config** (`apps/frontend-web/components/layout/nav-config.ts`):

- Each menu item may declare `permission`, `anyOf`, or role requirements.
- Icons and labels are filtered before render in `AppLayout`.

---

### 2.4 API-Level Permission Enforcement

Every protected route applies permission middleware **before** the controller handler.

**Middleware functions** (`backend/src/middleware/permissions.ts`):

| Function | Behaviour |
|----------|-----------|
| `requirePermission(p)` | User must have permission `p` |
| `requireAny([p1, p2])` | User must have at least one |
| `requireAll([p1, p2])` | User must have all |
| `composePolicy(...handlers)` | Chain multiple guards (e.g. deny patient role + require permission) |

**On denial:**

- Returns `403 Forbidden` with message `Forbidden: Missing permission <name>`.
- Logs `security.permission_denied` via `logSecurityEvent()`.

**Centralized policies** (`backend/src/modules/rbac/policies.ts`):

```typescript
export const policies = {
  patientsRead:    composePolicy(denyPatient, requirePermission(Permission.PATIENT_VIEW)),
  patientsWrite: composePolicy(denyPatient, requirePermission(Permission.PATIENT_MANAGE)),
  notesWrite:    composePolicy(denyPatient, requirePermission(Permission.NOTES_WRITE)),
  billingWrite:  composePolicy(denyPatient, requirePermission(Permission.BILLING_MANAGE)),
  auditRead:     composePolicy(requirePermission(Permission.REPORTING_READ)),
  // ...
};
```

**Route application example** (`backend/src/modules/patients/patients.routes.ts`):

```typescript
patientsRouter.get("/",  policies.patientsRead,  listPatients);
patientsRouter.post("/", policies.patientsWrite, createPatient);
patientsRouter.put("/:id", policies.patientsEdit, updatePatient);
```

**Microservice guards** (`packages/security/src/guards/`):

- `PermissionGuard` + `@RequirePermissions()` decorator for NestJS services.
- `RoleGuard`, `TenantGuard` for role and tenant enforcement.

---

## 3. Route Guards (Frontend)

### 3.1 Portal Isolation

Each role operates within a **dedicated URL namespace**. Cross-portal navigation is blocked at the edge.

**Portal namespaces** (`apps/frontend-web/lib/routes.ts`):

| Role | Namespace | Example routes |
|------|-----------|----------------|
| Admin / Clinic Admin | `/clinic` | `/clinic/patients`, `/clinic/billing` |
| Staff | `/staff` | `/staff/appointments`, `/staff/billing` |
| Therapist | `/therapist` | `/therapist/today`, `/therapist/notes` |
| Super Admin | `/super-admin` | `/super-admin/tenants` |

`canAccessPortalNamespace(pathname, userRoles)` ensures users only access routes within their portal.

---

### 3.2 Direct URL Protection

**Edge middleware** (`apps/frontend-web/middleware.ts`):

Runs on every page request (excluding static assets). Flow:

```
Request → isGuardedPortalPath?
  → No  → apply security headers, continue
  → Yes → getSession() from signed cookie
    → No session?        → redirect /login
    → Missing tenant?    → redirect /login?reason=missing-tenant
    → Wrong portal?      → redirect to role home (/clinic, /staff, etc.)
    → Allowed          → apply nonce CSP, continue
```

**Guarded path prefixes:**

```
/clinic, /staff, /therapist, /super-admin,
/patient, /pharmacy, /user, /admin, /settings, /billing
```

**Portal home resolution** (`apps/frontend-web/lib/auth/session-routing.ts`):

```typescript
// SYSTEM     → /super-admin
// ADMIN/CLINIC_ADMIN/OWNER → /clinic
// STAFF      → /staff
// THERAPIST  → /therapist
```

**Client-side enforcement** (`apps/frontend-web/components/layout/AppLayout.tsx`):

- Redirects unauthenticated users to `/login`.
- Validates `navRole` matches `portalId` prop.

**System route enforcer** (`apps/frontend-web/components/navigation/system-route-enforcer.tsx`):

- SYSTEM users attempting non-`/super-admin` paths are redirected to `/super-admin`.

---

### 3.3 Session Validation

**On sign-in** (`apps/frontend-web/components/auth/auth-bootstrap.tsx`):

- `validateStoredSession()` runs once per authentication state change (not on every navigation).
- Calls `GET /api/auth/me` to verify the access token.
- Proactively refreshes tokens nearing expiry (`ACCESS_TOKEN_REFRESH_BUFFER_MS` = 2 minutes).
- Background refresh interval: every 30 seconds while authenticated.

**Session sync on navigation:**

- `syncSessionCookieFromUser()` keeps the signed middleware cookie aligned with client state.
- `syncTenantFromSession()` ensures tenant store matches JWT claims.

**API client retry** (`apps/frontend-web/lib/api-client.ts`):

- On 401, attempts `attemptTokenRefresh()` once.
- Retries the original request with the new access token.
- Gateway-only services (messaging, AI) do not trigger global logout in clinic-backend mode.

**Public paths** (no session required):

```
/, /login, /signup, /forgot-password, /pricing, /features,
/about, /contact, /forbidden, /mfa/verify, ...
```

---

## 4. API Security

### 4.1 Permission Middleware

All tenant-scoped API routes mount the middleware chain defined in `backend/src/routes/index.ts`:

```
authMiddleware → requireAuth → requireTenant → [policies.*] → controller
```

**Global middleware stack** (`backend/src/app.ts`):

```
enforceHttps → correlationId → helmet(CSP) → cors → cookieParser
→ sanitizeInput → globalRateLimiter → csrfProtection
→ tenantMiddleware → resolveTenantHeaderMiddleware → authMiddleware
```

---

### 4.2 `requireTenant`

Tenant context is **never accepted from the client**. It is derived exclusively from the authenticated JWT.

**Implementation** (`backend/src/middleware/tenant.ts`):

```typescript
export function requireTenant(req, res, next) {
  // 1. Must have authenticated user with tenantId
  // 2. Reject client-supplied tenantId in:
  //    - x-tenant-id header
  //    - request body
  //    - query string
  //    - URL params
  // 3. Bind req.tenantId = req.user.tenantId
}
```

Violations return:

| Condition | Status | Error |
|-----------|--------|-------|
| No user tenant | 401 | `Unauthorized: Missing tenant context` |
| Client supplied tenantId | 400 | `Client-supplied tenantId is not allowed` |
| Header/JWT mismatch | 403 | `Tenant mismatch` |

**Clinic backend proxy** (`apps/frontend-web/lib/clinic-backend-proxy.ts`):

- Strips `x-tenant-id` header when proxying to clinic backend.
- Tenant is resolved from the Bearer JWT only.

---

### 4.3 Tenant-Bound Database Queries

All data access includes `tenantId` in Prisma `where` clauses.

**Repository pattern** (`backend/src/modules/staff/staff.repository.ts`):

```typescript
function buildListWhere(tenantId: string, filters: StaffFilters) {
  return { tenantId, ...filters };
}
```

**Service pattern** (`backend/src/modules/notes/notes.service.ts`):

```typescript
const note = await prisma.note.findFirst({
  where: { id: noteId, tenantId },
});
```

**Runtime assertion** (`backend/src/modules/security/tenant-scope.ts`):

```typescript
assertTenantScopedQuery(model, where);  // throws if tenantId missing
withTenantWhere(tenantId, where);       // injects tenantId into where clause
```

Scoped models include: `Patient`, `Appointment`, `Staff`, `Therapist`, `Note`, `Invoice`, `AuditLog`, and others.

---

### 4.4 Cross-Tenant Access Prevention

| Control | Mechanism |
|---------|-----------|
| JWT binding | `tenantId` claim set at login, verified on every request |
| Header rejection | Client cannot override tenant via `x-tenant-id` |
| Query scoping | All Prisma queries include `tenantId` |
| Mismatch detection | `req.tenantId !== user.tenantId` → 403 Forbidden |
| Unique constraints | `@@unique([tenantId, email])` on users |
| BFF proxy | Tenant header stripped; JWT is sole source of truth |

A user authenticated for Tenant A **cannot** read, update, or delete resources belonging to Tenant B, even with a crafted request body or URL.

---

## 5. Tenant Isolation

### 5.1 Tenant ID from Session Only

The tenant identifier flows through the system as follows:

```
Login → resolveTenant(slug|id) → JWT.tenantId (UUID)
     → req.tenantId (middleware)
     → Prisma queries (WHERE tenantId = ...)
     → Audit logs (tenantId column)
```

The frontend may display a tenant **slug** (e.g. `demo-clinic`) on the login form, but the backend resolves it to an internal UUID before issuing tokens.

---

### 5.2 No Client-Supplied `tenantId`

The following are **explicitly rejected** on authenticated, tenant-scoped routes:

- `x-tenant-id` request header
- `tenantId` in JSON body
- `tenantId` query parameter
- `tenantId` URL path parameter

Standalone guard for pre-auth routes:

```typescript
rejectClientSuppliedTenantId(req, res, next);
```

---

### 5.3 Row-Level Isolation

PostgreSQL enforces tenant boundaries at the application layer:

- Every tenant-scoped table includes a `tenantId` foreign key.
- Composite unique indexes prevent cross-tenant collisions (e.g. email uniqueness is per-tenant).
- List endpoints always filter by `req.tenantId`.
- Detail endpoints use `{ id, tenantId }` compound lookups.

---

### 5.4 Tenant Mismatch Handling

| Scenario | Response |
|----------|----------|
| JWT `tenantId` ≠ `x-tenant-id` header | 403 `Tenant mismatch` |
| User requests resource in another tenant | 404 (not found — no information leak) |
| Session cookie missing `tenantId` for non-SYSTEM role | Redirect to `/login?reason=missing-tenant` |
| Tenant suspended | 403 `TENANT_SUSPENDED` → UI banner |

---

## 6. Audit Logging

### 6.1 Sensitive Action Logging

All mutating operations on sensitive entities are logged to the `audit_logs` table.

**Audit service** (`backend/src/modules/utilities/audit.service.ts`):

```typescript
writeAuditLog({
  tenantId,
  userId,
  action,      // e.g. "patient.created", "auth.login"
  entity,      // e.g. "Patient", "User"
  entityId,
  ipAddress,
  userAgent,
  metadata,    // JSON — before/after snapshots, context
});
```

**Automatic mutation logging** (`backend/src/middleware/audit.ts`):

- `withAudit(action, entity)` wraps route handlers.
- Logs successful creates, updates, and deletes.
- Strips passwords, tokens, and secrets from metadata before persistence.

---

### 6.2 Captured Context

Every audit entry includes:

| Field | Source |
|-------|--------|
| `tenantId` | `req.tenantId` |
| `userId` | `req.user.id` |
| `action` | Dot-notation action string |
| `entity` / `entityId` | Target resource |
| `ipAddress` | `req.ip` (respects `TRUST_PROXY`) |
| `userAgent` | `User-Agent` header |
| `metadata` | Request context, field changes |
| `createdAt` | Server timestamp |

Helper: `auditContextFromRequest(req)` extracts standard context from any authenticated request.

---

### 6.3 Audited Domains

| Domain | Example actions |
|--------|-------------------|
| **Authentication** | `auth.login`, `auth.logout`, `auth.password_reset` |
| **Patients** | `patient.created`, `patient.updated`, `patient.deleted` |
| **Appointments** | `appointment.created`, `appointment.updated`, `appointment.cancelled` |
| **Notes** | `note.created`, `note.updated` |
| **Billing** | `invoice.created`, `payment.recorded` |
| **Users & roles** | `user.created`, `role.assigned`, `role.revoked` |
| **Settings** | `settings.updated`, `tenant.updated` |

**Query endpoint:** `GET /api/audit-logs` — requires `policies.auditRead` (`reporting.read` permission).

**Frontend UI:**

- `apps/frontend-web/components/audit/EntityAuditLogPanel.tsx`
- Clinic portal: `/clinic/audit-logs`
- Per-entity audit tabs on invoices, patients, etc.

---

### 6.4 Security Events

Security-specific events are logged via `logSecurityEvent()` (`backend/src/modules/security/security-events.service.ts`):

| Event type | Trigger |
|------------|---------|
| `rate_limit` | Global or auth rate limit exceeded |
| `brute_force` | IP/email login counter exceeded |
| `csrf_failure` | Invalid or missing CSRF token |
| `invalid_token` | Malformed, expired, or wrong-version JWT |
| `permission_denied` | RBAC check failed |
| `account_locked` | Login attempt on locked account |
| `virus_scan` | ClamAV detection (when wired) |

**Auth microservice additional events:**

- `TOKEN_REUSE_DETECTED` — refresh token replay
- `LOGOUT` — explicit session termination

Security events are:

1. Emitted to structured console logs (`level: "security"`).
2. Persisted asynchronously to `audit_logs` with `action: security.<type>`.

**Login attempt tracking** (`backend/src/modules/security/brute-force.service.ts`):

- Every login attempt (success or failure) is recorded in `login_attempts`.
- Fields: `email`, `ipAddress`, `tenantId`, `success`, `reason`, `userId`.

---

## 7. Security Hardening

### 7.1 Rate Limiting

**Clinic backend — global** (`backend/src/middleware/rate-limit.ts`):

- Key: `rate:global:{ip}:{userId}`
- Default: 120 requests per 60 seconds per IP/user combination.
- Redis-backed with in-memory fallback.

**Clinic backend — auth endpoints:**

- `authRateLimiter` on `/api/auth/login`, `/api/auth/refresh`, `/api/auth/forgot-password`, `/api/auth/register`.
- Default: 10 requests per window (`AUTH_RATE_LIMIT_MAX`).

**Frontend edge** (`apps/frontend-web/middleware.ts`):

- Rate limits all `/api/*` routes by client IP.
- **Exempt:** `/api/auth/*`, `/api/next-auth/*`, `/api/health`, `/api/csrf`.

**Brute-force lockout** (`backend/src/modules/security/brute-force.service.ts`):

| Control | Default | Env var |
|---------|---------|---------|
| Max attempts per IP+email | 5 | `LOGIN_MAX_ATTEMPTS` |
| Base lockout duration | 5 min | `LOGIN_LOCKOUT_BASE_MS` |
| Max lockout duration | 60 min | `LOGIN_LOCKOUT_MAX_MS` |
| Lockout growth | Exponential (2^n) | — |

Account-level lock: `user.lockedUntil` timestamp set after repeated failures.

**Environment variables:**

```
RATE_LIMIT_MAX=120
RATE_LIMIT_WINDOW_MS=60000
AUTH_RATE_LIMIT_MAX=10
REDIS_URL=redis://localhost:6379
REDIS_KEY_PREFIX=clinic-backend:
UPSTASH_REDIS_REST_URL=        # frontend multi-instance
UPSTASH_REDIS_REST_TOKEN=
DISABLE_API_RATE_LIMIT=false   # set true for local dev only
```

**Regression tests:** `backend/test/security.spec.ts`, `backend/test/rate-limit.spec.ts`

---

### 7.2 Brute-Force Protection

Multi-layered login protection:

1. **IP + email counter** (Redis) — fast sliding window.
2. **Per-user `failedLoginCount`** (PostgreSQL) — persistent account lockout.
3. **Exponential backoff** — lockout duration doubles with each threshold breach.
4. **Auth endpoint rate limiter** — caps total auth requests per IP.
5. **Security event logging** — all lockout events audited.

Failed login responses are intentionally generic:

> `"Invalid credentials"` — does not reveal whether the email or password was wrong.

---

### 7.3 Secure HTTP Headers

**Express API** (`backend/src/middleware/security-headers.ts`):

- Helmet middleware with Content Security Policy.
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (when `FORCE_HTTPS=true`)

**Next.js frontend** (`apps/frontend-web/lib/security/csp.ts`):

- Nonce-based CSP in production (per-request random nonce).
- `script-src 'self' 'nonce-<nonce>'` — blocks inline script injection.
- `connect-src` restricted to configured backend/gateway URLs.
- CSP violation reporting via `CSP_REPORT_URI` env var.
- Nonce skipped in development for HMR compatibility.

**HTTPS enforcement** (`backend/src/middleware/enforce-https.ts`):

- Redirects HTTP → HTTPS when `FORCE_HTTPS=true`.
- Respects `TRUST_PROXY` for load balancer deployments.

---

### 7.4 CSRF Protection

**Double-submit cookie pattern** (`backend/src/middleware/csrf.ts`):

1. Server issues CSRF token via `GET /api/auth/csrf`.
2. Token stored in a cookie and returned in the response body.
3. Mutating requests must include `x-csrf-token` header matching the cookie.

**Exemptions:**

- Safe methods (`GET`, `HEAD`, `OPTIONS`)
- `/api/auth/login`, `/api/auth/refresh`, `/api/auth/csrf`
- `/api/health`
- Requests with `Authorization: Bearer` header (API token auth)

**Frontend integration:**

- `apps/frontend-web/lib/auth/csrf.ts` — `ensureCsrfToken()` with in-memory cache.
- `apps/frontend-web/lib/api-client.ts` — attaches CSRF header on non-GET requests without Bearer token.
- `apps/frontend-web/app/api/contact/route.ts` — validates CSRF on public contact form.

**Environment:** `CSRF_SECRET` (required in production, min 32 characters).

---

### 7.5 Input Validation and Sanitization

**Schema validation** (`backend/src/middleware/validate.middleware.ts`):

- Zod schemas per route (login, register, patient create, etc.).
- Rejects malformed input before it reaches controllers.
- Returns `400 Bad Request` with field-level error details.

**Input sanitization** (`backend/src/middleware/sanitize-input.ts`):

- Recursively sanitizes `req.body`, `req.query`, and `req.params`.
- Strips HTML tags and dangerous characters from string values.
- Applied globally before route handlers.

**Shared validation** (`packages/validation`):

- `EMAIL_REGEX`, `PHONE_REGEX`, `CUID_REGEX` for consistent format checks.
- Zod base schemas for IDs, emails, and phone numbers.

---

### 7.6 Output Escaping

- React's JSX automatically escapes rendered content (XSS prevention).
- API responses return JSON (no server-side HTML rendering for clinic data).
- PDF generation uses templated output with escaped user fields.
- Audit metadata serializes through Prisma `Json` type (no raw HTML injection).

---

### 7.7 Token Hardening

| Control | Implementation |
|---------|----------------|
| Short access TTL | 15 minutes default |
| Refresh rotation | Old token revoked on every refresh |
| Token versioning (`tv`) | Invalidates all tokens on compromise |
| Access revocation (`jti`) | Per-token blocklist in DB/Redis |
| Separate secrets | `JWT_SECRET` ≠ `JWT_REFRESH_SECRET` |
| Key rotation overlap | `JWT_SECRET_PREVIOUS` for zero-downtime rotation |
| Memory-only access token | Never persisted client-side |
| HttpOnly refresh | Not accessible to JavaScript |
| SameSite=Strict cookies | CSRF mitigation for cookie-based auth |

**Automated key rotation** — deferred. Manual rotation via `*_PREVIOUS` env vars is supported. Runbook/cron integration is on the backlog.

---

### 7.8 File Upload Security

**Validation pipeline** (`backend/src/modules/security/file-upload.ts`):

```typescript
validateUpload(file)        // MIME, extension, size (20 MB max), path traversal
validateAndScanUpload(file) // validate + ClamAV virus scan
stripExifFromImageBuffer()  // Remove EXIF metadata from images
```

**Virus scanning** (`backend/src/modules/security/virus-scan.service.ts`):

- ClamAV INSTREAM protocol over TCP.
- Configurable host, port, timeout.
- `CLAMAV_REQUIRED=true` fails closed if scanner is unreachable.

**Status:** Validation and scan services are **built and unit-tested** but **not yet wired** to production upload handlers. Enable when file-upload endpoints ship.

**Microservice** (`services/file-storage`):

- Routes protected by `FILES_UPLOAD`, `FILES_VIEW`, `FILES_DELETE` permissions.
- Parallel virus-scan service with TODO for full integration.

**Environment:**

```
CLAMAV_HOST=
CLAMAV_PORT=3310
CLAMAV_TIMEOUT_MS=30000
CLAMAV_REQUIRED=false
```

---

### 7.9 Environment Hardening

**Production checklist** (from `.cursor/rules/security-hardening-deferred.mdc`):

- [ ] Replace all `change-me-*` secrets in `backend/.env` and `apps/frontend-web/.env`
- [ ] Set `REDIS_URL` (backend) and `UPSTASH_REDIS_REST_*` (frontend) for multi-instance
- [ ] Set `FORCE_HTTPS=true` and `TRUST_PROXY=true` behind load balancer
- [ ] Set `CLAMAV_REQUIRED=true` when upload endpoints are live
- [ ] Enable backup cron (`backup-run.sh`, `backup-run.ps1`, or Docker `--profile backup`)
- [ ] Run `pnpm --filter @ordella/clinic-backend backup:drill` monthly
- [ ] Disable `DISABLE_API_RATE_LIMIT` in production

**Secret categories:**

| Secret | Purpose |
|--------|---------|
| `JWT_SECRET` / `JWT_REFRESH_SECRET` | Token signing |
| `SESSION_COOKIE_SECRET` | Edge session cookie HMAC |
| `CSRF_SECRET` | CSRF token signing |
| `NEXTAUTH_SECRET` | NextAuth session |
| `BACKUP_ENCRYPTION_KEY` | AES-256-CBC database backup encryption |
| `REDIS_URL` | Shared rate-limit and brute-force state |

**Configuration validation** (`backend/src/config/env.ts`):

- Required secrets enforced at startup in production.
- `CSRF_SECRET` must be present when `NODE_ENV=production`.

---

### 7.10 Database Hardening

**Encryption at rest:**

- PostgreSQL volume encryption (operator responsibility — cloud provider or LUKS).
- Application-level backup encryption (`backend/scripts/backup-database.mjs`):
  - `pg_dump` → AES-256-CBC with `BACKUP_ENCRYPTION_KEY`.
  - Restore via `backend/scripts/restore-database.mjs`.
  - Monthly drill: `pnpm --filter @ordella/clinic-backend backup:drill`.

**Backup configuration:**

```
BACKUP_ENCRYPTION_KEY=       # min 32 chars
BACKUP_OUTPUT_DIR=backups
BACKUP_RETENTION_DAYS=30
BACKUP_DOCKER_CONTAINER=ordella-clinic-backend-db
BACKUP_CRON_SCHEDULE=0 2 * * *
```

**Connection security:**

- `DATABASE_URL` should use TLS in production (`?sslmode=require`).
- Database credentials stored in secrets manager, not in source control.

**Schema protections:**

- Foreign key constraints on `tenantId` references.
- Cascade rules prevent orphaned cross-tenant data.
- `login_attempts` and `audit_logs` tables are append-only by convention.

---

## 8. Operational Security (Next Layer)

### 8.1 Error Monitoring

**Sentry integration** (`backend/src/modules/security/sentry.ts`):

- Captures unhandled exceptions and API errors.
- Configured via `SENTRY_DSN` env var.
- Frontend CSP allows `*.ingest.sentry.io` in `connect-src`.

**Structured security logging:**

- All `logSecurityEvent()` calls emit JSON to stdout.
- Compatible with log aggregation pipelines (ELK, Loki, CloudWatch).

---

### 8.2 Performance Monitoring

- Correlation IDs (`x-correlation-id` header) propagate from frontend through BFF to backend.
- Generated per request in `apps/frontend-web/lib/api-client.ts`.
- Enables end-to-end request tracing across services.

**AI observability** (microservices):

- `services/ai-monitoring` — model latency, error rates, hallucination metrics.
- Clinic portal UI: `/clinic/ai/observability`.

---

### 8.3 Health Checks

| Endpoint | Service |
|----------|---------|
| `GET /api/health` | Clinic backend |
| `GET /health` | Auth service, microservices |
| `GET /api/health` | Frontend BFF (Next.js) |

Health endpoints are:

- Exempt from authentication.
- Exempt from CSRF.
- Exempt from rate limiting.
- Used by Docker Compose `healthcheck` and Kubernetes liveness/readiness probes.

---

### 8.4 Uptime Monitoring

**Infrastructure** (`infrastructure/deployment-layer/`):

- Docker Compose health checks for all services.
- Kubernetes liveness and readiness probes in Kustomize manifests.
- Recommended: external uptime monitor (Pingdom, UptimeRobot, or cloud provider) on `/api/health`.

---

### 8.5 Log Aggregation

**Recommended production stack** (`infrastructure/global-logging-layer/`):

- Grafana Loki for log storage.
- Promtail for log shipping.
- Grafana dashboards for security event visualization.

**Log sources:**

- Application stdout (structured JSON).
- Nginx/gateway access logs.
- PostgreSQL slow query logs.
- Redis command logs (debug only).

---

### 8.6 Alerting

**Recommended alerts:**

| Alert | Condition |
|-------|-----------|
| Brute-force spike | `security.brute_force` rate > threshold |
| Token reuse | `TOKEN_REUSE_DETECTED` events |
| Rate limit saturation | 429 rate > 5% of requests |
| Health check failure | `/api/health` non-200 for > 1 minute |
| Backup failure | Cron job exit code ≠ 0 |
| ClamAV unreachable | `virus_scan` events with connection errors |
| Permission denial spike | `security.permission_denied` anomaly |

---

## 9. Infrastructure Security (Production Layer)

### 9.1 API Gateway

**Role:** Single entry point for all microservice traffic.

- Routes requests to internal services by path prefix.
- Applies gateway-level rate limiting (`infrastructure/developer-tooling-layer/workflow-tests/test/rate-limit/`).
- Terminates TLS at the edge.
- Strips internal headers before forwarding.

**Configuration** (`services/api-gateway/`):

- Route tables per service (auth, patient, appointment, messaging, etc.).
- Health-check aware load balancing.

**Local development:** `http://localhost:3049` (Docker Compose).

---

### 9.2 Service-to-Service Authentication

**Internal communication:**

- Services behind the gateway trust JWTs issued by the auth-service.
- Internal routes (e.g. `services/ai-security/src/controllers/internal-security.controller.ts`) require service-level tokens or network isolation.
- No direct public access to microservice ports in production.

**Clinic backend mode:**

- When `USE_CLINIC_BACKEND=true`, portal APIs bypass the gateway and talk directly to `backend:4000`.
- Gateway-only services (messaging, AI, marketplace) remain on the gateway path.

---

### 9.3 Network Segmentation

**Docker Compose** (`infrastructure/deployment-layer/docker-compose.local.yml`):

- Services communicate on internal Docker networks.
- Only gateway and frontend ports are exposed to the host.
- Database and Redis are not publicly accessible.

**Kubernetes (production):**

- Namespace isolation per environment (staging, production).
- Network policies restrict pod-to-pod communication.
- Database in private subnet with no internet access.

---

### 9.4 Secrets Manager

**Production requirement:** Secrets must not live in `.env` files on disk.

| Platform | Recommended tool |
|----------|-----------------|
| AWS | AWS Secrets Manager or SSM Parameter Store |
| Azure | Azure Key Vault |
| GCP | Google Secret Manager |
| Self-hosted | HashiCorp Vault |

**Rotation:** JWT secrets support overlap via `*_PREVIOUS` env vars. Automated rotation runbook is deferred.

---

### 9.5 TLS Termination

- TLS terminated at the load balancer or API gateway.
- Internal service mesh may use mTLS for service-to-service traffic.
- `FORCE_HTTPS=true` on clinic backend redirects HTTP → HTTPS.
- HSTS header enforced via Helmet.
- Local development uses HTTP; production requires valid certificates (Let's Encrypt or CA-signed).

**Certificate storage** (`infrastructure/gateway-load-balancer/certs/`):

- `ordella.local.crt` / `ordella.local.key` for local HTTPS testing.

---

### 9.6 Web Application Firewall (WAF)

**Recommended for production:**

- Cloud WAF (AWS WAF, Cloudflare, Azure Front Door) in front of the gateway.
- Rules for OWASP Top 10 protection.
- Geo-blocking if clinic operations are region-specific.
- Bot detection on public marketing pages.

**Current state:** WAF is an **infrastructure operator responsibility** — not embedded in application code.

---

### 9.7 DDoS Protection

**Layers:**

| Layer | Control |
|-------|---------|
| Edge | Cloud provider DDoS protection (AWS Shield, Cloudflare) |
| Gateway | Rate limiting per IP and per user |
| Application | `globalRateLimiter` + `authRateLimiter` |
| Frontend | Edge middleware rate limits on `/api/*` |
| Redis | Shared counters for multi-instance deployments |

---

## Implementation Status Summary

| Area | Status | Notes |
|------|--------|-------|
| HttpOnly refresh BFF | ✅ Implemented | `apps/frontend-web/app/api/auth/*` |
| JWT access + refresh | ✅ Implemented | Both clinic backend and auth-service |
| Refresh token rotation | ✅ Implemented | Revokes old token on each refresh |
| Token reuse detection | ⚠️ Partial | Full detection in auth-service only |
| Session cookie signing | ✅ Implemented | Edge middleware RBAC |
| Brute-force protection | ✅ Implemented | Redis + DB lockout |
| RBAC permissions | ✅ Implemented | API + UI enforcement |
| Portal isolation | ✅ Implemented | Edge middleware + client gates |
| Tenant isolation | ✅ Implemented | `requireTenant` + query scoping |
| Audit logging | ✅ Implemented | Mutations + security events |
| Rate limiting | ✅ Implemented | Backend + frontend edge |
| Nonce CSP | ✅ Implemented | Production frontend + Helmet API |
| CSRF protection | ✅ Implemented | Double-submit cookie |
| Input validation | ✅ Implemented | Zod schemas + sanitization |
| Encrypted backups | ✅ Implemented | AES-256-CBC + restore drill |
| ClamAV file scanning | 🔲 Built, not wired | Enable when uploads ship |
| Automated JWT rotation | 🔲 Deferred | Manual `*_PREVIOUS` overlap only |
| WAF / DDoS edge | 🔲 Infrastructure | Operator responsibility |
| Security regression tests | ✅ Implemented | `backend/test/security.spec.ts` |

---

## Key Source Files

| Area | Path |
|------|------|
| JWT utilities | `backend/src/utils/jwt.ts` |
| Auth service | `backend/src/modules/auth/auth.service.ts` |
| Token revocation | `backend/src/modules/security/token-revocation.service.ts` |
| Brute-force | `backend/src/modules/security/brute-force.service.ts` |
| Permissions | `backend/src/middleware/permissions.ts` |
| RBAC policies | `backend/src/modules/rbac/policies.ts` |
| Tenant guards | `backend/src/middleware/tenant.ts` |
| Tenant query scope | `backend/src/modules/security/tenant-scope.ts` |
| Audit service | `backend/src/modules/utilities/audit.service.ts` |
| Security events | `backend/src/modules/security/security-events.service.ts` |
| Rate limiting | `backend/src/middleware/rate-limit.ts` |
| CSRF | `backend/src/middleware/csrf.ts` |
| CSP (frontend) | `apps/frontend-web/lib/security/csp.ts` |
| Edge middleware | `apps/frontend-web/middleware.ts` |
| Session signing | `apps/frontend-web/lib/auth/session-signing.ts` |
| BFF auth routes | `apps/frontend-web/app/api/auth/` |
| Session manager | `apps/frontend-web/lib/session-manager.ts` |
| File upload security | `backend/src/modules/security/file-upload.ts` |
| Backup scripts | `backend/scripts/backup-database.mjs` |
| Security tests | `backend/test/security.spec.ts` |
| Env examples | `backend/.env.example`, `apps/frontend-web/.env.example` |
| Deferred backlog | `.cursor/rules/security-hardening-deferred.mdc` |

---

## Conclusion

Ordella's security architecture enforces **defence in depth** across every layer of the stack. Authentication uses short-lived access tokens, HttpOnly refresh cookies, and rotating refresh tokens with revocation support. Authorization combines database-backed RBAC with granular dot-notation permissions enforced at both the API and UI layers. Tenant isolation is absolute — client-supplied tenant identifiers are rejected, and every database query is scoped to the authenticated tenant.

The frontend adds edge middleware for portal isolation, nonce-based CSP, and rate limiting, while the BFF ensures refresh tokens never touch JavaScript. Security events, login attempts, and sensitive mutations are fully audited with IP, user-agent, and correlation ID context.

Production deployments must replace all development secrets, enable Redis for distributed rate limiting, configure TLS and HSTS, wire ClamAV when file uploads go live, and layer infrastructure controls (WAF, DDoS protection, secrets manager, network segmentation) as described in Section 9. The deferred items in the implementation status table above represent known gaps with existing scaffolding — not missing design.

For operational runbooks, sample credentials, and seed instructions, see [`docs/ops-reference.md`](./ops-reference.md). For the overall system blueprint, see [`docs/master-index.md`](./master-index.md).
