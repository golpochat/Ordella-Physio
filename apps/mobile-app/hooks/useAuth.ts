import { useCallback } from "react";
import { router } from "expo-router";
import { PERMISSIONS, type Permission } from "@ordella/security";
import { userHasPermission } from "@/lib/auth";
import { useAuthStore } from "@/store/auth.store";

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const login = useAuthStore((state) => state.login);
  const register = useAuthStore((state) => state.register);
  const clearSession = useAuthStore((state) => state.clearSession);
  const refreshSession = useAuthStore((state) => state.refreshSession);

  const isAuthenticated = Boolean(user);
  const tenantId = user?.tenantId ?? null;

  const hasPermission = useCallback(
    (permission: Permission) => (user ? userHasPermission(user, permission) : false),
    [user],
  );

  const logout = useCallback(async () => {
    await clearSession();
    router.replace("/(auth)/login");
  }, [clearSession]);

  return {
    user,
    tenantId,
    isAuthenticated,
    isLoading,
    isHydrated,
    login,
    register,
    logout,
    refreshSession,
    hasPermission,
    canReadPatients: hasPermission(PERMISSIONS.PATIENT_READ),
    canWriteAppointments: hasPermission(PERMISSIONS.APPOINTMENT_WRITE),
    canReadBilling: hasPermission(PERMISSIONS.BILLING_READ),
  };
}
