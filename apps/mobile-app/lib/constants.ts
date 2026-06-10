import Constants from "expo-constants";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? Constants.expoConfig?.extra?.apiUrl ?? "http://localhost:3049";

export const APP_ENV = process.env.EXPO_PUBLIC_APP_ENV ?? "development";

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "ordella.access_token",
  REFRESH_TOKEN: "ordella.refresh_token",
  TENANT_ID: "ordella.tenant_id",
  LANGUAGE: "ordella.language",
  THEME: "ordella.theme",
  OFFLINE_QUEUE: "ordella.offline_queue",
  DEVICE_TOKEN: "ordella.device_token",
} as const;

export const HEADER_TENANT_ID = "x-tenant-id";
export const HEADER_CORRELATION_ID = "x-correlation-id";
export const HEADER_AUTHORIZATION = "authorization";

export const API_ROUTES = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    me: "/auth/me",
    forgotPassword: "/auth/forgot-password",
  },
  appointments: "/appointments",
  patients: "/patients",
  notes: "/notes",
  billing: "/billing",
  payments: "/payments",
  notifications: {
    register: "/communication/devices/register",
    preferences: "/communication/preferences",
  },
} as const;

export const QUERY_KEYS = {
  me: ["auth", "me"] as const,
  appointments: ["appointments"] as const,
  patients: ["patients"] as const,
  notes: ["notes"] as const,
  billing: ["billing"] as const,
  notifications: ["notifications"] as const,
} as const;
