import type { NextFunction, Request, Response } from "express";
import { HttpError, isHttpError } from "@ordella/errors";
import { organizationConfigForbiddenError } from "@/utils/organization-errors";
import { resolveRequestUser } from "@/middleware/request-user";
import { hasOrganizationManageAccess } from "@/middleware/permission.middleware";

type OrganizationConfigServiceLike = {
  listNamespaces: (orgId: string) => Promise<unknown>;
  getConfig: (orgId: string, namespace: string) => Promise<unknown>;
  updateConfig: (
    orgId: string,
    namespace: string,
    data: unknown,
    user?: ReturnType<typeof resolveRequestUser>,
  ) => Promise<unknown>;
};

let organizationConfigServiceRef: OrganizationConfigServiceLike | null = null;

export function bindOrganizationConfigService(service: OrganizationConfigServiceLike): void {
  organizationConfigServiceRef = service;
}

function getOrganizationConfigService(): OrganizationConfigServiceLike {
  if (!organizationConfigServiceRef) {
    throw new Error("Organization config service has not been initialized.");
  }

  return organizationConfigServiceRef;
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

function assertOrganizationConfigAccess(request: Request, response: Response): boolean {
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
    sendError(response, organizationConfigForbiddenError());
    return false;
  }

  return true;
}

export async function listOrganizationConfigNamespacesHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationConfigAccess(request, response)) {
      return;
    }

    const orgId = String(request.params.orgId);
    const result = await getOrganizationConfigService().listNamespaces(orgId);
    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function getOrganizationConfigHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationConfigAccess(request, response)) {
      return;
    }

    const orgId = String(request.params.orgId);
    const namespace = String(request.params.namespace);
    const result = await getOrganizationConfigService().getConfig(orgId, namespace);
    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}

export async function updateOrganizationConfigHandler(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!assertOrganizationConfigAccess(request, response)) {
      return;
    }

    const user = resolveRequestUser(request as Parameters<typeof resolveRequestUser>[0]);
    const orgId = String(request.params.orgId);
    const namespace = String(request.params.namespace);
    const body = request.body as { data?: unknown };
    const result = await getOrganizationConfigService().updateConfig(
      orgId,
      namespace,
      body?.data ?? body,
      user ?? undefined,
    );

    response.status(200).json(result);
  } catch (error) {
    handleRouteError(error, response, next);
  }
}
