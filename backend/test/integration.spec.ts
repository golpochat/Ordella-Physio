import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { createApp } from "../src/app";

describe.sequential("clinic backend integration", () => {
  const app = createApp();
  let accessToken = "";
  let tenantId = "";
  let patientId = "";
  let therapistId = "";
  let appointmentId = "";
  let invoiceId = "";
  let dbReady = false;

  beforeAll(async () => {
    try {
      const login = await request(app)
        .post("/api/auth/login")
        .send({
          tenantSlug: "demo-clinic",
          email: "admin@demo-clinic.dev",
          password: "Admin123!",
        });

      if (login.status !== 200) {
        return;
      }

      accessToken = login.body.data.accessToken;
      tenantId = login.body.data.user.tenantId;
      dbReady = Boolean(accessToken && tenantId);
    } catch {
      dbReady = false;
    }
  });

  function authed() {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  it("returns current user profile", async (ctx) => {
    if (!dbReady) return ctx.skip();
    const response = await request(app).get("/api/auth/users/me").set(authed());
    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toBe("admin@demo-clinic.dev");
  });

  it("creates a patient", async (ctx) => {
    if (!dbReady) return ctx.skip();
    const unique = Date.now();
    const response = await request(app)
      .post("/api/patients")
      .set(authed())
      .send({
        firstName: "Integration",
        lastName: "Patient",
        email: `integration.patient.${unique}@example.com`,
        phone: `+3538700${String(unique).slice(-5)}`,
      });

    expect(response.status).toBe(201);
    patientId = response.body.data.id;
    expect(patientId).toBeTruthy();
  });

  it("lists therapists", async (ctx) => {
    if (!dbReady) return ctx.skip();
    const response = await request(app).get("/api/therapists").set(authed());
    expect(response.status).toBe(200);
    therapistId = response.body.data.items[0]?.id ?? response.body.data[0]?.id;
    expect(therapistId).toBeTruthy();
  });

  it("schedules an appointment", async (ctx) => {
    if (!dbReady) return ctx.skip();
    const unique = Date.now();
    const start = new Date();
    start.setDate(start.getDate() + 10 + (unique % 14));
    start.setHours(10 + (unique % 6), unique % 60, 0, 0);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + 45);

    const response = await request(app)
      .post("/api/appointments")
      .set(authed())
      .send({
        patientId,
        therapistId,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        type: "Follow-up",
        notes: "Integration test appointment",
      });

    expect(response.status).toBe(201);
    appointmentId = response.body.data.id;
  });

  it("completes appointment and auto-generates invoice", async (ctx) => {
    if (!dbReady) return ctx.skip();
    const response = await request(app)
      .post(`/api/appointments/${appointmentId}/complete`)
      .set(authed());

    expect(response.status).toBe(200);
    expect(response.body.data.status).toBe("COMPLETED");

    const invoices = await request(app).get("/api/billing/invoices").set(authed());
    expect(invoices.status).toBe(200);
    const items = invoices.body.data.items ?? invoices.body.data;
    const linked = items.find((entry: { appointmentId?: string }) => entry.appointmentId === appointmentId);
    expect(linked).toBeTruthy();
    invoiceId = linked.id;
  });

  it("records payment against invoice", async (ctx) => {
    if (!dbReady) return ctx.skip();
    const invoice = await request(app).get(`/api/billing/invoices/${invoiceId}`).set(authed());
    const amount = Number(invoice.body.data.total ?? invoice.body.data.balanceDue ?? 50);

    const response = await request(app)
      .post(`/api/billing/invoices/${invoiceId}/pay`)
      .set(authed())
      .send({
        amount,
        method: "CARD",
        reference: "integration-test",
      });

    expect(response.status).toBe(201);
  });

  it("creates a clinical note", async (ctx) => {
    if (!dbReady) return ctx.skip();
    const response = await request(app)
      .post("/api/notes")
      .set(authed())
      .send({
        patientId,
        type: "CLINICAL",
        title: "Integration note",
        content: "Patient responded well to treatment.",
      });

    expect(response.status).toBe(201);
  });

  it("generates patient service statement PDF", async (ctx) => {
    if (!dbReady) return ctx.skip();
    const response = await request(app)
      .get(`/api/patients/${patientId}/service-statement/pdf`)
      .set(authed());

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/pdf");
  });
});
