import { waitForGateway } from "./utils/stack";

export default async function globalSetup(): Promise<void> {
  process.env.NODE_ENV = process.env.NODE_ENV ?? "test";
  await waitForGateway();
}
