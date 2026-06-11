"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useTenant } from "@/hooks/useTenant";
import { createUserPortalApi, normalizeList } from "@/lib/user-portal-api";
import type { UpdatePortalUserProfilePayload } from "@/lib/user-portal-types";
import { useAuthStore } from "@/store/auth.store";

export function useUserPortalApi() {
  const api = useApi();
  return useMemo(() => createUserPortalApi(api), [api]);
}

export function useUserPortalContext() {
  const user = useAuthStore((state) => state.user);
  const { tenantId } = useTenant();
  const displayName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "User";

  return { user, userId: user?.id, tenantId, displayName };
}

function requireApi(api: ReturnType<typeof createUserPortalApi> | null) {
  if (!api) throw new Error("API client is required");
  return api;
}

export function useUserAppointments() {
  const userApi = useUserPortalApi();
  const { userId, tenantId } = useUserPortalContext();

  return useQuery({
    queryKey: ["user-portal", "appointments", tenantId, userId],
    queryFn: async () =>
      normalizeList(
        await requireApi(userApi).listAppointments({ limit: 100, patientId: userId }),
      ),
    enabled: Boolean(tenantId),
  });
}

export function useUserAppointment(id: string) {
  const userApi = useUserPortalApi();

  return useQuery({
    queryKey: ["user-portal", "appointments", id],
    queryFn: () => requireApi(userApi).getAppointment(id),
    enabled: Boolean(id),
  });
}

export function useUserBilling() {
  const userApi = useUserPortalApi();
  const { userId, tenantId } = useUserPortalContext();

  return useQuery({
    queryKey: ["user-portal", "billing", tenantId, userId],
    queryFn: async () =>
      normalizeList(await requireApi(userApi).listBilling({ patientId: userId })),
    enabled: Boolean(tenantId),
  });
}

export function useUserInvoice(invoiceId: string) {
  const userApi = useUserPortalApi();

  return useQuery({
    queryKey: ["user-portal", "billing", invoiceId],
    queryFn: () => requireApi(userApi).getInvoice(invoiceId),
    enabled: Boolean(invoiceId),
  });
}

export function useUserNotes() {
  const userApi = useUserPortalApi();
  const { userId, tenantId } = useUserPortalContext();

  return useQuery({
    queryKey: ["user-portal", "notes", tenantId, userId],
    queryFn: async () =>
      normalizeList(await requireApi(userApi).listNotes({ limit: 100, patientId: userId })),
    enabled: Boolean(tenantId),
  });
}

export function useUserNote(id: string) {
  const userApi = useUserPortalApi();

  return useQuery({
    queryKey: ["user-portal", "notes", id],
    queryFn: () => requireApi(userApi).getNote(id),
    enabled: Boolean(id),
  });
}

export function useUserProfile() {
  const userApi = useUserPortalApi();

  return useQuery({
    queryKey: ["user-portal", "profile"],
    queryFn: () => requireApi(userApi).getProfile(),
  });
}

export function useUpdateUserProfile() {
  const userApi = useUserPortalApi();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: UpdatePortalUserProfilePayload) =>
      requireApi(userApi).updateProfile(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["user-portal", "profile"] });
      if (user && accessToken && refreshToken) {
        setSession({
          accessToken,
          refreshToken,
          user: {
            ...user,
            email: response.user.email ?? user.email,
            firstName: response.user.firstName ?? user.firstName,
            lastName: response.user.lastName ?? user.lastName,
          },
        });
      }
    },
  });
}
