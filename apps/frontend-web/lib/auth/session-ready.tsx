"use client";

import { createContext, useContext, type ReactNode } from "react";

const SessionReadyContext = createContext(false);

export function SessionReadyProvider({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) {
  return (
    <SessionReadyContext.Provider value={ready}>{children}</SessionReadyContext.Provider>
  );
}

export function useSessionReady(): boolean {
  return useContext(SessionReadyContext);
}
