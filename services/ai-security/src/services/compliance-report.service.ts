import { Injectable } from "@nestjs/common";
import { AuditLogService } from "@/services/audit-log.service";
import { AccessPolicyService } from "@/services/access-policy.service";
import { SecurityRepository } from "@/repositories/security.repository";

@Injectable()
export class ComplianceReportService {
  constructor(
    private readonly auditLogService: AuditLogService,
    private readonly accessPolicyService: AccessPolicyService,
    private readonly repository: SecurityRepository,
  ) {}

  async generateSoc2Report(tenantId: string) {
    const logs = await this.auditLogService.searchAuditLogs(tenantId, { limit: 1000 });
    return {
      framework: "SOC2",
      tenantId,
      generatedAt: new Date().toISOString(),
      controls: {
        CC6_1_logical_access: {
          status: "implemented",
          evidence: `Access policies: ${(await this.accessPolicyService.listPolicies(tenantId)).length}`,
        },
        CC7_2_system_monitoring: {
          status: "implemented",
          evidence: `Audit events logged: ${logs.length}`,
        },
        CC8_1_change_management: {
          status: "implemented",
          evidence: `Deployment/training events: ${logs.filter((l) => l.action === "DEPLOYMENT" || l.action === "TRAINING").length}`,
        },
      },
      auditEventCount: logs.length,
    };
  }

  async generateIso27001Report(tenantId: string) {
    const logs = await this.auditLogService.searchAuditLogs(tenantId, { limit: 1000 });
    const incidents = await this.repository.listPIIIncidents(tenantId);
    return {
      framework: "ISO27001",
      tenantId,
      generatedAt: new Date().toISOString(),
      annexA: {
        A_12_4_logging: { status: "implemented", auditEvents: logs.length },
        A_9_2_access_control: { status: "implemented", policies: (await this.accessPolicyService.listPolicies(tenantId)).length },
        A_18_1_pii_protection: { status: "implemented", openIncidents: incidents.filter((i) => !i.resolvedAt).length },
      },
    };
  }

  async generateAccessPolicyReport(tenantId: string) {
    const policies = await this.accessPolicyService.listPolicies(tenantId);
    return { tenantId, generatedAt: new Date().toISOString(), policies, total: policies.length };
  }

  async generatePIIIncidentReport(tenantId: string) {
    const incidents = (await this.repository.listPIIIncidents(tenantId)).map((row) => this.repository.mapIncident(row));
    return {
      tenantId,
      generatedAt: new Date().toISOString(),
      total: incidents.length,
      open: incidents.filter((i) => !i.resolvedAt).length,
      byType: incidents.reduce<Record<string, number>>((acc, i) => {
        acc[i.piiType] = (acc[i.piiType] ?? 0) + 1;
        return acc;
      }, {}),
      incidents,
    };
  }

  async generateModelUsageReport(tenantId: string) {
    const logs = await this.auditLogService.searchAuditLogs(tenantId, { action: "INFERENCE", limit: 2000 });
    const byModel = logs.reduce<Record<string, number>>((acc, log) => {
      const model = log.modelId ?? "unknown";
      acc[model] = (acc[model] ?? 0) + 1;
      return acc;
    }, {});
    return { tenantId, generatedAt: new Date().toISOString(), byModel, totalInferences: logs.length };
  }

  async generateFullComplianceExport(tenantId: string) {
    const [soc2, iso, access, pii, modelUsage, auditExport] = await Promise.all([
      this.generateSoc2Report(tenantId),
      this.generateIso27001Report(tenantId),
      this.generateAccessPolicyReport(tenantId),
      this.generatePIIIncidentReport(tenantId),
      this.generateModelUsageReport(tenantId),
      this.auditLogService.exportAuditLogs(tenantId),
    ]);
    return { tenantId, soc2, iso27001: iso, accessPolicies: access, piiIncidents: pii, modelUsage, auditLogs: auditExport };
  }
}
