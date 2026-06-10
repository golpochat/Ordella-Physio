import { apiClient } from "./client";
import {
  authResponseSchema,
  metricsSchema,
  paginatedMetaSchema,
  patientSchema,
  appointmentSchema,
  invoiceSchema,
  notificationSchema,
  userSchema,
} from "@/lib/schemas";
import { z } from "zod";

export const authApi = {
  login: async (payload: { email: string; password: string; tenantId: string }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    if (!response.ok) {
      const body = (await response.json()) as { message?: string };
      throw new Error(body.message ?? "Login failed");
    }
    return authResponseSchema.parse(await response.json());
  },
  logout: () => fetch("/api/auth/logout", { method: "POST", credentials: "include" }),
  me: async () => {
    const response = await fetch("/api/auth/me", { credentials: "include" });
    if (!response.ok) throw new Error("Not authenticated");
    return userSchema.parse(await response.json());
  },
};

export const patientsApi = {
  list: async (params?: Record<string, string | number>) => {
    const { data } = await apiClient.get("/patients", { params });
    return z
      .object({ data: z.array(patientSchema), meta: paginatedMetaSchema })
      .parse(data);
  },
  get: async (id: string) => patientSchema.parse((await apiClient.get(`/patients/${id}`)).data),
  create: async (payload: Record<string, unknown>) =>
    patientSchema.parse((await apiClient.post("/patients", payload)).data),
  update: async (id: string, payload: Record<string, unknown>) =>
    patientSchema.parse((await apiClient.patch(`/patients/${id}`, payload)).data),
};

export const appointmentsApi = {
  list: async (params?: Record<string, string | number>) => {
    const { data } = await apiClient.get("/appointments", { params });
    return z
      .object({ data: z.array(appointmentSchema), meta: paginatedMetaSchema })
      .parse(data);
  },
  create: async (payload: Record<string, unknown>) =>
    appointmentSchema.parse((await apiClient.post("/appointments", payload)).data),
  availability: async (therapistId: string) =>
    (await apiClient.get(`/availability/${therapistId}`)).data,
  blockedSlots: async (therapistId: string) =>
    (await apiClient.get(`/blocked-slots/${therapistId}`)).data,
};

export const notesApi = {
  list: async (params?: Record<string, string | number>) =>
    (await apiClient.get("/notes", { params })).data,
  create: async (payload: Record<string, unknown>) =>
    (await apiClient.post("/notes", payload)).data,
  update: async (id: string, payload: Record<string, unknown>) =>
    (await apiClient.patch(`/notes/${id}`, payload)).data,
};

export const billingApi = {
  listInvoices: async (params?: Record<string, string | number>) => {
    const { data } = await apiClient.get("/billing/invoices", { params });
    return z
      .object({ data: z.array(invoiceSchema), meta: paginatedMetaSchema })
      .parse(data);
  },
  getInvoice: async (id: string) =>
    invoiceSchema.parse((await apiClient.get(`/billing/invoices/${id}`)).data),
  createInvoice: async (payload: Record<string, unknown>) =>
    (await apiClient.post("/billing/invoices", payload)).data,
  issueInvoice: async (id: string) =>
    (await apiClient.post(`/billing/invoices/${id}/issue`)).data,
};

export const paymentsApi = {
  list: async (params?: Record<string, string | number>) =>
    (await apiClient.get("/payments", { params })).data,
  refund: async (id: string, payload: Record<string, unknown>) =>
    (await apiClient.post(`/payments/${id}/refunds`, payload)).data,
};

export const communicationApi = {
  listNotifications: async (params?: Record<string, string | number>) => {
    const { data } = await apiClient.get("/communication/notifications", { params });
    return z
      .object({ data: z.array(notificationSchema), meta: paginatedMetaSchema })
      .parse(data);
  },
  sendEmail: async (payload: Record<string, unknown>) =>
    (await apiClient.post("/communication/test/email", payload)).data,
  sendSms: async (payload: Record<string, unknown>) =>
    (await apiClient.post("/communication/test/sms", payload)).data,
  listReminders: async () => (await apiClient.get("/communication/reminders")).data,
};

export const reportingApi = {
  dailyDashboard: async (date: string) =>
    metricsSchema.parse((await apiClient.get("/reporting/dashboard/daily", { params: { date } })).data),
  monthlyDashboard: async (month: string) =>
    (await apiClient.get("/reporting/dashboard/monthly", { params: { month } })).data,
  appointmentSummary: async () =>
    metricsSchema.parse((await apiClient.get("/reporting/appointments/summary")).data),
  revenueDaily: async () => (await apiClient.get("/reporting/revenue/daily")).data,
  byTherapist: async () => (await apiClient.get("/reporting/appointments/by-therapist")).data,
};

export const tenantsApi = {
  get: async (id: string) => (await apiClient.get(`/tenants/${id}`)).data,
  update: async (id: string, payload: Record<string, unknown>) =>
    (await apiClient.patch(`/tenants/${id}`, payload)).data,
  listStaff: async () => (await apiClient.get("/tenants/staff")).data,
  listLocations: async () => (await apiClient.get("/tenants/locations")).data,
};
