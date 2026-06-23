"use client";

import { AiAdminSectionNav } from "@/components/ai/admin/AiAdminSectionNav";

import Link from "next/link";
import { useState } from "react";
import { PIIIncidentDetails } from "@/components/ai/security/PIIIncidentDetails";
import { PIIIncidentList } from "@/components/ai/security/PIIIncidentList";
import { ListPage } from "@/components/dashboard/ListPage";
import { usePiiIncidents } from "@/hooks/useAiSecurity";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { aiSecuritySectionNav } from "@/lib/ai-admin-section-nav";
import { WithPermission } from "@/lib/auth/withPermission";
import type { PIIIncidentRecord } from "@/lib/security-types";

export default function ClinicSecurityPiiPage() {
  const [selected, setSelected] = useState<PIIIncidentRecord | null>(null);
  const { data, isLoading, isError, refetch } = usePiiIncidents();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="PII incidents" subtitle="Review detected PII in AI workloads." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={5}>
        <AiAdminSectionNav items={aiSecuritySectionNav(clinicAiPaths)} />
        <PIIIncidentList incidents={data ?? []} onSelect={setSelected} />
        <PIIIncidentDetails incident={selected} />
      </ListPage>
    </WithPermission>
  );
}
