import { BadRequestException, Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { buildPatientListWhere } from "@/utils/search-helpers";
import { PatientsRepository } from "@/patients/patients.repository";
import { MedicalRecordsRepository } from "@/medical-records/medical-records.repository";
import { DatabaseService } from "@/database/database.module";
import { buildSoftDeleteFilter } from "@ordella/database";
import { parseInternalMetricsRange } from "@/utils/internal-metrics-range";
import { PatientReportService } from "@/services/patient-report.service";
import type { ReportGroupBy } from "@/utils/period-bucket";

@Controller("patients/internal")
export class InternalPatientController {
  constructor(
    private readonly patientsRepository: PatientsRepository,
    private readonly medicalRecordsRepository: MedicalRecordsRepository,
    private readonly database: DatabaseService,
    private readonly patientReportService: PatientReportService,
  ) {}

  @Get("search")
  async searchPatients(@Query("tenantId") tenantId: string, @Query("search") search: string) {
    if (!tenantId?.trim() || !search?.trim()) {
      return { ids: [] };
    }

    const patients = await this.database.patient.findMany({
      where: buildPatientListWhere(tenantId.trim(), { search: search.trim() }),
      select: { id: true },
      take: 100,
    });

    return { ids: patients.map((patient) => patient.id) };
  }

  @Get("batch")
  async batchPatients(@Query("tenantId") tenantId: string, @Query("ids") ids: string) {
    if (!tenantId?.trim() || !ids?.trim()) {
      return { data: [] };
    }

    const idList = [...new Set(ids.split(",").map((id) => id.trim()).filter(Boolean))];
    if (!idList.length) {
      return { data: [] };
    }

    const patients = await this.database.patient.findMany({
      where: {
        tenantId: tenantId.trim(),
        id: { in: idList },
        ...buildSoftDeleteFilter(),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    return { data: patients };
  }

  @Get("metrics")
  async getPatientMetrics(
    @Query("tenantId") tenantId: string,
    @Query("start") start: string,
    @Query("end") end: string,
  ) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const range = parseInternalMetricsRange(start, end);
    if (!range) {
      throw new BadRequestException("Invalid metrics date range");
    }

    const tenantFilter = {
      tenantId: tenantId.trim(),
      ...buildSoftDeleteFilter(),
    };

    const [totalPatients, newPatientsInRange] = await Promise.all([
      this.database.patient.count({ where: tenantFilter }),
      this.database.patient.count({
        where: {
          ...tenantFilter,
          createdAt: { gte: range.start, lte: range.end },
        },
      }),
    ]);

    return { totalPatients, newPatientsInRange };
  }

  @Get("report")
  async getPatientReport(
    @Query("tenantId") tenantId: string,
    @Query("start") start: string,
    @Query("end") end: string,
    @Query("groupBy") groupBy: string,
    @Query("gender") gender?: string,
    @Query("status") status?: string,
  ) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const range = parseInternalMetricsRange(start, end);
    if (!range) {
      throw new BadRequestException("Invalid report date range");
    }

    const normalizedGroupBy = normalizeGroupBy(groupBy);
    if (!normalizedGroupBy) {
      throw new BadRequestException("Invalid groupBy");
    }

    return this.patientReportService.getReport({
      tenantId: tenantId.trim(),
      start: range.start,
      end: range.end,
      groupBy: normalizedGroupBy,
      gender: gender?.trim() || undefined,
      status: status?.trim() || undefined,
    });
  }

  @Get("index-feed")
  async indexFeed(
    @Query("tenantId") tenantId: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    if (!tenantId?.trim()) {
      throw new BadRequestException("tenantId is required");
    }

    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(200, Math.max(1, Number(limit) || 100));
    const skip = (safePage - 1) * safeLimit;
    const where = { tenantId: tenantId.trim(), ...buildSoftDeleteFilter() };

    const [data, total] = await Promise.all([
      this.database.patient.findMany({
        where,
        skip,
        take: safeLimit,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          tenantId: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          dateOfBirth: true,
          gender: true,
          status: true,
        },
      }),
      this.database.patient.count({ where }),
    ]);

    return {
      data: data.map((patient) => ({
        ...patient,
        dateOfBirth: patient.dateOfBirth?.toISOString().slice(0, 10) ?? null,
      })),
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.max(1, Math.ceil(total / safeLimit)),
      },
    };
  }

  @Get("record/:patientId")
  async getPatientRecord(
    @Query("tenantId") tenantId: string,
    @Param("patientId") patientId: string,
  ) {
    if (!tenantId?.trim()) {
      throw new NotFoundException();
    }

    const patient = await this.patientsRepository.findById(tenantId.trim(), patientId);
    if (!patient) {
      throw new NotFoundException();
    }

    const medicalRecord = await this.medicalRecordsRepository.findByPatientId(
      tenantId.trim(),
      patientId,
    );
    const medicalNotes: string[] = [];
    if (medicalRecord?.notes) {
      medicalNotes.push(medicalRecord.notes);
    }
    if (medicalRecord?.conditions) {
      medicalNotes.push(`Conditions: ${medicalRecord.conditions}`);
    }
    if (medicalRecord?.allergies) {
      medicalNotes.push(`Allergies: ${medicalRecord.allergies}`);
    }

    return {
      id: patient.id,
      tenantId: patient.tenantId,
      firstName: patient.firstName,
      lastName: patient.lastName,
      email: patient.email,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth?.toISOString().slice(0, 10) ?? null,
      gender: patient.gender,
      status: patient.status,
      tags: [],
      medicalNotes,
    };
  }

  @Get(":patientId")
  async getPatientInternal(
    @Query("tenantId") tenantId: string,
    @Param("patientId") patientId: string,
  ) {
    if (!tenantId?.trim()) {
      throw new NotFoundException();
    }

    const patient = await this.patientsRepository.findById(tenantId.trim(), patientId);
    if (!patient) {
      throw new NotFoundException();
    }

    return {
      id: patient.id,
      tenantId: patient.tenantId,
      status: patient.status,
    };
  }
}

function normalizeGroupBy(value: string | undefined): ReportGroupBy | null {
  if (value === "day" || value === "week" || value === "month") {
    return value;
  }
  return null;
}
