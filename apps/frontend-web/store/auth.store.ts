import { create } from "zustand";

import { persist } from "zustand/middleware";

import { eraseSessionCookie, writeSessionCookie } from "@/lib/auth/session-cookie-client";

import { clearTokens, getAccessToken, setAccessToken } from "@/lib/utils/authStorage";

import type { PortalRole } from "@/lib/rbac";



export type AuthUser = {

  id: string;

  email: string;

  firstName?: string;

  lastName?: string;

  tenantId: string;

  organizationId?: string | null;

  role: PortalRole;

  effectiveRole?: string;

  roles: PortalRole[];

  permissions: string[];

};



type AuthState = {

  accessToken: string | null;

  user: AuthUser | null;

  isAuthenticated: boolean;

  setSession: (payload: {

    accessToken: string;

    /** Used once to set the HttpOnly cookie — never stored client-side. */

    refreshToken?: string;

    user: AuthUser;

  }) => void;

  updateTokens: (accessToken: string) => void;

  clearSession: () => void;

};



const initialState = {

  accessToken: null,

  user: null,

  isAuthenticated: false,

};



export const useAuthStore = create<AuthState>()(

  persist(

    (set) => ({

      ...initialState,

      setSession: ({ accessToken, refreshToken, user }) => {

        setAccessToken(accessToken);

        void writeSessionCookie(user, refreshToken);

        set({

          accessToken,

          user,

          isAuthenticated: true,

        });

      },

      updateTokens: (accessToken) => {

        setAccessToken(accessToken);

        set({ accessToken });

      },

      clearSession: () => {

        clearTokens();

        void eraseSessionCookie();

        set(initialState);

      },

    }),

    {

      name: "ordella-auth",

      partialize: (state) => ({

        user: state.user,

        isAuthenticated: state.isAuthenticated,

      }),

      onRehydrateStorage: () => (state) => {

        if (!state) {

          return;

        }



        state.accessToken = getAccessToken();



        if (state.user && state.isAuthenticated) {

          void writeSessionCookie(state.user);

        }

      },

    },

  ),

);


