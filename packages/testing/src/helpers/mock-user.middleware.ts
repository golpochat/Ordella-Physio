import type { INestApplication } from "@nestjs/common";

export type MockTestUser = {
  userId: string;
  tenantId: string;
  role: string;
  email?: string;
};

export const DEFAULT_TEST_USER: MockTestUser = {
  userId: "user-test-1",
  tenantId: "tenant-test-1",
  role: "OWNER",
  email: "owner@test.example",
};

export function attachMockUser(
  app: INestApplication,
  user: MockTestUser = DEFAULT_TEST_USER,
): void {
  const httpAdapter = app.getHttpAdapter().getInstance();
  httpAdapter.use((req: { user?: MockTestUser }, _res: unknown, next: () => void) => {
    req.user = user;
    next();
  });
}
