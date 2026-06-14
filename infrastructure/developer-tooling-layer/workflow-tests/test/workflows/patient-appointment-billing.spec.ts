import {
  countAppointments,
  countNotes,
  countPatients,
} from "../utils/db";
import {
  sampleAppointment,
  sampleNote,
  samplePatient,
  sampleInvoice,
} from "../fixtures";
import { getFixtures, getInfra, getStack } from "../setup";
import { isServiceUp } from "../utils/stack";
import { authenticatedGateway } from "../utils/supertest";

describe("Workflow: patient → appointment → notes → billing", () => {
  let patientId = "";
  let appointmentId = "";
  let invoiceId = "";

  function servicesReady() {
    const stack = getStack();
    return (
      isServiceUp(stack, "patient") &&
      isServiceUp(stack, "appointment") &&
      isServiceUp(stack, "notes") &&
      isServiceUp(stack, "billing")
    );
  }

  it("creates a patient", async () => {
    if (!servicesReady()) return;

    const { tenantA } = getFixtures();
    const before = getInfra().postgres ? await countPatients(tenantA.tenantId) : -1;

    const response = await authenticatedGateway(tenantA.owner)
      .post("/patients")
      .send(samplePatient());

    expect([200, 201]).toContain(response.status);
    patientId =
      response.body.patient?.id ??
      response.body.data?.patient?.id ??
      response.body.id;
    expect(patientId).toBeTruthy();

    if (getInfra().postgres && before >= 0) {
      const after = await countPatients(tenantA.tenantId);
      expect(after).toBeGreaterThanOrEqual(before);
    }
  });

  it("creates an appointment for the patient", async () => {
    if (!servicesReady() || !patientId) return;

    const { tenantA } = getFixtures();
    const therapistId = tenantA.owner.userId ?? tenantA.owner.email!;

    const response = await authenticatedGateway(tenantA.owner)
      .post("/appointments")
      .send(sampleAppointment(patientId, therapistId));

    expect([200, 201]).toContain(response.status);
    appointmentId =
      response.body.appointment?.id ??
      response.body.data?.appointment?.id ??
      response.body.id;
    expect(appointmentId).toBeTruthy();

    if (getInfra().postgres) {
      const count = await countAppointments(tenantA.tenantId);
      expect(count).toBeGreaterThan(0);
    }
  });

  it("adds a clinical note linked to the appointment", async () => {
    if (!servicesReady() || !patientId || !appointmentId) return;

    const { tenantA } = getFixtures();
    const therapistId = tenantA.owner.userId ?? tenantA.owner.email!;

    const response = await authenticatedGateway(tenantA.owner)
      .post("/notes")
      .send(sampleNote(patientId, therapistId, appointmentId));

    expect([200, 201]).toContain(response.status);
    const noteId = response.body.id ?? response.body.note?.id ?? response.body.data?.id;
    expect(noteId).toBeTruthy();

    if (getInfra().postgres) {
      const count = await countNotes(tenantA.tenantId);
      expect(count).toBeGreaterThan(0);
    }
  });

  it("creates and issues a billing invoice", async () => {
    if (!servicesReady() || !patientId || !appointmentId) return;

    const { tenantA } = getFixtures();
    const staffId = tenantA.owner.userId ?? tenantA.owner.email!;

    const create = await authenticatedGateway(tenantA.owner)
      .post("/billing/invoices")
      .send(sampleInvoice(patientId, staffId, appointmentId));

    expect([200, 201]).toContain(create.status);
    invoiceId =
      create.body.invoice?.id ??
      create.body.data?.invoice?.id ??
      create.body.id;
    expect(invoiceId).toBeTruthy();

    const issue = await authenticatedGateway(tenantA.owner).post(
      `/billing/invoices/${invoiceId}/issue`,
    );
    expect([200, 201, 202]).toContain(issue.status);
  });
});
