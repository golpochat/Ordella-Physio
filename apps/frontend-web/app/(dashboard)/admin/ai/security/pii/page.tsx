import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";
"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { AiAdminShell } from "@/components/ai/admin";
import { PIIIncidentDetails } from "@/components/ai/security/PIIIncidentDetails";
import { PIIIncidentList } from "@/components/ai/security/PIIIncidentList";
import { ListPage } from "@/components/dashboard/ListPage";
import { useAuth } from "@/hooks/useAuth";
import { usePiiIncidents, useResolvePiiIncident } from "@/hooks/useAiSecurity";
import { adminAiPaths } from "@/lib/ai-admin-paths";
import { aiSecuritySectionNav } from "@/lib/ai-admin-section-nav";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";
import type { PIIIncidentRecord } from "@/lib/security-types";

export default function AdminSecurityPiiPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const [selected, setSelected] = useState<PIIIncidentRecord | null>(null);
  const { data, isLoading, isError, refetch } = usePiiIncidents();
  const resolveIncident = useResolvePiiIncident();

  return (
    <WithPermission permission="ai.admin">
      <AiAdminShell>
        <ListPage title="PII incidents" subtitle="Detected and redacted personally identifiable information." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={5}>
          <AiAdminSectionNav items={aiSecuritySectionNav(adminAiPaths)} />
          <PIIIncidentList
            incidents={data ?? []}
            onSelect={setSelected}
            onResolve={canManage ? (id) => void resolveIncident.mutateAsync(id).then(() => toast.success("Incident resolved.")) : undefined}
          />
          <PIIIncidentDetails
            incident={selected}
            onResolve={canManage ? (id) => void resolveIncident.mutateAsync(id).then(() => { setSelected(null); toast.success("Resolved."); }) : undefined}
          />
        </ListPage>
      </AiAdminShell>
    </WithPermission>
  );
}
