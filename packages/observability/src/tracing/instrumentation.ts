export type AutoInstrumentationHooks = {
  http?: boolean;
  nestjs?: boolean;
  prisma?: boolean;
};

export type AutoInstrumentationOptions = {
  hooks?: AutoInstrumentationHooks;
  serviceName?: string;
};

export function registerAutoInstrumentation(options: AutoInstrumentationOptions = {}): void {
  const hooks = options.hooks ?? { http: true, nestjs: true, prisma: false };

  if (hooks.http) {
    registerHttpInstrumentation(options.serviceName);
  }

  if (hooks.nestjs) {
    registerNestJsInstrumentation(options.serviceName);
  }

  if (hooks.prisma) {
    registerPrismaInstrumentation(options.serviceName);
  }
}

export function registerHttpInstrumentation(_serviceName?: string): void {
  // Placeholder: wire @opentelemetry/instrumentation-http in service bootstrap.
}

export function registerNestJsInstrumentation(_serviceName?: string): void {
  // Placeholder: wire @opentelemetry/instrumentation-nestjs-core in service bootstrap.
}

export function registerPrismaInstrumentation(_serviceName?: string): void {
  // Placeholder: wire @opentelemetry/instrumentation-prisma in service bootstrap.
}

export async function shutdownInstrumentation(): Promise<void> {
  // Placeholder: call sdk.shutdown() when NodeSDK is configured by the host service.
}
