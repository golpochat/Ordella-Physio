import { Injectable, Logger } from "@nestjs/common";
import type { AIProviderType } from "@/generated/prisma";
import { resolveAiConfig } from "@/config/ai.config";
import { AIProviderConfigRepository } from "@/repositories/ai-provider-config.repository";
import { InferenceLoggerService } from "@/services/inference-logger.service";
import { PromptTemplateService } from "@/services/prompt-template.service";
import { InferenceRouterService } from "@/services/inference-router.service";
import { ProviderRegistryService } from "@/services/provider-registry.service";
import { decryptApiKey } from "@/utils/crypto.util";
import { aiProviderFailedError } from "@/utils/ai-errors";
import { validateStructuredOutput } from "@/utils/schema-validator";
import {
  validateEmbedding,
  validateStructuredOutput as validateStructuredPayload,
  validateTextCompletion,
} from "@/validators/inference.validator";

type ResolvedProviderConfig = {
  provider: AIProviderType;
  modelName: string;
  apiKey?: string;
  baseUrl?: string | null;
};

@Injectable()
export class InferenceService {
  private readonly logger = new Logger(InferenceService.name);

  constructor(
    private readonly providerConfigRepository: AIProviderConfigRepository,
    private readonly inferenceLoggerService: InferenceLoggerService,
    private readonly providerRegistry: ProviderRegistryService,
    private readonly promptTemplateService: PromptTemplateService,
    private readonly inferenceRouter: InferenceRouterService,
  ) {}

  async runTextCompletion(payloadInput: Record<string, unknown>, tenantId: string, userId?: string) {
    const payload = validateTextCompletion(payloadInput);
    const prompt = this.resolvePrompt(payload);
    const deployedRoute = payload.model
      ? this.inferenceRouter.routeInference(tenantId, payload.model, undefined, userId)
      : null;
    if (deployedRoute) {
      this.providerRegistry.registerDeployedEndpoint(`${tenantId}:${deployedRoute.modelId}`, {
        region: deployedRoute.region,
        endpoint: deployedRoute.endpoint,
        modelId: deployedRoute.modelId,
        version: deployedRoute.version,
      });
      if (deployedRoute.experimentId && deployedRoute.experimentVariant) {
        this.providerRegistry.registerExperimentModel(
          `${tenantId}:${payload.model}`,
          deployedRoute.experimentVariant,
          deployedRoute.modelId,
        );
        this.inferenceRouter.logExperimentEvent(
          deployedRoute.experimentId,
          deployedRoute.experimentVariant,
          "inference",
        );
      }
      this.logger.log(
        `Routing inference for ${payload.model} → ${deployedRoute.region} (${deployedRoute.mode})`,
      );
    }
    const configs = await this.resolveProviderConfigs(tenantId, payload.model);
    const errors: string[] = [];

    for (const config of configs) {
      try {
        const adapter = this.providerRegistry.getProvider(config.provider);
        const result = await adapter.generateText({
          model: config.modelName,
          prompt,
          maxTokens: payload.maxTokens,
          temperature: payload.temperature,
          apiKey: config.apiKey,
          baseUrl: config.baseUrl ?? undefined,
        });

        await this.inferenceLoggerService.logInference({
          tenantId,
          provider: config.provider,
          modelName: config.modelName,
          prompt,
          response: result.text,
          tokensInput: result.tokensInput,
          tokensOutput: result.tokensOutput,
          latencyMs: result.latencyMs,
          taskType: "TEXT",
          metadata: deployedRoute
            ? {
                region: deployedRoute.region,
                mode: deployedRoute.mode,
                endpoint: deployedRoute.endpoint,
                experimentId: deployedRoute.experimentId,
                experimentVariant: deployedRoute.experimentVariant,
              }
            : undefined,
        });

        return {
          task: payload.task ?? "TEXT",
          provider: config.provider,
          model: config.modelName,
          text: result.text,
          tokensInput: result.tokensInput,
          tokensOutput: result.tokensOutput,
          latencyMs: result.latencyMs,
          ...(deployedRoute
            ? { region: deployedRoute.region, routingMode: deployedRoute.mode }
            : {}),
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Provider failed.";
        errors.push(`${config.provider}: ${message}`);
        this.logger.warn(`Text completion failed for ${config.provider}`, message);
      }
    }

    throw aiProviderFailedError(
      errors.length ? errors.join(" | ") : "All AI providers failed to generate a response.",
    );
  }

  async runStructuredOutput(payloadInput: Record<string, unknown>, tenantId: string) {
    const payload = validateStructuredPayload(payloadInput);
    const prompt = this.resolvePrompt(payload);
    const configs = await this.resolveProviderConfigs(tenantId, payload.model);
    const errors: string[] = [];

    for (const config of configs) {
      try {
        const adapter = this.providerRegistry.getProvider(config.provider);
        const result = await adapter.generateJSON({
          model: config.modelName,
          prompt,
          schema: payload.schema,
          maxTokens: payload.maxTokens,
          temperature: payload.temperature,
          apiKey: config.apiKey,
          baseUrl: config.baseUrl ?? undefined,
        });

        const data = validateStructuredOutput(result.data, payload.schema);

        await this.inferenceLoggerService.logInference({
          tenantId,
          provider: config.provider,
          modelName: config.modelName,
          prompt,
          response: result.raw,
          tokensInput: result.tokensInput,
          tokensOutput: result.tokensOutput,
          latencyMs: result.latencyMs,
          taskType: "STRUCTURED",
        });

        return {
          task: payload.task ?? "STRUCTURED",
          provider: config.provider,
          model: config.modelName,
          data,
          tokensInput: result.tokensInput,
          tokensOutput: result.tokensOutput,
          latencyMs: result.latencyMs,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Provider failed.";
        errors.push(`${config.provider}: ${message}`);
        this.logger.warn(`Structured output failed for ${config.provider}`, message);
      }
    }

    throw aiProviderFailedError(
      errors.length ? errors.join(" | ") : "All AI providers failed to generate a response.",
    );
  }

  async runEmbedding(payloadInput: Record<string, unknown>, tenantId: string) {
    const payload = validateEmbedding(payloadInput);
    const configs = await this.resolveProviderConfigs(tenantId, payload.model);
    const errors: string[] = [];

    for (const config of configs) {
      try {
        const adapter = this.providerRegistry.getProvider(config.provider);
        const result = await adapter.embedText({
          model: config.modelName,
          text: payload.text,
          apiKey: config.apiKey,
          baseUrl: config.baseUrl ?? undefined,
        });

        await this.inferenceLoggerService.logInference({
          tenantId,
          provider: config.provider,
          modelName: config.modelName,
          prompt: payload.text,
          response: JSON.stringify(result.embedding),
          tokensInput: result.tokensInput,
          tokensOutput: 0,
          latencyMs: result.latencyMs,
          taskType: "EMBED",
        });

        return {
          provider: config.provider,
          model: config.modelName,
          embedding: result.embedding,
          dimensions: result.embedding.length,
          tokensInput: result.tokensInput,
          latencyMs: result.latencyMs,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : "Provider failed.";
        errors.push(`${config.provider}: ${message}`);
        this.logger.warn(`Embedding failed for ${config.provider}`, message);
      }
    }

    throw aiProviderFailedError(
      errors.length ? errors.join(" | ") : "All AI providers failed to generate a response.",
    );
  }

  private resolvePrompt(payload: {
    prompt: string;
    template?: string;
    variables?: Record<string, string>;
  }) {
    if (payload.template) {
      return this.promptTemplateService.renderTemplate(payload.template, {
        prompt: payload.prompt,
        ...(payload.variables ?? {}),
      });
    }

    if (payload.variables && Object.keys(payload.variables).length > 0) {
      return this.promptTemplateService.renderTemplate(payload.prompt, payload.variables);
    }

    return payload.prompt;
  }

  private async resolveProviderConfigs(tenantId: string, modelOverride?: string) {
    const configs = await this.providerConfigRepository.listActiveByTenant(tenantId);

    if (configs.length) {
      return configs.map((config) => ({
        provider: config.provider,
        modelName: modelOverride ?? config.modelName,
        apiKey: decryptApiKey(config.apiKey),
        baseUrl: config.baseUrl,
      }));
    }

    const defaults = resolveAiConfig();
    return [
      {
        provider: defaults.defaultProvider as AIProviderType,
        modelName: modelOverride ?? defaults.defaultModel,
        apiKey: undefined,
        baseUrl: null,
      },
    ];
  }

}
