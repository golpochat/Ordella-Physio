import type { Request, Response } from "express";
import {
  assignStaffRoles,
  createStaffMember,
  deleteStaffMember,
  getActorFromRequest,
  getMyStaffProfile,
  getStaffMember,
  getStaffPermissions,
  listStaff,
  updateStaffMember,
} from "./staff.service";
import type {
  AdminUpdateStaffBody,
  AssignStaffRolesBody,
  CreateStaffBody,
  ListStaffQuery,
} from "./staff.validation";

export const staffController = {
  list: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const result = await listStaff(req.tenantId!, actor, req.query as unknown as ListStaffQuery);
    res.json({ data: result });
  },

  getMe: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const profile = await getMyStaffProfile(req.tenantId!, actor);
    res.json({ data: profile });
  },

  getById: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const profile = await getStaffMember(req.tenantId!, actor, String(req.params.id));
    res.json({ data: profile });
  },

  getPermissions: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const permissions = await getStaffPermissions(req.tenantId!, actor, String(req.params.id));
    res.json({ data: permissions });
  },

  create: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const profile = await createStaffMember(
      req.tenantId!,
      actor,
      req.user!.id,
      req.body as CreateStaffBody,
    );
    res.status(201).json({ data: profile });
  },

  update: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const profile = await updateStaffMember(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      req.body as AdminUpdateStaffBody,
    );
    res.json({ data: profile });
  },

  remove: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const profile = await deleteStaffMember(req.tenantId!, actor, req.user!.id, String(req.params.id));
    res.json({ data: profile });
  },

  assignRoles: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const result = await assignStaffRoles(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      (req.body as AssignStaffRolesBody).roleNames,
    );
    res.json({ data: result });
  },
};
