import { Injectable } from "@nestjs/common";
import { MedicalRecordsRepository } from "@/medical-records/medical-records.repository";
import { PatientEventPublisher } from "@/events/patient-event.publisher";
import type { UpdateMedicalRecordDto } from "@/medical-records/dto/update-medical-record.dto";
import { toMedicalRecordResponse } from "@/medical-records/medical-records.mapper";

@Injectable()
export class MedicalRecordsService {
  constructor(
    private readonly medicalRecordsRepository: MedicalRecordsRepository,
    private readonly eventPublisher: PatientEventPublisher,
  ) {}

  async getByPatientId(tenantId: string, patientId: string) {
    const record = await this.medicalRecordsRepository.findByPatientId(tenantId, patientId);
    return record ? toMedicalRecordResponse(record) : null;
  }

  async update(
    tenantId: string,
    patientId: string,
    dto: UpdateMedicalRecordDto,
    correlationId?: string,
  ) {
    const record = await this.medicalRecordsRepository.updateByPatientId(tenantId, patientId, dto);

    await this.eventPublisher.publishMedicalRecordUpdated(
      {
        tenantId,
        patientId,
        medicalRecordId: record.id,
        changes: dto as Record<string, unknown>,
        updatedAt: record.updatedAt.toISOString(),
      },
      correlationId,
    );

    return toMedicalRecordResponse(record);
  }
}
