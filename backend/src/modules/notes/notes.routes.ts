import { Router } from "express";

import { asyncHandler } from "../../utils/async-handler";
import { withAudit } from "../../middleware/audit";
import { validateRequest } from "../../middleware/validate.middleware";
import { policies } from "../rbac/policies";
import { createNote, deleteNote, getNoteById, listAllNotes, listNotes, updateNote } from "./notes.service";
import {
  createNoteSchema,
  listNotesQuerySchema,
  noteIdParamSchema,
  patientNotesParamSchema,
  updateNoteSchema,
} from "./notes.validation";

export const notesRouter = Router();

notesRouter.get(
  "/",
  policies.notesRead,
  validateRequest(listNotesQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const result = await listAllNotes(req.tenantId!, req.query as never);
    res.json({ data: result });
  }),
);

notesRouter.get(
  "/patients/:patientId",
  policies.notesRead,
  validateRequest(patientNotesParamSchema, "params"),
  validateRequest(listNotesQuerySchema, "query"),
  asyncHandler(async (req, res) => {
    const result = await listNotes(req.tenantId!, String(req.params.patientId), req.query as never);
    res.json({ data: result });
  }),
);

notesRouter.get(
  "/:id",
  policies.notesRead,
  validateRequest(noteIdParamSchema, "params"),
  asyncHandler(async (req, res) => {
    const note = await getNoteById(req.tenantId!, String(req.params.id));
    res.json({ data: note });
  }),
);

notesRouter.post(
  "/",
  policies.notesWrite,
  validateRequest(createNoteSchema),
  withAudit("create", "note")(async (req, res) => {
    const note = await createNote(req.tenantId!, req.user!.id, req.body);
    res.status(201).json({ data: note });
  }),
);

notesRouter.patch(
  "/:id",
  policies.notesWrite,
  validateRequest(noteIdParamSchema, "params"),
  validateRequest(updateNoteSchema),
  withAudit("update", "note")(async (req, res) => {
    const note = await updateNote(req.tenantId!, String(req.params.id), req.body);
    res.json({ data: note });
  }),
);

notesRouter.delete(
  "/:id",
  policies.notesWrite,
  validateRequest(noteIdParamSchema, "params"),
  withAudit("delete", "note")(async (req, res) => {
    const result = await deleteNote(req.tenantId!, String(req.params.id));
    res.json({ data: result });
  }),
);
