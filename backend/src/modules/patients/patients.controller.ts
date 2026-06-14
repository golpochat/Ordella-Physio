import type { Request, Response } from "express";
import {
  createPatient,
  deletePatient,
  getPatient,
  getPatientProfile,
  listPatients,
  updatePatient,
} from "./patients.service";
import type { ListPatientsQuery, PatientProfileQuery } from "./patients.validation";

export const patientsController = {
  list: async (req: Request, res: Response) => {
    const result = await listPatients(req.tenantId!, req.query as unknown as ListPatientsQuery);
    res.json({ data: result });
  },

  getById: async (req: Request, res: Response) => {
    const patient = await getPatient(req.tenantId!, String(req.params.id));
    res.json({ data: patient });
  },

  getProfile: async (req: Request, res: Response) => {
    const profile = await getPatientProfile(
      req.tenantId!,
      String(req.params.id),
      req.query as unknown as PatientProfileQuery,
    );
    res.json({ data: profile });
  },

  create: async (req: Request, res: Response) => {
    const patient = await createPatient(req.tenantId!, req.user!.id, req.body);
    res.status(201).json({ data: patient });
  },

  update: async (req: Request, res: Response) => {
    const patient = await updatePatient(req.tenantId!, req.user!.id, String(req.params.id), req.body);
    res.json({ data: patient });
  },

  remove: async (req: Request, res: Response) => {
    const patient = await deletePatient(req.tenantId!, req.user!.id, String(req.params.id));
    res.json({ data: patient });
  },
};
