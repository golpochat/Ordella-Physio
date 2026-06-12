import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { TenantGuard } from "@ordella/security";
import { PatientNoteService } from "@/patient-notes/patient-note.service";
import { PatientNotesGuard } from "@/patient-notes/guards/patient-notes.guard";
import { JwtGuard } from "@/patients/guards/jwt.guard";
import { CurrentUser } from "@/patients/guards/current-user.decorator";
import type { AuthenticatedPatientUser } from "@/utils/patient-helpers";

@Controller("patients/:patientId/notes")
@UseGuards(JwtGuard, TenantGuard, PatientNotesGuard)
export class PatientNoteController {
  constructor(private readonly patientNoteService: PatientNoteService) {}

  @Post()
  createNote(
    @Param("patientId") patientId: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientNoteService.createNote(patientId, payload, user);
  }

  @Get()
  listNotes(
    @Param("patientId") patientId: string,
    @Query() query: Record<string, unknown>,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientNoteService.listNotes(patientId, query, user);
  }

  @Get(":noteId")
  getNote(
    @Param("patientId") patientId: string,
    @Param("noteId") noteId: string,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientNoteService.getNote(patientId, noteId, user);
  }

  @Put(":noteId")
  updateNote(
    @Param("patientId") patientId: string,
    @Param("noteId") noteId: string,
    @Body() payload: unknown,
    @CurrentUser() user: AuthenticatedPatientUser,
  ) {
    return this.patientNoteService.updateNote(patientId, noteId, payload, user);
  }
}
