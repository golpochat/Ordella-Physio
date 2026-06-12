import { aiServiceConfig } from "@ordella/config";

export function resolveAiConfig() {
  return {
    defaultProvider: aiServiceConfig.defaultProvider,
    defaultModel: aiServiceConfig.defaultModel,
    encryptionKey: aiServiceConfig.encryptionKey,
  };
}
