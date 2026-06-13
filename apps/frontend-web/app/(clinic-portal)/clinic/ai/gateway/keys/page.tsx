"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { ApiKeyEditor } from "@/components/ai/gateway/ApiKeyEditor";
import { ApiKeyList } from "@/components/ai/gateway/ApiKeyList";
import { ListPage } from "@/components/dashboard/ListPage";
import {
  useCreateGatewayKey,
  useGatewayKeys,
  useRevokeGatewayKey,
  useRotateGatewayKey,
  useUpdateGatewayKey,
} from "@/hooks/useAiGateway";
import { useAuth } from "@/hooks/useAuth";
import { clinicAiPaths } from "@/lib/ai-admin-paths";
import { userHasPermission } from "@/lib/auth/permissions";
import { WithPermission } from "@/lib/auth/withPermission";

export default function ClinicGatewayKeysPage() {
  const { user } = useAuth();
  const canManage = userHasPermission(user, "ai.model.manage");
  const [createdApiKey, setCreatedApiKey] = useState<string | null>(null);
  const { data, isLoading, isError, refetch } = useGatewayKeys();
  const createKey = useCreateGatewayKey();
  const updateKey = useUpdateGatewayKey();
  const revokeKey = useRevokeGatewayKey();
  const rotateKey = useRotateGatewayKey();

  return (
    <WithPermission permission="ai.model.view">
      <ListPage title="AI Gateway keys" subtitle="Manage scoped API keys for AI workloads." isLoading={isLoading} isError={isError} onRetry={() => void refetch()} loadingRows={5}>
        <div className="ai-gateway-subnav">
          <Link href={clinicAiPaths.gatewayKeys} className="ai-admin-nav-link ai-admin-nav-link-active">Keys</Link>
          <Link href={clinicAiPaths.gatewayUsage} className="ai-admin-nav-link">Usage</Link>
          <Link href={clinicAiPaths.gatewayLimits} className="ai-admin-nav-link">Limits</Link>
        </div>
        {canManage ? (
          <ApiKeyEditor
            isSaving={createKey.isPending}
            createdApiKey={createdApiKey}
            onSave={(payload) => void createKey.mutateAsync(payload).then((result) => {
              setCreatedApiKey(result.apiKey);
              toast.success("API key created.");
            })}
          />
        ) : null}
        <ApiKeyList
          keys={data ?? []}
          onToggleActive={canManage ? (id, isActive) => void updateKey.mutateAsync({ id, payload: { isActive } }) : undefined}
          onRotate={canManage ? (id) => void rotateKey.mutateAsync(id).then((result) => setCreatedApiKey(result.apiKey)) : undefined}
          onRevoke={canManage ? (id) => void revokeKey.mutateAsync(id) : undefined}
        />
      </ListPage>
    </WithPermission>
  );
}
