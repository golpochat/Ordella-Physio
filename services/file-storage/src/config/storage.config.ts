import { join } from "path";
import type { StorageProvider } from "@/generated/prisma";

export type StorageProviderName = StorageProvider;

export type LocalProviderConfig = {
  basePath: string;
};

export type S3ProviderConfig = {
  bucket: string;
  region: string;
  accessKeyId?: string;
  secretAccessKey?: string;
};

export type GcsProviderConfig = {
  bucket: string;
  projectId?: string;
};

export type AzureProviderConfig = {
  container: string;
  accountName?: string;
};

export type CdnConfig = {
  enabled: boolean;
  baseUrl: string;
  signUrls: boolean;
};

export type StorageConfig = {
  defaultProvider: StorageProviderName;
  failoverProviders: StorageProviderName[];
  providerConfigs: {
    LOCAL: LocalProviderConfig;
    S3: S3ProviderConfig;
    GCS: GcsProviderConfig;
    AZURE: AzureProviderConfig;
  };
  cdn: CdnConfig;
  publicBaseUrl: string;
  signedUrlTtlSeconds: number;
  maxFileBytes: number;
};

function readProvider(value: string | undefined): StorageProviderName {
  const normalized = (value ?? "LOCAL").toUpperCase();
  if (normalized === "S3" || normalized === "GCS" || normalized === "AZURE" || normalized === "LOCAL") {
    return normalized;
  }

  return "LOCAL";
}

function readFailoverProviders(
  defaultProvider: StorageProviderName,
  raw: string | undefined,
): StorageProviderName[] {
  const source = raw?.trim();
  if (!source) {
    return [defaultProvider, "GCS", "LOCAL"].filter(
      (provider, index, list) => list.indexOf(provider) === index,
    ) as StorageProviderName[];
  }

  const providers = source
    .split(",")
    .map((entry) => readProvider(entry.trim()))
    .filter((provider, index, list) => list.indexOf(provider) === index);

  if (!providers.includes("LOCAL")) {
    providers.push("LOCAL");
  }

  return providers;
}

function readBoolean(value: string | undefined, fallback = false): boolean {
  if (value === undefined) {
    return fallback;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

export function loadStorageConfig(): StorageConfig {
  const defaultProvider = readProvider(process.env.STORAGE_DEFAULT_PROVIDER);

  return {
    defaultProvider,
    failoverProviders: readFailoverProviders(
      defaultProvider,
      process.env.STORAGE_FAILOVER_PROVIDERS,
    ),
    providerConfigs: {
      LOCAL: {
        basePath:
          process.env.STORAGE_LOCAL_BASE_PATH ??
          join(process.cwd(), "uploads", "files"),
      },
      S3: {
        bucket: process.env.STORAGE_S3_BUCKET ?? "",
        region: process.env.STORAGE_S3_REGION ?? "",
        accessKeyId: process.env.STORAGE_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.STORAGE_S3_SECRET_ACCESS_KEY,
      },
      GCS: {
        bucket: process.env.STORAGE_GCS_BUCKET ?? "",
        projectId: process.env.STORAGE_GCS_PROJECT_ID,
      },
      AZURE: {
        container: process.env.STORAGE_AZURE_CONTAINER ?? "",
        accountName: process.env.STORAGE_AZURE_ACCOUNT_NAME,
      },
    },
    cdn: {
      enabled: readBoolean(process.env.CDN_ENABLED),
      baseUrl: (process.env.CDN_BASE_URL ?? "https://cdn.sheba360.com").replace(/\/$/, ""),
      signUrls: readBoolean(process.env.CDN_SIGN_URLS),
    },
    publicBaseUrl: (process.env.FILE_STORAGE_PUBLIC_BASE_URL ?? "http://localhost:3049/files").replace(
      /\/$/,
      "",
    ),
    signedUrlTtlSeconds: Number(process.env.FILE_STORAGE_SIGNED_URL_TTL_SECONDS ?? "300"),
    maxFileBytes: Number(process.env.FILE_STORAGE_MAX_BYTES ?? String(20 * 1024 * 1024)),
  };
}
