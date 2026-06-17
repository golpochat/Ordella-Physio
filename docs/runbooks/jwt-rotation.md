# JWT secret rotation runbook

Manual rotation for clinic-backend access and refresh tokens. Automated rotation is deferred (see `.cursor/rules/security-hardening-deferred.mdc`).

## Prerequisites

- Maintenance window or low traffic period
- New secrets generated (min 32 characters): `JWT_SECRET`, `JWT_REFRESH_SECRET`
- Optional overlap secrets: `JWT_SECRET_PREVIOUS`, `JWT_REFRESH_SECRET_PREVIOUS`

## Overlap window procedure

1. Set **previous** secrets to current values in `backend/.env`:
   ```env
   JWT_SECRET_PREVIOUS=<current JWT_SECRET>
   JWT_REFRESH_SECRET_PREVIOUS=<current JWT_REFRESH_SECRET>
   ```
2. Set **new** secrets as `JWT_SECRET` and `JWT_REFRESH_SECRET`.
3. Restart backend (and frontend BFF if it validates tokens locally).
4. Existing access tokens signed with the previous secret continue to verify until expiry (monolith supports `JWT_SECRET_PREVIOUS` in `backend/src/utils/jwt.ts`).
5. Refresh tokens use the same overlap pattern for `JWT_REFRESH_SECRET_PREVIOUS`.
6. After all sessions have refreshed (≥ max refresh TTL, default 7d), remove `_PREVIOUS` vars.

## Frontend / BFF

- HttpOnly refresh cookies are re-issued on refresh; users may need to log in once if refresh fails during rotation.
- No frontend code changes required if env vars are updated on backend only.

## Verification

1. Log in with a test user → access protected `/api/patients` route.
2. Wait for proactive refresh or call `/api/auth/refresh`.
3. Run `pnpm --filter @ordella/clinic-backend test` security suite if available.

## Rollback

Restore prior `JWT_SECRET` / `JWT_REFRESH_SECRET`, clear `_PREVIOUS`, restart services.
