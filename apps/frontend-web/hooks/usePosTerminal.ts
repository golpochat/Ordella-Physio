"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { createTerminalApi, type PosSession } from "@/lib/terminal-api";

const POS_CACHE_KEY = "ordella-pos-offline-cache";

export type PosOfflineCache = {
  terminalId: string;
  sessionId?: string;
  cart: Array<{ description: string; quantity: number; unitPrice: number }>;
  updatedAt: string;
};

export function readPosOfflineCache(terminalId: string): PosOfflineCache | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`${POS_CACHE_KEY}:${terminalId}`);
    if (!raw) return null;
    return JSON.parse(raw) as PosOfflineCache;
  } catch {
    return null;
  }
}

export function writePosOfflineCache(cache: PosOfflineCache) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${POS_CACHE_KEY}:${cache.terminalId}`, JSON.stringify(cache));
}

export function useTerminalApiForPos() {
  const api = useApi();
  return useMemo(() => createTerminalApi(api), [api]);
}

export function useGeneratePairingCode(terminalId: string) {
  const terminalApi = useTerminalApiForPos();
  return useMutation({
    mutationFn: () => {
      if (!terminalApi) throw new Error("API client is required");
      return terminalApi.generatePairingCode(terminalId);
    },
  });
}

export function useOpenPosSession(terminalId: string) {
  const terminalApi = useTerminalApiForPos();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (openingCash?: number) => {
      if (!terminalApi) throw new Error("API client is required");
      return terminalApi.openPosSession({ terminalId, openingCash });
    },
    onSuccess: (session) => {
      writePosOfflineCache({ terminalId, sessionId: session.id, cart: [], updatedAt: new Date().toISOString() });
      void queryClient.invalidateQueries({ queryKey: ["pos", "session", session.id] });
    },
  });
}

export function usePosSession(sessionId: string) {
  const terminalApi = useTerminalApiForPos();

  return useQuery({
    queryKey: ["pos", "session", sessionId],
    queryFn: () => {
      if (!terminalApi) throw new Error("API client is required");
      return terminalApi.getPosSession(sessionId);
    },
    enabled: Boolean(terminalApi && sessionId),
  });
}

export function useAddPosItem(sessionId: string, terminalId: string) {
  const terminalApi = useTerminalApiForPos();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: { description: string; quantity: number; unitPrice: number }) => {
      if (!terminalApi) throw new Error("API client is required");
      return terminalApi.addPosItem(sessionId, item);
    },
    onSuccess: (_data, item) => {
      const cache = readPosOfflineCache(terminalId);
      const cart = [...(cache?.cart ?? []), item];
      writePosOfflineCache({ terminalId, sessionId, cart, updatedAt: new Date().toISOString() });
      void queryClient.invalidateQueries({ queryKey: ["pos", "session", sessionId] });
    },
  });
}

export function useCreatePosPayment(sessionId: string) {
  const terminalApi = useTerminalApiForPos();
  return useMutation({
    mutationFn: () => {
      if (!terminalApi) throw new Error("API client is required");
      return terminalApi.createPosPaymentIntent(sessionId);
    },
  });
}

export function useClosePosSession(sessionId: string) {
  const terminalApi = useTerminalApiForPos();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (closingCash: number) => {
      if (!terminalApi) throw new Error("API client is required");
      return terminalApi.closePosSession(sessionId, { closingCash });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["pos", "session", sessionId] });
    },
  });
}

export function posSessionSubtotal(session: PosSession) {
  return session.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}
