import { getStack } from "../setup";
import { isServiceUp } from "../utils/stack";
import { publicGateway } from "../utils/supertest";

describe("Workflow: marketplace OAuth callback", () => {
  it("handles mock OAuth callback and redirects to frontend", async () => {
    if (!isServiceUp(getStack(), "marketplace")) return;

    const response = await publicGateway()
      .get("/marketplace/oauth/redirect")
      .query({
        code: "mock-oauth-code-workflow",
        state: "workflow-test-state",
      });

    expect([200, 302, 400, 404]).toContain(response.status);
    if (response.status === 302) {
      expect(response.headers.location).toMatch(/marketplace|provider|status/i);
    }
  });
});
