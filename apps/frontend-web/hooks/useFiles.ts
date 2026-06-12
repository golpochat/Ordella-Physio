"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createFileApi } from "@/lib/file-api";
import type { FileListFilters, FileVariant } from "@/lib/file-types";

export function useFileApi() {
  const api = useApi();
  return useMemo(() => createFileApi(api), [api]);
}

export function useFiles(filters: FileListFilters = {}) {
  const fileApi = useFileApi();

  return useQuery({
    queryKey: ["files", filters],
    queryFn: () => fileApi.listFiles(filters),
  });
}

export function useUploadFile() {
  const fileApi = useFileApi();

  return useMutation({
    mutationFn: (input: {
      file: File;
      entityType?: string;
      entityId?: string;
      isPublic?: boolean;
      replaceFileId?: string;
    }) => fileApi.uploadFile(input),
  });
}

export function useFileAccessUrl() {
  const fileApi = useFileApi();

  return useMutation({
    mutationFn: (input: string | { fileId: string; variant?: FileVariant; useCdn?: boolean }) => {
      if (typeof input === "string") {
        return fileApi.getFileAccessUrl(input);
      }

      return fileApi.getFileAccessUrl(input.fileId, {
        variant: input.variant,
        useCdn: input.useCdn,
      });
    },
  });
}

export function useFileVersions(fileId: string | null) {
  const fileApi = useFileApi();

  return useQuery({
    queryKey: ["file-versions", fileId],
    queryFn: () => fileApi.getFileVersions(fileId!),
    enabled: Boolean(fileId),
  });
}

export function useSoftDeleteFile() {
  const fileApi = useFileApi();

  return useMutation({
    mutationFn: (fileId: string) => fileApi.softDeleteFile(fileId),
  });
}

export function useHardDeleteFile() {
  const fileApi = useFileApi();

  return useMutation({
    mutationFn: (fileId: string) => fileApi.hardDeleteFile(fileId),
  });
}
