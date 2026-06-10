# Enterprise Service

Enterprise-grade features for the Ordella Physio platform: SSO, RBAC v2, audit logs, activity logs, API keys, and webhooks.

## Port

`3065`

## Database

`ordella_enterprise` (PostgreSQL)

## Features

| Feature | Endpoints |
|---------|-----------|
| SSO (SAML, Azure AD, Google Workspace, OAuth2) | `/enterprise/sso/*` |
| RBAC v2 (custom roles, permission groups, inheritance) | `/enterprise/roles`, `/enterprise/permission-groups` |
| Audit logs | `/enterprise/audit-logs`, `/enterprise/admin/audit-logs` |
| Activity logs | `/enterprise/activity-logs`, `/enterprise/admin/activity-logs` |
| API keys | `/enterprise/api-keys` |
| Webhooks | `/enterprise/webhooks` |

## Permissions

- `enterprise.read` — view enterprise settings and logs
- `enterprise.write` — manage SSO, roles, keys, webhooks
- `enterprise.manage` — global admin (SYSTEM role)

## Plan gating

Clinic admin features require `ENTERPRISE` subscription plan (verified via tenant-service).

## Local development

```bash
cp .env.example .env
pnpm --filter @ordella/enterprise-service prisma:generate
pnpm --filter @ordella/enterprise-service dev
```
