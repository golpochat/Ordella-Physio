import { jwtFactory } from "@ordella/testing";
import type { AuthContext } from "./utils/supertest";
import { loginOrRegister } from "./utils/supertest";
import { WORKFLOW_CONFIG } from "./utils/stack";

export type WorkflowFixtures = {
  tenantA: WorkflowTenantFixture;
  tenantB: WorkflowTenantFixture;
  demoAdmin: AuthContext;
};

export type WorkflowTenantFixture = {
  tenantId: string;
  owner: AuthContext;
  therapist?: AuthContext;
};

function uniqueSuffix() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function createWorkflowTenant(prefix: string): Promise<WorkflowTenantFixture> {
  const tenantId = `${prefix}-${uniqueSuffix()}`;
  const email = `${prefix}-owner-${uniqueSuffix()}@workflow.test`;
  const password = "WorkflowTest123!";

  const owner = await loginOrRegister({
    tenantId,
    email,
    password,
    role: "OWNER",
  });

  return { tenantId, owner };
}

export async function buildWorkflowFixtures(): Promise<WorkflowFixtures> {
  const [tenantA, tenantB] = await Promise.all([
    createWorkflowTenant("workflow-a"),
    createWorkflowTenant("workflow-b"),
  ]);

  let demoAdmin: AuthContext;
  try {
    demoAdmin = await loginOrRegister({
      tenantId: WORKFLOW_CONFIG.demoTenantId,
      email: WORKFLOW_CONFIG.demoAdminEmail,
      password: WORKFLOW_CONFIG.demoAdminPassword,
      role: "ADMIN",
    });
  } catch {
    demoAdmin = tenantA.owner;
  }

  return { tenantA, tenantB, demoAdmin };
}

export function expiredToken(tenantId: string, userId: string): string {
  return jwtFactory({
    tenantId,
    userId,
    secret: WORKFLOW_CONFIG.jwtSecret,
    expired: true,
  });
}

export function malformedToken(): string {
  return jwtFactory({ malformed: true });
}

export function crossTenantToken(targetTenantId: string, sourceAuth: AuthContext): string {
  return jwtFactory({
    tenantId: targetTenantId,
    userId: sourceAuth.userId ?? "cross-tenant-user",
    email: sourceAuth.email,
    role: sourceAuth.role ?? "OWNER",
    secret: WORKFLOW_CONFIG.jwtSecret,
  });
}

export const stripeSubscriptionActivatedEvent = (tenantId: string) => ({
  id: `evt_workflow_${uniqueSuffix()}`,
  object: "event",
  type: "customer.subscription.updated",
  data: {
    object: {
      id: `sub_workflow_${uniqueSuffix()}`,
      object: "subscription",
      status: "active",
      metadata: { tenantId },
      customer: `cus_workflow_${tenantId}`,
      current_period_start: Math.floor(Date.now() / 1000),
      current_period_end: Math.floor(Date.now() / 1000) + 2_592_000,
      items: { data: [] },
    },
  },
});

export const samplePatient = () => ({
  firstName: "Alex",
  lastName: "Workflow",
  email: `patient-${uniqueSuffix()}@workflow.test`,
  phone: "+447700900111",
  dateOfBirth: "1990-05-15",
  gender: "OTHER",
});

export const sampleAppointment = (patientId: string, therapistId: string) => ({
  patientId,
  therapistId,
  locationId: "location-workflow-1",
  startTime: new Date(Date.now() + 86_400_000).toISOString(),
  endTime: new Date(Date.now() + 90_000_000).toISOString(),
  type: "Initial Assessment",
  notes: "Workflow test appointment",
});

export const sampleNote = (patientId: string, therapistId: string, appointmentId: string) => ({
  patientId,
  therapistId,
  appointmentId,
  type: "SOAP",
  content: "Workflow integration note content.",
});

export const sampleInvoice = (patientId: string, staffId: string, appointmentId?: string) => ({
  patientId,
  staffId,
  appointmentId,
  currency: "GBP",
  items: [
    {
      description: "Physiotherapy session",
      quantity: 1,
      unitPrice: 75,
      taxRate: 0,
    },
  ],
});
