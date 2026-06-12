import { AIAssistantBubble } from "@/components/ai/AIAssistantBubble";
import { PortalShell } from "@/components/layout/portal-shell";

export default function BillingLayout({ children }: { children: React.ReactNode }) {
  return (
    <PortalShell>
      {children}
      <AIAssistantBubble />
    </PortalShell>
  );
}
