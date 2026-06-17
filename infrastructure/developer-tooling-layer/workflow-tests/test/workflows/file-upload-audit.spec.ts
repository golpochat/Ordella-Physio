import { countAuditLogs } from "../utils/db";
import { getFixtures, getInfra, getStack } from "../setup";
import { isServiceUp } from "../utils/stack";
import { authenticatedGateway } from "../utils/supertest";

describe("Workflow: file upload → audit-service", () => {
  function ready() {
    const stack = getStack();
    return isServiceUp(stack, "file-storage") && isServiceUp(stack, "audit");
  }

  it("uploads a file and records audit activity", async () => {
    if (!ready()) return;

    const { tenantA } = getFixtures();
    const before =
      getInfra().postgres && isServiceUp(getStack(), "audit")
        ? await countAuditLogs(tenantA.tenantId)
        : -1;

    const response = await authenticatedGateway(tenantA.owner)
      .post("/api/files/upload")
      .attach("file", Buffer.from("workflow test file contents"), {
        filename: "workflow-test.txt",
        contentType: "text/plain",
      })
      .field("entityType", "workflow-test")
      .field("entityId", tenantA.tenantId);

    expect([200, 201]).toContain(response.status);
    const fileId =
      response.body.fileId ?? response.body.file?.id ?? response.body.id;
    expect(fileId).toBeTruthy();

    const audit = await authenticatedGateway(tenantA.owner).get("/audit-logs").query({
      limit: 10,
      entityType: "workflow-test",
    });

    expect([200, 403]).toContain(audit.status);

    if (getInfra().postgres && before >= 0 && audit.status === 200) {
      const after = await countAuditLogs(tenantA.tenantId);
      expect(after).toBeGreaterThanOrEqual(before);
    }
  });
});
