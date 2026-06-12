"use client";

import { createContext, useContext } from "react";
import type { CopilotEntityType } from "@/lib/ai-copilot-types";

type CopilotEntityContextValue = {
  entityType?: CopilotEntityType;
  entityId?: string;
};

const CopilotEntityContext = createContext<CopilotEntityContextValue>({});

export function CopilotEntityProvider({
  children,
  entityType,
  entityId,
}: {
  children: React.ReactNode;
  entityType?: CopilotEntityType;
  entityId?: string;
}) {
  return (
    <CopilotEntityContext.Provider value={{ entityType, entityId }}>
      {children}
    </CopilotEntityContext.Provider>
  );
}

export function useCopilotEntity() {
  return useContext(CopilotEntityContext);
}
