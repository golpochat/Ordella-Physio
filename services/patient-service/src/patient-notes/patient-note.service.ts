import { Injectable } from "@nestjs/common";
import type { Prisma } from "@/generated/prisma";
import { PatientsRepository } from "@/patients/patients.repository";
import { PatientNoteRepository } from "@/repositories/patient-note.repository";
import {
  toPatientNoteListResponse,
  toPatientNoteResponse,
} from "@/patient-notes/patient-note.mapper";
import type { AuthenticatedPatientUser } from "@/utils/patient-helpers";
import {
  patientNotFoundError,
  patientTenantMismatchError,
} from "@/utils/patient-errors";
import {
  invalidPatientNoteFilterError,
  invalidPatientNotePaginationError,
  patientNoteNotFoundError,
  patientNoteValidationError,
} from "@/utils/patient-note-errors";
import {
  parseListPatientNotesQuery,
  validateCreatePatientNote,
  validateUpdatePatientNote,
} from "@/validators/patient-note.validator";

@Injectable()
export class PatientNoteService {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly patientNoteRepository: PatientNoteRepository,
  ) {}

  async createNote(patientId: string, payload: unknown, createdByUser: AuthenticatedPatientUser) {
    const tenantId = createdByUser.tenantId?.trim();
    if (!tenantId) {
      throw patientTenantMismatchError();
    }

    await this.ensurePatientBelongsToTenant(patientId, tenantId);

    const validation = validateCreatePatientNote(payload);
    if (!validation.valid) {
      throw patientNoteValidationError(validation.fields);
    }

    const note = await this.patientNoteRepository.create({
      tenantId,
      staffId: createdByUser.userId,
      noteType: validation.payload.noteType,
      title: validation.payload.title,
      content: validation.payload.content,
      attachments: validation.payload.attachments as Prisma.InputJsonValue | undefined,
      patient: { connect: { id: patientId } },
    });

    return {
      note: toPatientNoteResponse(note),
      message: "Note saved successfully.",
    };
  }

  async updateNote(
    patientId: string,
    noteId: string,
    payload: unknown,
    updatedByUser: AuthenticatedPatientUser,
  ) {
    const tenantId = updatedByUser.tenantId?.trim();
    if (!tenantId) {
      throw patientTenantMismatchError();
    }

    await this.ensurePatientBelongsToTenant(patientId, tenantId);

    const existing = await this.patientNoteRepository.findByIdForPatient(noteId, patientId, tenantId);
    if (!existing) {
      throw patientNoteNotFoundError();
    }

    const validation = validateUpdatePatientNote(payload);
    if (!validation.valid) {
      throw patientNoteValidationError(validation.fields);
    }

    const data: Prisma.PatientNoteUpdateInput = {};
    if (validation.payload.noteType !== undefined) {
      data.noteType = validation.payload.noteType;
    }
    if (validation.payload.title !== undefined) {
      data.title = validation.payload.title;
    }
    if (validation.payload.content !== undefined) {
      data.content = validation.payload.content;
    }
    if (validation.payload.attachments !== undefined) {
      data.attachments = validation.payload.attachments as Prisma.InputJsonValue;
    }

    const updated = await this.patientNoteRepository.update(noteId, data);

    return {
      note: toPatientNoteResponse(updated),
      message: "Note saved successfully.",
    };
  }

  async listNotes(patientId: string, query: unknown, requestingUser: AuthenticatedPatientUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw patientTenantMismatchError();
    }

    await this.ensurePatientBelongsToTenant(patientId, tenantId);

    const parsed = parseListPatientNotesQuery(query);
    if (!parsed.valid) {
      if (parsed.error === "INVALID_PAGINATION") {
        throw invalidPatientNotePaginationError();
      }
      throw invalidPatientNoteFilterError();
    }

    const { page, limit, noteType, staffId, createdFrom, createdTo } = parsed.payload;
    const filter = {
      tenantId,
      patientId,
      noteType,
      staffId,
      createdFrom,
      createdTo,
    };

    const [notes, total] = await Promise.all([
      this.patientNoteRepository.findManyFiltered({
        ...filter,
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.patientNoteRepository.countFiltered(filter),
    ]);

    return {
      data: toPatientNoteListResponse(notes),
      pagination: {
        page,
        limit,
        total,
        totalPages: total > 0 ? Math.ceil(total / limit) : 0,
      },
    };
  }

  async getNote(patientId: string, noteId: string, requestingUser: AuthenticatedPatientUser) {
    const tenantId = requestingUser.tenantId?.trim();
    if (!tenantId) {
      throw patientTenantMismatchError();
    }

    await this.ensurePatientBelongsToTenant(patientId, tenantId);

    const note = await this.patientNoteRepository.findByIdForPatient(noteId, patientId, tenantId);
    if (!note) {
      throw patientNoteNotFoundError();
    }

    return {
      note: toPatientNoteResponse(note),
    };
  }

  private async ensurePatientBelongsToTenant(patientId: string, tenantId: string) {
    const patient = await this.patientsRepository.findByIdGlobal(patientId);
    if (!patient) {
      throw patientNotFoundError();
    }

    if (patient.tenantId !== tenantId) {
      throw patientTenantMismatchError("You cannot access notes from another tenant.");
    }
  }
}
