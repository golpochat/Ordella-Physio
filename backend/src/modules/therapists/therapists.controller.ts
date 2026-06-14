import type { Request, Response } from "express";
import { getActorFromRequest } from "./therapists.access";
import {
  addBlockedSlot,
  createTherapist,
  deleteTherapist,
  getMyTherapistProfile,
  getSchedule,
  getTherapist,
  listServiceTypes,
  listTherapistAppointments,
  listTherapists,
  removeBlockedSlot,
  setServiceTypes,
  setWorkingHours,
  updateMyTherapistProfile,
  updateTherapistAsAdmin,
} from "./therapists.service";
import type {
  AdminUpdateTherapistBody,
  CreateTherapistBody,
  ListTherapistAppointmentsQuery,
  ListTherapistsQuery,
  SelfUpdateTherapistBody,
} from "./therapists.validation";

export const therapistsController = {
  list: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const result = await listTherapists(req.tenantId!, actor, req.query as unknown as ListTherapistsQuery);
    res.json({ data: result });
  },

  getMe: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const therapist = await getMyTherapistProfile(req.tenantId!, actor);
    res.json({ data: therapist });
  },

  updateMe: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const therapist = await updateMyTherapistProfile(
      req.tenantId!,
      actor,
      req.body as SelfUpdateTherapistBody,
    );
    res.json({ data: therapist });
  },

  getById: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const therapist = await getTherapist(req.tenantId!, actor, String(req.params.id));
    res.json({ data: therapist });
  },

  create: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const therapist = await createTherapist(
      req.tenantId!,
      actor,
      req.user!.id,
      req.body as CreateTherapistBody,
    );
    res.status(201).json({ data: therapist });
  },

  update: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const therapist = await updateTherapistAsAdmin(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      req.body as AdminUpdateTherapistBody,
    );
    res.json({ data: therapist });
  },

  remove: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const therapist = await deleteTherapist(req.tenantId!, actor, req.user!.id, String(req.params.id));
    res.json({ data: therapist });
  },

  getSchedule: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const schedule = await getSchedule(req.tenantId!, actor, String(req.params.id));
    res.json({ data: schedule });
  },

  setWorkingHours: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const workingHours = await setWorkingHours(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      req.body.blocks,
    );
    res.json({ data: workingHours });
  },

  addBlockedSlot: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const slot = await addBlockedSlot(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      req.body,
    );
    res.status(201).json({ data: slot });
  },

  removeBlockedSlot: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const slot = await removeBlockedSlot(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      String(req.params.blockId),
    );
    res.json({ data: slot });
  },

  listServiceTypes: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const types = await listServiceTypes(req.tenantId!, actor, String(req.params.id));
    res.json({ data: types });
  },

  setServiceTypes: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const types = await setServiceTypes(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      req.body.serviceTypes,
    );
    res.json({ data: types });
  },

  listAppointments: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const result = await listTherapistAppointments(
      req.tenantId!,
      actor,
      String(req.params.id),
      req.query as unknown as ListTherapistAppointmentsQuery,
    );
    res.json({ data: result });
  },
};
