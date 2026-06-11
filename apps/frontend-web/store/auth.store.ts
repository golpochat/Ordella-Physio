import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/lib/utils/authStorage";
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
      setSession: ({ accessToken, refreshToken, user }) => {
        setTokens(accessToken, refreshToken);
        set({
          accessToken,
          refreshToken,
          user,
          isAuthenticated: true,
        });
      },
      updateTokens: (accessToken, refreshToken) => {
        const nextRefreshToken = refreshToken ?? useAuthStore.getState().refreshToken;
        if (nextRefreshToken) {
          setTokens(accessToken, nextRefreshToken);
        } else {
          setTokens(accessToken, getRefreshToken() ?? "");
        }

        set((state) => ({
          accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
        }));
      },
      clearSession: () => {
        clearTokens();
        set(initialState);
      },
    }),
    {
      name: "ordella-auth",
      partialize: (state) => ({
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        const accessToken = getAccessToken();
        const refreshToken = state.refreshToken ?? getRefreshToken();
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      },
    },
  ),
);
