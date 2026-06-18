import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { AuditLogClient } from "@/integrations/audit-log.client";
import { StaffServiceClient } from "@/integrations/staff-service.client";
import {
  FulfillmentRepository,
  PharmacyAuditRepository,
  PrescriptionsRepository,
} from "@/repositories/pharmacy.repository";
import type { AuthenticatedPharmacyUser } from "@/utils/pharmacy-helpers";
import { rbacService } from "@ordella/security";

type FulfillmentActionPayload = {
  filledBy?: string;
  notes?: string;
};

@Injectable()
export class FulfillmentService {
  constructor(
    private readonly prescriptionsRepository: PrescriptionsRepository,
    private readonly fulfillmentRepository: FulfillmentRepository,
    private readonly auditRepository: PharmacyAuditRepository,
    private readonly auditClient: AuditLogClient,
    private readonly staffClient: StaffServiceClient,
  ) {}

  async start(
    tenantId: string,
    prescriptionId: string,
    user: AuthenticatedPharmacyUser,
    payload: FulfillmentActionPayload = {},
  ) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "fulfillment.start");

    const prescription = await this.requireIssuedPrescription(tenantId, prescriptionId);
    const fulfillment = prescription.fulfillment;
    if (!fulfillment || fulfillment.status !== "PENDING") {
      throw new BadRequestException("Fulfillment cannot be started");
    }

    await this.fulfillmentRepository.updateByPrescriptionId(prescriptionId, {
      status: "IN_PROGRESS",
      notes: payload.notes ?? fulfillment.notes ?? undefined,
    });

    await this.recordAudit(tenantId, prescriptionId, user, "fulfill.start", payload);
    return this.prescriptionsRepository.findByIdOrThrow(tenantId, prescriptionId);
  }

  async complete(
    tenantId: string,
    prescriptionId: string,
    user: AuthenticatedPharmacyUser,
    payload: FulfillmentActionPayload = {},
  ) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "fulfillment.complete");

    const prescription = await this.requireIssuedPrescription(tenantId, prescriptionId);
    const fulfillment = prescription.fulfillment;
    if (!fulfillment || fulfillment.status !== "IN_PROGRESS") {
      throw new BadRequestException("Fulfillment is not in progress");
    }

    const filledBy = payload.filledBy ?? user.userId;
    const staffOk = await this.staffClient.validateStaff(tenantId, filledBy);
    if (!staffOk) {
      throw new BadRequestException("Invalid filledBy staffId");
    }

    await this.fulfillmentRepository.updateByPrescriptionId(prescriptionId, {
      status: "COMPLETED",
      filledBy,
      filledAt: new Date(),
      notes: payload.notes ?? fulfillment.notes ?? undefined,
    });
    await this.prescriptionsRepository.update(tenantId, prescriptionId, { status: "DISPENSED" });

    await this.recordAudit(tenantId, prescriptionId, user, "fulfill.complete", {
      ...payload,
      filledBy,
    });
    return this.prescriptionsRepository.findByIdOrThrow(tenantId, prescriptionId);
  }

  async fail(
    tenantId: string,
    prescriptionId: string,
    user: AuthenticatedPharmacyUser,
    payload: FulfillmentActionPayload = {},
  ) {
    this.assertTenant(tenantId, user);
    this.assertPermission(user, "fulfillment.fail");

    const prescription = await this.requireIssuedPrescription(tenantId, prescriptionId);
    const fulfillment = prescription.fulfillment;
    if (!fulfillment || (fulfillment.status !== "PENDING" && fulfillment.status !== "IN_PROGRESS")) {
      throw new BadRequestException("Fulfillment cannot be failed");
    }

    await this.fulfillmentRepository.updateByPrescriptionId(prescriptionId, {
      status: "FAILED",
      notes: payload.notes ?? fulfillment.notes ?? undefined,
    });

    await this.recordAudit(tenantId, prescriptionId, user, "fulfill.fail", payload);
    return this.prescriptionsRepository.findByIdOrThrow(tenantId, prescriptionId);
  }

  private async requireIssuedPrescription(tenantId: string, prescriptionId: string) {
    const prescription = await this.prescriptionsRepository.findById(tenantId, prescriptionId);
    if (!prescription) {
      throw new NotFoundException("Prescription not found");
    }
    if (prescription.status === "DRAFT" || prescription.status === "CANCELLED") {
      throw new BadRequestException("Prescription must be issued before fulfillment");
    }
    return prescription;
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
