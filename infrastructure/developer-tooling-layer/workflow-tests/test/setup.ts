import { buildWorkflowFixtures, type WorkflowFixtures } from "./fixtures";
import { closeDbConnections, probePostgres, probeRedis } from "./utils/db";
import { detectStack, type StackSnapshot } from "./utils/stack";

declare global {
  // eslint-disable-next-line no-var
  var __WORKFLOW_FIXTURES__: WorkflowFixtures | undefined;
  // eslint-disable-next-line no-var
  var __WORKFLOW_STACK__: StackSnapshot | undefined;
  // eslint-disable-next-line no-var
  var __WORKFLOW_INFRA__: { postgres: boolean; redis: boolean } | undefined;
}

beforeAll(async () => {
  global.__WORKFLOW_FIXTURES__ = await buildWorkflowFixtures();
  global.__WORKFLOW_STACK__ = await detectStack({
    authorization: `Bearer ${global.__WORKFLOW_FIXTURES__.tenantA.owner.accessToken}`,
    "x-tenant-id": global.__WORKFLOW_FIXTURES__.tenantA.tenantId,
  });
  global.__WORKFLOW_INFRA__ = {
    postgres: await probePostgres(),
    redis: await probeRedis(),
  };
}, 120_000);

afterAll(async () => {
  await closeDbConnections();
});

export function getFixtures(): WorkflowFixtures {
  if (!global.__WORKFLOW_FIXTURES__) {
    throw new Error("Workflow fixtures not initialized");
  }
  return global.__WORKFLOW_FIXTURES__;
}

export function getStack(): StackSnapshot {
  if (!global.__WORKFLOW_STACK__) {
    throw new Error("Workflow stack snapshot not initialized");
  }
  return global.__WORKFLOW_STACK__;
}

export function getInfra() {
  if (!global.__WORKFLOW_INFRA__) {
    throw new Error("Workflow infra snapshot not initialized");
  }
  return global.__WORKFLOW_INFRA__;
}
