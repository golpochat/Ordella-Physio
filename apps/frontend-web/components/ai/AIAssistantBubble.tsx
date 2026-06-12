"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { AICopilotSidebar } from "@/components/ai/AICopilotSidebar";
import { Button } from "@/components/ui/button";
import { useCopilotEntity } from "@/components/ai/CopilotEntityContext";
import type { CopilotEntityType } from "@/lib/ai-copilot-types";
import { IfHasPermission } from "@/lib/auth/withPermission";

type AIAssistantBubbleProps = {
  entityType?: CopilotEntityType;
  entityId?: string;
};

const QUICK_PROMPTS = [
  "Summarize this patient",
  "What follow-up actions should I take?",
  "Explain this invoice",
] as const;

export function AIAssistantBubble({ entityType: entityTypeProp, entityId: entityIdProp }: AIAssistantBubbleProps) {
  const context = useCopilotEntity();
  const entityType = entityTypeProp ?? context.entityType;
  const entityId = entityIdProp ?? context.entityId;
  const [open, setOpen] = useState(false);
  const [miniOpen, setMiniOpen] = useState(false);

  return (
    <IfHasPermission permission="ai.use">
      <>
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          {miniOpen ? (
            <div className="w-64 rounded-lg border bg-background p-3 shadow-lg">
              <p className="mb-2 text-sm font-medium">Quick questions</p>
              <div className="space-y-1">
                {QUICK_PROMPTS.map((prompt) => (
                  <Button
                    key={prompt}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-auto w-full justify-start whitespace-normal px-2 py-1 text-left text-xs"
                    onClick={() => {
                      setMiniOpen(false);
                      setOpen(true);
                      setMiniOpen(false);
                    }}
                  >
                    {prompt}
                  </Button>
                ))}
                <Button asChild variant="outline" size="sm" className="mt-2 w-full">
                  <Link href="/copilot">Open full copilot</Link>
                </Button>
              </div>
            </div>
          ) : null}

          <Button
            type="button"
            size="lg"
            className="h-14 w-14 rounded-full shadow-lg"
            onClick={() => setMiniOpen((value) => !value)}
            aria-label="Open AI assistant"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        </div>

        <AICopilotSidebar
          open={open}
          onClose={() => setOpen(false)}
          entityType={entityType}
          entityId={entityId}
        />
      </>
    </IfHasPermission>
  );
}

export function AIAssistantBubbleProvider({
  children,
  entityType,
  entityId,
}: {
  children: React.ReactNode;
  entityType?: CopilotEntityType;
  entityId?: string;
}) {
  return (
    <>
      {children}
      <AIAssistantBubble entityType={entityType} entityId={entityId} />
    </>
  );
}
