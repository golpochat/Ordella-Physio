"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useApi, useQueryAuthReady } from "@/hooks/useApi";
import { useAuthStore } from "@/store/auth.store";
import type {
  ChangePasswordPayload,
  RemoveAvatarResponse,
  UpdateUserProfileResponse,
  UploadAvatarResponse,
  UserProfile,
} from "@/lib/clinic-portal-types";

export const ACCOUNT_PROFILE_QUERY_KEY = ["user", "me"] as const;

export function useMyProfile() {
  const api = useApi();
  const authReady = useQueryAuthReady();

  return useQuery({
    queryKey: ACCOUNT_PROFILE_QUERY_KEY,
    queryFn: () => api.get<UserProfile>("auth", "/users/me"),
    enabled: authReady,
  });
}

export function useUpdateMyProfile() {
  const api = useApi();
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: (payload: { firstName?: string; lastName?: string; phone?: string | null }) =>
      api.put<UpdateUserProfileResponse>("auth", "/users/me", payload),
    onSuccess: (response) => {
      void queryClient.invalidateQueries({ queryKey: ACCOUNT_PROFILE_QUERY_KEY });
      if (user) {
        useAuthStore.setState({
          user: {
            ...user,
            firstName: response.user.firstName ?? user.firstName,
            lastName: response.user.lastName ?? user.lastName,
          },
        });
      }
    },
  });
}

export function useUploadAvatar() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      return api.postForm<UploadAvatarResponse>("auth", "/users/me/avatar", formData);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ACCOUNT_PROFILE_QUERY_KEY });
    },
  });
}

export function useRemoveAvatar() {
  const api = useApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.delete<RemoveAvatarResponse>("auth", "/users/me/avatar"),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ACCOUNT_PROFILE_QUERY_KEY });
    },
  });
}

export function useChangePassword() {
  const api = useApi();

  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      api.post<{ message: string }>("auth", "/users/change-password", payload),
  });
}
