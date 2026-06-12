"use client";

import { useState } from "react";
import { toast } from "sonner";
import { AITestPanel } from "@/components/ai/AITestPanel";
import { PageError, PageLoading } from "@/components/patient-portal/page-state";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useAIProviders,
  useCreateAIProvider,
  useUpdateAIProvider,
} from "@/hooks/useAI";
import type { AIProviderType } from "@/lib/ai-types";
import { WithAllPermissions } from "@/lib/auth/withPermission";

const PROVIDER_OPTIONS: AIProviderType[] = ["OPENAI", "AZURE_OPENAI", "ANTHROPIC", "LOCAL"];

export default function AISettingsPage() {
  const providersQuery = useAIProviders();
  const createProvider = useCreateAIProvider();
  const updateProvider = useUpdateAIProvider();

  const [form, setForm] = useState({
    provider: "LOCAL" as AIProviderType,
    modelName: "local-llm-v1",
    apiKey: "dev-local-key",
    baseUrl: "",
    priority: 0,
  });

  if (providersQuery.isLoading) {
    return <PageLoading rows={4} />;
  }

  if (providersQuery.isError) {
    return <PageError onRetry={() => void providersQuery.refetch()} />;
  }

  const providers = providersQuery.data ?? [];
  const models = [...new Set(providers.filter((p) => p.isActive).map((p) => p.modelName))];
  if (!models.length) {
    models.push("local-llm-v1");
  }

  async function handleCreateProvider() {
    try {
      await createProvider.mutateAsync({
        provider: form.provider,
        modelName: form.modelName,
        apiKey: form.apiKey,
        baseUrl: form.baseUrl || undefined,
        priority: form.priority,
        isActive: true,
      });
      toast.success("AI provider saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save provider.");
    }
  }

  async function toggleProvider(id: string, isActive: boolean) {
    try {
      await updateProvider.mutateAsync({ id, input: { isActive: !isActive } });
      toast.success("Provider updated.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to update provider.");
    }
  }

  return (
    <WithAllPermissions permissions={["ai.manage", "ai.use"]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">AI settings</h1>
          <p className="text-muted-foreground">
            Configure tenant AI providers, routing priority, and test prompts.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configured providers</CardTitle>
            <CardDescription>Active providers are tried in ascending priority order.</CardDescription>
          </CardHeader>
          <CardBody className="space-y-3">
            {providers.length ? (
              <ul className="space-y-2">
                {providers.map((provider) => (
                  <li
                    key={provider.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-md border px-3 py-2 text-sm"
                  >
                    <div>
                      <p className="font-medium">
                        {provider.provider} · {provider.modelName}
                      </p>
                      <p className="text-muted-foreground">
                        Priority {provider.priority} · {provider.isActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => void toggleProvider(provider.id, provider.isActive)}
                    >
                      {provider.isActive ? "Disable" : "Enable"}
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No tenant providers yet. The platform default local provider will be used.
              </p>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add provider</CardTitle>
          </CardHeader>
          <CardBody className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="ai-provider">
                Provider
              </label>
              <select
                id="ai-provider"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.provider}
                onChange={(event) =>
                  setForm((current) => ({ ...current, provider: event.target.value as AIProviderType }))
                }
              >
                {PROVIDER_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="ai-model">
                Model
              </label>
              <input
                id="ai-model"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.modelName}
                onChange={(event) => setForm((current) => ({ ...current, modelName: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="ai-api-key">
                API key
              </label>
              <input
                id="ai-api-key"
                type="password"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.apiKey}
                onChange={(event) => setForm((current) => ({ ...current, apiKey: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="ai-base-url">
                Base URL (optional)
              </label>
              <input
                id="ai-base-url"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.baseUrl}
                onChange={(event) => setForm((current) => ({ ...current, baseUrl: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="ai-priority">
                Priority
              </label>
              <input
                id="ai-priority"
                type="number"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.priority}
                onChange={(event) =>
                  setForm((current) => ({ ...current, priority: Number(event.target.value) }))
                }
              />
            </div>
            <div className="flex items-end">
              <Button
                type="button"
                variant="primary"
                disabled={createProvider.isPending}
                onClick={() => void handleCreateProvider()}
              >
                Save provider
              </Button>
            </div>
          </CardBody>
        </Card>

        <AITestPanel models={models} />
      </div>
    </WithAllPermissions>
  );
}
