"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { adminAiPaths } from "@/lib/ai-admin-paths";

const NAV_ITEMS = [
  { href: adminAiPaths.dashboard, label: "Dashboard" },
  { href: adminAiPaths.datasets, label: "Datasets" },
  { href: adminAiPaths.training, label: "Training" },
  { href: adminAiPaths.experiments, label: "Training runs" },
  { href: adminAiPaths.models, label: "Models" },
  { href: adminAiPaths.flags, label: "Flags" },
  { href: adminAiPaths.featureExperiments, label: "A/B Tests" },
  { href: adminAiPaths.gatewayKeys, label: "AI Gateway" },
  { href: adminAiPaths.cost, label: "AI Cost" },
  { href: adminAiPaths.securityAudit, label: "AI Security" },
  { href: adminAiPaths.observability, label: "Observability" },
  { href: adminAiPaths.agents, label: "AI Agents" },
  { href: adminAiPaths.drift, label: "Drift" },
];

export function AiAdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="ai-admin-shell">
      <nav className="ai-admin-nav" aria-label="AI admin">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Button key={item.href} asChild variant={active ? "secondary" : "ghost"} size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          );
        })}
      </nav>
      <div className="ai-admin-content">{children}</div>
    </div>
  );
}
