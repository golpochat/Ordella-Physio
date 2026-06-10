import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { AuthUser } from "@/lib/auth";
import { isTokenExpired, tokenToUser } from "@/lib/auth";
import { API_ROUTES, STORAGE_KEYS } from "@/lib/constants";
import { apiClient } from "@/lib/api-client";

type AuthTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

type AuthState = AuthTokens & {
  user: AuthUser | null;
  isHydrated: boolean;
  isLoading: boolean;
  setHydrated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setSession: (tokens: AuthTokens, user: AuthUser | null) => Promise<void>;
  clearSession: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  refreshSession: () => Promise<string | null>;
  loadStoredTokens: () => Promise<void>;
};

async function saveSecureTokens(tokens: AuthTokens) {
  if (tokens.accessToken) {
    await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
  } else {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
  }

  if (tokens.refreshToken) {
    await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  } else {
    await SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
  }
}

async function readSecureTokens(): Promise<AuthTokens> {
  const [accessToken, refreshToken] = await Promise.all([
    SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
    SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
  ]);
  return { accessToken, refreshToken };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isHydrated: false,
      isLoading: false,

      setHydrated: (value) => set({ isHydrated: value }),
      setLoading: (value) => set({ isLoading: value }),

      setSession: async (tokens, user) => {
        await saveSecureTokens(tokens);
        set({ ...tokens, user });
      },

      clearSession: async () => {
        await saveSecureTokens({ accessToken: null, refreshToken: null });
        set({ accessToken: null, refreshToken: null, user: null });
      },

      loadStoredTokens: async () => {
        const tokens = await readSecureTokens();
        const user = tokens.accessToken ? tokenToUser(tokens.accessToken) : null;
        set({ ...tokens, user, isHydrated: true });
      },

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const response = await apiClient.post<{
            accessToken: string;
            refreshToken: string;
          }>(API_ROUTES.auth.login, { email, password }, { skipAuth: true });

          const user = tokenToUser(response.accessToken);
          await get().setSession(
            { accessToken: response.accessToken, refreshToken: response.refreshToken },
            user,
          );
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (email, password) => {
        set({ isLoading: true });
        try {
          await apiClient.post(API_ROUTES.auth.register, { email, password }, { skipAuth: true });
          await get().login(email, password);
        } finally {
          set({ isLoading: false });
        }
      },

      refreshSession: async () => {
        const { refreshToken } = get();
        if (!refreshToken) {
          await get().clearSession();
          return null;
        }

        try {
          const response = await apiClient.post<{
            accessToken: string;
            refreshToken?: string;
          }>(API_ROUTES.auth.refresh, { refreshToken }, { skipAuth: true, skipRefresh: true });

          const user = tokenToUser(response.accessToken);
          await get().setSession(
            {
              accessToken: response.accessToken,
              refreshToken: response.refreshToken ?? refreshToken,
            },
            user,
          );
          return response.accessToken;
        } catch {
          await get().clearSession();
          return null;
        }
      },
    }),
    {
      name: "ordella-auth",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user }),
    },
  ),
);

export function getValidAccessToken(): string | null {
  const { accessToken } = useAuthStore.getState();
  if (!accessToken || isTokenExpired(accessToken)) {
    return null;
  }
  return accessToken;
}
