import type { Request, Response } from "express";
import { getActorFromRequest } from "./appointments.access";
import {
  checkAvailability,
  createAppointment,
  deleteAppointment,
  getAppointment,
  listAppointments,
  transitionAppointmentStatus,
  updateAppointment,
  completeAppointment,
  cancelAppointment,
} from "./appointments.service";
import type {
  AvailabilityCheckQuery,
  CreateAppointmentBody,
  ListAppointmentsQuery,
  TransitionStatusBody,
  UpdateAppointmentBody,
} from "./appointments.validation";

export const appointmentsController = {
  list: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const result = await listAppointments(req.tenantId!, actor, req.query as unknown as ListAppointmentsQuery);
    res.json({ data: result });
  },

  getById: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const appointment = await getAppointment(req.tenantId!, actor, String(req.params.id));
    res.json({ data: appointment });
  },

  checkAvailability: async (req: Request, res: Response) => {
    const query = req.query as unknown as AvailabilityCheckQuery;
    const result = await checkAvailability(req.tenantId!, query);
    res.json({ data: result });
  },

  create: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const appointment = await createAppointment(
      req.tenantId!,
      actor,
      req.user!.id,
      req.body as CreateAppointmentBody,
    );
    res.status(201).json({ data: appointment });
  },

  update: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const appointment = await updateAppointment(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      req.body as UpdateAppointmentBody,
    );
    res.json({ data: appointment });
  },

  transitionStatus: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const body = req.body as TransitionStatusBody;
    const appointment = await transitionAppointmentStatus(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      body.status,
      body.cancellationReason,
    );
    res.json({ data: appointment });
  },

  complete: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const appointment = await completeAppointment(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
    );
    res.json({ data: appointment });
  },

  cancel: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const appointment = await cancelAppointment(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      req.body?.cancellationReason,
    );
    res.json({ data: appointment });
  },

  remove: async (req: Request, res: Response) => {
    const actor = getActorFromRequest(req);
    const result = await deleteAppointment(
      req.tenantId!,
      actor,
      req.user!.id,
      String(req.params.id),
      req.body?.cancellationReason,
    );
    res.json({ data: result });
  },
};
