import type { NextFunction, Request, Response } from "express";
import { HttpError, isHttpError } from "@ordella/errors";
import type { CreateOrganizationPayload, UpdateOrganizationPayload } from "@/models/Organization";
import {
  organizationForbiddenError,
  organizationStatusForbiddenError,
  organizationTenantForbiddenError,
  organizationUpdateForbiddenError,
} from "@/utils/organization-errors";
import { resolveRequestUser } from "@/middleware/request-user";
import { hasOrganizationManageAccess } from "@/middleware/permission.middleware";

type OrganizationServiceLike = {
  createOrganization: (
    payload: CreateOrganizationPayload,
    user?: ReturnType<typeof resolveRequestUser>,
  ) => Promise<unknown>;
  listOrganizations: (query: unknown) => Promise<unknown>;
  getOrganization: (id: string) => Promise<unknown>;
  updateOrganization: (
    id: string,
    payload: UpdateOrganizationPayload,
    user?: ReturnType<typeof resolveRequestUser>,
  ) => Promise<unknown>;
  deactivateOrganization: (
    id: string,
    user?: ReturnType<typeof resolveRequestUser>,
  ) => Promise<unknown>;
  activateOrganization: (
    id: string,
    user?: ReturnType<typeof resolveRequestUser>,
  ) => Promise<unknown>;
  listOrganizationTenants: (orgId: string) => Promise<unknown>;
  listUnassignedOrganizationTenants: (orgId: string) => Promise<unknown>;
  assignTenantToOrganization: (
    orgId: string,
    tenantId: string,
    user?: ReturnType<typeof resolveRequestUser>,
  ) => Promise<unknown>;
  removeTenantFromOrganization: (
    orgId: string,
    tenantId: string,
    user?: ReturnType<typeof resolveRequestUser>,
  ) => Promise<unknown>;
};

let organizationServiceRef: OrganizationServiceLike | null = null;

export function bindOrganizationService(service: OrganizationServiceLike): void {
  organizationServiceRef = service;
}

function getOrganizationService(): OrganizationServiceLike {
  if (!organizationServiceRef) {
    throw new Error("Organization service has not been initialized.");
  }

  return organizationServiceRef;
}

function sendError(response: Response, error: HttpError): void {
  response.status(error.statusCode).json(error.serialize());
}

function handleRouteError(error: unknown, response: Response, next: NextFunction): void {
  if (isHttpError(error)) {
    sendError(response, error);
    return;
  }

  next(error);
}

function assertOrganizationManageAccess(request: Request, response: Response): boolean {
  const authRequest = request as Parameters<typeof resolveRequestUser>[0];
  const user = resolveRequestUser(authRequest);

  if (!user) {
    sendError(
      response,
      new HttpError({
        statusCode: 401,
        code: "AUTH_UNAUTHORIZED",
        message: "Authentication required.",
      }),
    );
    return false;
  }

  if (!hasOrganizationManageAccess(user)) {
    sendError(response, organizationForbiddenError());
    return false;
  }

  return true;
}

function assertOrganizationStatusAccess(request: Request, response: Response): boolean {
  const authRequest = request as Parameters<typeof resolveRequestUser>[0];
  const user = resolveRequestUser(authRequest);

  if (!user) {
    sendError(
      response,
      new HttpError({
        statusCode: 401,
        code: "AUTH_UNAUTHORIZED",
        message: "Authentication required.",
      }),
    );
    return false;
  }

  if (!hasOrganizationManageAccess(user)) {
    sendError(response, organizationStatusForbiddenError());
    return false;
  }

  return true;
}

function assertOrganizationTenantAccess(request: Request, response: Response): boolean {
  const authRequest = request as Parameters<typeof resolveRequestUser>[0];
  const user = resolveRequestUser(authRequest);

  if (!user) {
    sendError(
      response,
      new HttpError({
        statusCode: 401,
        code: "AUTH_UNAUTHORIZED",
        message: "Authentication required.",
      }),
    );
    return false;
  }

  if (!hasOrganizationManageAccess(user)) {
    sendError(response, organizationTenantForbiddenError());
    return false;
  }

  return true;
}

function assertOrganizationUpdateAccess(request: Request, response: Response): boolean {
  const authRequest = request as Parameters<typeof resolveRequestUser>[0];
  const user = resolveRequestUser(authRequest);

  if (!user) {
    sendError(
      response,
      new HttpError({
        statusCode: 401,
        code: "AUTH_UNAUTHORIZED",
        message: "Authentication required.",
      }),
    );
    return false;
  }

  if (!hasOrganizationManageAccess(user)) {
    sendError(response, organizationUpdateForbiddenError());
    return false;
  }

  return true;
}

export async function createOrganizationHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationManageAccess(request, response)) {
      return;
    }

    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);
    const result = await getOrganizationService().createOrganization(
      request.body as CreateOrganizationPayload,
      user ?? undefined,
    );

    response.status(201).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function listOrganizationsHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationManageAccess(request, response)) {
      return;
    }

    const result = await getOrganizationService().listOrganizations(request.query);
    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function getOrganizationHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationManageAccess(request, response)) {
      return;
    }

    const id = String(request.params.id);
    const organization = await getOrganizationService().getOrganization(id);
    if (!organization) {
      sendError(
        response,
        new HttpError({
          statusCode: 404,
          code: "ORG_NOT_FOUND",
          message: "Organization does not exist.",
        }),
      );
      return;
    }

    response.status(200).json(organization);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function updateOrganizationHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationUpdateAccess(request, response)) {
      return;
    }

    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);
    const id = String(request.params.id);
    const result = await getOrganizationService().updateOrganization(
      id,
      request.body as UpdateOrganizationPayload,
      user ?? undefined,
    );

    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function deactivateOrganizationHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationStatusAccess(request, response)) {
      return;
    }

    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);
    const id = String(request.params.id);
    const result = await getOrganizationService().deactivateOrganization(id, user ?? undefined);

    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function activateOrganizationHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationStatusAccess(request, response)) {
      return;
    }

    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);
    const id = String(request.params.id);
    const result = await getOrganizationService().activateOrganization(id, user ?? undefined);

    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function listOrganizationTenantsHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationManageAccess(request, response)) {
      return;
    }

    const orgId = String(request.params.orgId);
    const result = await getOrganizationService().listOrganizationTenants(orgId);
    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function listUnassignedOrganizationTenantsHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationManageAccess(request, response)) {
      return;
    }

    const orgId = String(request.params.orgId);
    const result = await getOrganizationService().listUnassignedOrganizationTenants(orgId);
    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function assignTenantToOrganizationHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationTenantAccess(request, response)) {
      return;
    }

    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);
    const orgId = String(request.params.orgId);
    const tenantId = String(request.params.tenantId);
    const result = await getOrganizationService().assignTenantToOrganization(
      orgId,
      tenantId,
      user ?? undefined,
    );

    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function removeTenantFromOrganizationHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationTenantAccess(request, response)) {
      return;
    }

    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);
    const orgId = String(request.params.orgId);
    const tenantId = String(request.params.tenantId);
    const result = await getOrganizationService().removeTenantFromOrganization(
      orgId,
      tenantId,
      user ?? undefined,
    );

    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}
