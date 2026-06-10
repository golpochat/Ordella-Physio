import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { PortalRole } from "@/lib/rbac";

export type AuthUser = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  role: PortalRole;
  roles: PortalRole[];
  permissions: string[];
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  setSession: (payload: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  }) => void;
  updateTokens: (accessToken: string, refreshToken?: string) => void;
  clearSession: () => void;
};

const initialState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: ({ accessToken, refreshToken, user }) =>
        set({ accessToken, refreshToken, user, isAuthenticated: true }),
      updateTokens: (accessToken, refreshToken) =>
        set((state) => ({
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
        })),
      clearSession: () => set(initialState),
    }),
    { name: "ordella-auth" },
  ),
);
