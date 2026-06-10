import type { INestApplication, Type } from "@nestjs/common";
import type { TestingModule } from "@nestjs/testing";

export type AuthRequestContext = {
  tenantId: string;
  userId: string;
  role: string;
  accessToken?: string;
};

export type CreateTestAppOptions = {
  moduleBuilder: () => Promise<TestingModule>;
  globalPrefix?: string;
};

export type TestAppContext = {
  app: INestApplication;
  moduleRef: TestingModule;
  close: () => Promise<void>;
  getAuthHeaders: (auth?: Partial<AuthRequestContext>) => Record<string, string>;
};

export async function createTestApp(options: CreateTestAppOptions): Promise<TestAppContext> {
  const moduleRef = await options.moduleBuilder();
  const app = moduleRef.createNestApplication();

  if (options.globalPrefix) {
    app.setGlobalPrefix(options.globalPrefix);
  }

  await app.init();

  return {
    app,
    moduleRef,
    close: async () => {
      await app.close();
    },
    getAuthHeaders(auth = {}) {
      return {
        "x-tenant-id": auth.tenantId ?? "tenant-test",
        "x-user-id": auth.userId ?? "user-test",
        "x-user-role": auth.role ?? "STAFF",
        ...(auth.accessToken ? { authorization: `Bearer ${auth.accessToken}` } : {}),
      };
    },
  };
}

export function createMockProvider<T extends object>(
  token: Type<T> | string | symbol,
  implementation: Partial<T>,
) {
  return {
    provide: token,
    useValue: implementation,
  };
}
