# Roadmap — Ordella Physio

## Phase 1 — Foundation (Current)

- [x] Turborepo monorepo scaffolding
- [x] Shared packages (ui, shared, config)
- [x] API gateway with service routing
- [x] Microservice stubs with health checks
- [x] Next.js marketing site and dashboard shell
- [x] Docker and docker-compose setup
- [ ] PostgreSQL schema design per service
- [ ] Real JWT auth with refresh token rotation

## Phase 2 — Core Clinical Workflow

- [ ] Patient CRUD with search
- [ ] Appointment scheduling with conflict detection
- [ ] Provider calendar views in dashboard
- [ ] SOAP notes with rich text editor
- [ ] File upload for note attachments (S3-compatible storage)

## Phase 3 — Billing & Communications

- [ ] Invoice generation with line items
- [ ] Stripe Checkout / Payment Intents
- [ ] Email reminders (SendGrid / SES)
- [ ] SMS reminders (Twilio)
- [ ] Webhook handlers for payment events

## Phase 4 — Reporting & Admin

- [ ] Clinic admin: locations, staff invites, role assignment
- [ ] Dashboard analytics (appointments, revenue, no-shows)
- [ ] Exportable CSV/PDF reports
- [ ] Audit logging for PHI access

## Phase 5 — Production Readiness

- [ ] Kubernetes manifests and CI/CD pipeline
- [ ] Integration and E2E test suites
- [ ] Observability (structured logging, metrics, tracing)
- [ ] Rate limiting and API versioning
- [ ] HIPAA compliance review and BAA readiness

## Service Port Reference

| Service | Port |
|---------|------|
| web | 3000 |
| app | 3001 |
| api-gateway | 4000 |
| auth-service | 4001 |
| tenant-service | 4002 |
| patient-service | 4003 |
| appointment-service | 4004 |
| notes-service | 4005 |
| billing-service | 4006 |
| payment-service | 4007 |
| communication-service | 4008 |
| reporting-service | 4009 |
