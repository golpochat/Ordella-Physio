import type { Request } from "express";
import { prisma } from "../../lib/prisma";
import type { Prisma } from "@prisma/client";

export type AuditContext = {
  tenantId: string;
  userId: string;
  ipAddress?: string;
  userAgent?: string;
};

type AuditInput = {
  tenantId: string;
  userId?: string;
  action: string;
  entity?: string;
  entityId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Prisma.InputJsonValue;
};

export function auditContextFromRequest(req: Request): AuditContext {
  return {
    tenantId: req.tenantId!,
    userId: req.user!.id,
    ipAddress: req.ip,
    userAgent: req.get("user-agent") ?? undefined,
  };
}

export async function writeAuditLog(input: AuditInput) {
  return prisma.auditLog.create({
    data: {
      tenantId: input.tenantId,
      userId: input.userId,
      action: input.action,
      entity: input.entity,
      entityId: input.entityId,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
      metadata: input.metadata,
    },
  });
}

export async function auditCreate(
  ctx: AuditContext,
  entity: string,
  entityId: string,
  metadata?: Prisma.InputJsonValue,
) {
  return writeAuditLog({
    ...ctx,
    action: `${entity.toLowerCase()}.created`,
    entity,
    entityId,
    metadata,
  });
}

export async function auditUpdate(
  ctx: AuditContext,
  entity: string,
  entityId: string,
  metadata?: Prisma.InputJsonValue,
) {
  return writeAuditLog({
    ...ctx,
    action: `${entity.toLowerCase()}.updated`,
    entity,
    entityId,
    metadata,
  });
}

export async function auditDelete(
  ctx: AuditContext,
  entity: string,
  entityId: string,
  metadata?: Prisma.InputJsonValue,
) {
  return writeAuditLog({
    ...ctx,
    action: `${entity.toLowerCase()}.deleted`,
    entity,
    entityId,
    metadata,
  });
}

export async function listAuditLogs(tenantId: string, limit = 50) {
  return prisma.auditLog.findMany({
    where: { tenantId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}
