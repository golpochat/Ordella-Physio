import { PUBLIC_JWT_PATHS, PUBLIC_PATHS, SKIP_TENANT_PATHS } from "@/constants";

export function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0] ?? path;
  if (withoutQuery.length > 1 && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

export function matchesPathPrefix(path: string, prefixes: string[]): boolean {
  const normalized = normalizePath(path);
  return prefixes.some(
    (prefix) => normalized === prefix || normalized.startsWith(`${prefix}/`),
  );
}

export function isPublicPath(path: string): boolean {
  return matchesPathPrefix(path, PUBLIC_PATHS);
}

export function isPublicJwtPath(path: string): boolean {
  return matchesPathPrefix(path, PUBLIC_JWT_PATHS);
}

export function shouldSkipTenant(path: string): boolean {
  return matchesPathPrefix(path, SKIP_TENANT_PATHS);
}

export function buildUpstreamPath(basePath: string, suffix = ""): string {
  const normalizedBase = normalizePath(basePath);
  const normalizedSuffix = suffix ? normalizePath(suffix) : "";
  if (!normalizedSuffix || normalizedSuffix === "/") {
    return normalizedBase;
  }
  return `${normalizedBase}${normalizedSuffix.startsWith("/") ? normalizedSuffix : `/${normalizedSuffix}`}`;
}

export function getRequestPath(request: { originalUrl?: string; path: string }): string {
  return normalizePath(request.originalUrl ?? request.path);
}
