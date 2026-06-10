import type { INestApplication } from "@nestjs/common";
import { createE2eClient, type E2eClient } from "./e2e-client";
import { createTestApp, type CreateTestAppOptions } from "../utils/test-app";

export type E2eServerContext = {
  app: INestApplication;
  client: E2eClient;
  teardown: () => Promise<void>;
};

export type StartE2eServerOptions = CreateTestAppOptions & {
  listen?: boolean;
  port?: number;
};

export async function startE2eServer(options: StartE2eServerOptions): Promise<E2eServerContext> {
  const testApp = await createTestApp(options);
  const httpServer = options.listen
    ? await testApp.app.listen(options.port ?? 0)
    : testApp.app.getHttpServer();

  const client = createE2eClient(httpServer);

  return {
    app: testApp.app,
    client,
    teardown: async () => {
      await testApp.close();
    },
  };
}

export async function stopE2eServer(context: E2eServerContext): Promise<void> {
  await context.teardown();
}
