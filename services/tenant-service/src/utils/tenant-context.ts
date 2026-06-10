import { AsyncLocalStorage } from "node:async_hooks";

export type TenantContextState = {
  tenantId: string;
  correlationId?: string;
  userId?: string;
  role?: string;
};

const tenantContextStorage = new AsyncLocalStorage<TenantContextState>();

export function runWithTenantContext<T>(state: TenantContextState, fn: () => T): T {
  return tenantContextStorage.run(state, fn);
}

export function getTenantContext(): TenantContextState | undefined {
  return tenantContextStorage.getStore();
}

export function requireTenantContext(): TenantContextState {
  const context = getTenantContext();

  if (!context?.tenantId) {
    throw new Error("Tenant context is required");
  }

  return context;
}

export function getCurrentTenantId(): string | undefined {
  return getTenantContext()?.tenantId;
}
