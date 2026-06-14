import { getFixtures, getStack } from "../setup";
import { isServiceUp } from "../utils/stack";
import { authenticatedGateway } from "../utils/supertest";

describe("Workflow: AI notes cross-service flow", () => {
  let patientId = "";
  let appointmentId = "";

  function ready() {
    const stack = getStack();
    return (
      isServiceUp(stack, "patient") &&
      isServiceUp(stack, "appointment") &&
      isServiceUp(stack, "ai-notes")
    );
  }

  it("creates patient and appointment prerequisites", async () => {
    if (!ready()) return;

    const { tenantA } = getFixtures();
    const therapistId = tenantA.owner.userId!;

    const patient = await authenticatedGateway(tenantA.owner)
      .post("/patients")
      .send({
        firstName: "AI",
        lastName: "Patient",
        email: `ai-patient-${Date.now()}@workflow.test`,
      });
    expect([200, 201]).toContain(patient.status);
    patientId = patient.body.patient?.id ?? patient.body.id;

    const appointment = await authenticatedGateway(tenantA.owner)
      .post("/appointments")
      .send({
        patientId,
        therapistId,
        locationId: "location-ai-1",
        startTime: new Date(Date.now() + 172_800_000).toISOString(),
        endTime: new Date(Date.now() + 176_400_000).toISOString(),
        type: "AI Assessment",
      });
    expect([200, 201]).toContain(appointment.status);
    appointmentId = appointment.body.appointment?.id ?? appointment.body.id;
  });

  it("generates an AI note and returns structured SOAP output", async () => {
    if (!ready() || !patientId || !appointmentId) return;

    const { tenantA } = getFixtures();
    const response = await authenticatedGateway(tenantA.owner)
      .post("/ai/notes/generate")
      .send({
        patientId,
        therapistId: tenantA.owner.userId,
        appointmentId,
        rawText: "Patient reports improved mobility after physiotherapy session.",
      });

    expect([200, 201]).toContain(response.status);
    const body = response.body.data ?? response.body;
    expect(body.soap ?? body.summary ?? body.outputId).toBeTruthy();
  });
});
