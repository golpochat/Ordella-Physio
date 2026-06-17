import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import type { PrescriptionStatus } from "@/generated/prisma";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { PatientServiceClient } from "@/integrations/patient-service.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import {
  FulfillmentRepository,
  PharmacyAuditRepository,
  PrescriptionsRepository,
  type CreatePrescriptionInput,
  type UpdatePrescriptionInput,
} from "@/repositories/pharmacy.repository";
import type { AuthenticatedPharmacyUser } from "@/utils/pharmacy-helpers";
import { rbacService } from "@ordella/security";

@Injectable()
export class PrescriptionsService {
  constructor(
    private readonly prescriptionsRepository: PrescriptionsRepository,
    private readonly auditRepository: PharmacyAuditRepository,
    private readonly auditClient: AuditLogClient,
    private readonly patientClient: PatientServiceClient,
    private readonly staffClient: StaffServiceClient,
  ) {}

  async create(
    tenantId: string,
    payload: CreatePrescriptionInput,
    user: AuthenticatedPharmacyUser,
  ) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "prescriptions.create");

    await this.validateReferences(tenantId, payload.patientId, payload.therapistId);

    const prescription = await this.prescriptionsRepository.create({
      ...payload,
      tenantId,
    });

    await this.recordAudit(tenantId, prescription.id, user, "create", payload);
    return prescription;
  }

  async list(
    tenantId: string,
    user: AuthenticatedPharmacyUser,
    filters: { patientId?: string; status?: PrescriptionStatus },
  ) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "prescriptions.read");
    return this.prescriptionsRepository.list(tenantId, filters);
  }

  async getById(tenantId: string, id: string, user: AuthenticatedPharmacyUser) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "prescriptions.read");

    const prescription = await this.prescriptionsRepository.findById(tenantId, id);
    if (!prescription) {
      throw new NotFoundException("Prescription not found");
    }
    return prescription;
  }

  async update(
    tenantId: string,
    id: string,
    payload: UpdatePrescriptionInput,
    user: AuthenticatedPharmacyUser,
  ) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "prescriptions.create");

    const existing = await this.prescriptionsRepository.findById(tenantId, id);
    if (!existing) {
      throw new NotFoundException("Prescription not found");
    }
    if (existing.status !== "DRAFT") {
      throw new BadRequestException("Only draft prescriptions can be updated");
    }

    await this.prescriptionsRepository.update(tenantId, id, payload);
    await this.recordAudit(tenantId, id, user, "update", payload);
    return this.prescriptionsRepository.findByIdOrThrow(tenantId, id);
  }

  async issue(tenantId: string, id: string, user: AuthenticatedPharmacyUser) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "prescriptions.issue");

    const existing = await this.prescriptionsRepository.findById(tenantId, id);
    if (!existing) {
      throw new NotFoundException("Prescription not found");
    }
    if (existing.status !== "DRAFT") {
      throw new BadRequestException("Only draft prescriptions can be issued");
    }

    await this.prescriptionsRepository.update(tenantId, id, { status: "ISSUED" });
    await this.recordAudit(tenantId, id, user, "issue", { status: "ISSUED" });
    return this.prescriptionsRepository.findByIdOrThrow(tenantId, id);
  }

  async cancel(tenantId: string, id: string, user: AuthenticatedPharmacyUser) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "prescriptions.issue");

    const existing = await this.prescriptionsRepository.findById(tenantId, id);
    if (!existing) {
      throw new NotFoundException("Prescription not found");
    }
    if (existing.status === "DISPENSED" || existing.status === "CANCELLED") {
      throw new BadRequestException("Prescription cannot be cancelled");
    }

    await this.prescriptionsRepository.update(tenantId, id, { status: "CANCELLED" });
    await this.recordAudit(tenantId, id, user, "cancel", { status: "CANCELLED" });
    return this.prescriptionsRepository.findByIdOrThrow(tenantId, id);
  }

  async getAuditLogs(tenantId: string, id: string, user: AuthenticatedPharmacyUser) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "prescriptions.read");

    const existing = await this.prescriptionsRepository.findById(tenantId, id);
    if (!existing) {
      throw new NotFoundException("Prescription not found");
    }

    return this.auditRepository.listByPrescription(tenantId, id);
  }

  private async validateReferences(tenantId: string, patientId: string, therapistId: string) {
    const [patientOk, therapistOk] = await Promise.all([
      this.patientClient.validatePatient(tenantId, patientId),
      this.staffClient.validateTherapist(tenantId, therapistId),
    ]);

    if (!patientOk) {
      throw new BadRequestException("Invalid patientId");
    }
    if (!therapistOk) {
      throw new BadRequestException("Invalid therapistId");
    }
  }

  private assertTenant(tenantId: string, user: AuthenticatedPharmacyUser) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("Tenant context is required");
    }
    if (!rbacService.enforceTenantIsolation(user, tenantId)) {
      throw new ForbiddenException("Cross-tenant access is not allowed");
    }
  }

  private assertPermission(user: AuthenticatedPharmacyUser, permission: string) {
    if (!rbacService.hasPermission(user, permission)) {
      throw new ForbiddenException("Missing required permission");
    }
  }

  private async recordAudit(
    tenantId: string,
    prescriptionId: string,
    user: AuthenticatedPharmacyUser,
    action: string,
    payload: Record<string, unknown>,
  ) {
    await this.auditRepository.create({
      tenantId,
      prescriptionId,
      actorId: user.userId,
      action,
      payload,
    });

    await this.auditClient.logAction({
      tenantId,
      actorUserId: user.userId,
      actorRole: user.role,
      entityType: "prescription",
      entityId: prescriptionId,
      action: `pharmacy.${action}`,
      metadata: payload,
    });
  }
}
