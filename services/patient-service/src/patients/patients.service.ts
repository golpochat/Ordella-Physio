import { Injectable } from "@nestjs/common";
import { CreatePatientCommand } from "@/patients/commands/create-patient.command";
import { UpdatePatientCommand } from "@/patients/commands/update-patient.command";
import { DeletePatientCommand } from "@/patients/commands/delete-patient.command";
import { PatientsRepository } from "@/patients/patients.repository";
import { MedicalRecordsService } from "@/medical-records/medical-records.service";
import type { CreatePatientDto } from "@/patients/dto/create-patient.dto";
import type { UpdatePatientDto } from "@/patients/dto/update-patient.dto";
import type { SearchPatientDto } from "@/patients/dto/search-patient.dto";
import type { UpdateMedicalRecordDto } from "@/medical-records/dto/update-medical-record.dto";
import { buildPatientSearchWhere, resolvePagination } from "@/utils/search-helpers";
import { fetchPatientNotesPlaceholder } from "@/utils/patient-helpers";
import { toPatientListResponse, toPatientResponse } from "@/patients/patients.mapper";

@Injectable()
export class PatientsService {
  constructor(
    private readonly createPatientCommand: CreatePatientCommand,
    private readonly updatePatientCommand: UpdatePatientCommand,
    private readonly deletePatientCommand: DeletePatientCommand,
    private readonly patientsRepository: PatientsRepository,
    private readonly medicalRecordsService: MedicalRecordsService,
  ) {}

  create(tenantId: string, dto: CreatePatientDto, correlationId?: string) {
    return this.createPatientCommand.execute({ tenantId, dto, correlationId });
  }

  async search(tenantId: string, query: SearchPatientDto) {
    const where = buildPatientSearchWhere(tenantId, query);
    const { page, limit, skip } = resolvePagination(query);
    const [patients, total] = await Promise.all([
      this.patientsRepository.search(tenantId, where, { skip, take: limit }),
      this.patientsRepository.count(tenantId, where),
    ]);

    return {
      data: toPatientListResponse(patients),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(tenantId: string, patientId: string) {
    const patient = await this.patientsRepository.findById(tenantId, patientId);
    if (!patient) {
      return null;
    }

    return toPatientResponse(patient);
  }

  update(tenantId: string, patientId: string, dto: UpdatePatientDto, correlationId?: string) {
    return this.updatePatientCommand.execute({ tenantId, patientId, dto, correlationId });
  }

  delete(tenantId: string, patientId: string, correlationId?: string) {
    return this.deletePatientCommand.execute({ tenantId, patientId, correlationId });
  }

  getMedicalRecord(tenantId: string, patientId: string) {
    return this.medicalRecordsService.getByPatientId(tenantId, patientId);
  }

  updateMedicalRecord(
    tenantId: string,
    patientId: string,
    dto: UpdateMedicalRecordDto,
    correlationId?: string,
  ) {
    return this.medicalRecordsService.update(tenantId, patientId, dto, correlationId);
  }

  getNotesLookup(patientId: string) {
    return fetchPatientNotesPlaceholder(patientId);
  }
}
