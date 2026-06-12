import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { StaffRepository } from "@/repositories/staff.repository";
import { StaffConfigRepository } from "@/repositories/staff-config.repository";
import { DatabaseService } from "@/database/database.module";
import {
  DEFAULT_STAFF_CONFIGS,
  type StaffWorkingHoursConfig,
} from "@/models/StaffConfig";

@Controller("staff/internal")
export class InternalStaffController {
  constructor(
    private readonly staffRepository: StaffRepository,
    private readonly staffConfigRepository: StaffConfigRepository,
    private readonly database: DatabaseService,
  ) {}

  @Get("seat-count")
  async getSeatCount(@Query("tenantId") tenantId: string) {
    if (!tenantId?.trim()) {
      return { count: 0 };
    }

    const count = await this.database.staff.count({
      where: {
        tenantId: tenantId.trim(),
        status: "ACTIVE",
      },
    });

    return { count };
  }

  @Get("search")
  async searchStaff(@Query("tenantId") tenantId: string, @Query("search") search: string) {
    if (!tenantId?.trim() || !search?.trim()) {
      return { ids: [] };
    }

    const staff = await this.database.staff.findMany({
      where: {
        tenantId: tenantId.trim(),
        OR: [
          { firstName: { contains: search.trim(), mode: "insensitive" } },
          { lastName: { contains: search.trim(), mode: "insensitive" } },
          { email: { contains: search.trim(), mode: "insensitive" } },
        ],
      },
      select: { id: true },
      take: 100,
    });

    return { ids: staff.map((member) => member.id) };
  }

  @Get("batch")
  async batchStaff(@Query("tenantId") tenantId: string, @Query("ids") ids: string) {
    if (!tenantId?.trim() || !ids?.trim()) {
      return { data: [] };
    }

    const idList = [...new Set(ids.split(",").map((id) => id.trim()).filter(Boolean))];
    if (!idList.length) {
      return { data: [] };
    }

    const staff = await this.database.staff.findMany({
      where: {
        tenantId: tenantId.trim(),
        id: { in: idList },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    return { data: staff };
  }

  @Get("index-feed")
  async indexFeed(
    @Query("tenantId") tenantId: string,
    @Query("page") page?: string,
    @Query("limit") limit?: string,
  ) {
    if (!tenantId?.trim()) {
      return { data: [], pagination: { page: 1, limit: 100, total: 0, totalPages: 0 } };
    }

    const safePage = Math.max(1, Number(page) || 1);
    const safeLimit = Math.min(200, Math.max(1, Number(limit) || 100));
    const skip = (safePage - 1) * safeLimit;
    const where = { tenantId: tenantId.trim() };

    const [data, total] = await Promise.all([
      this.database.staff.findMany({
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
          staffType: true,
          status: true,
        },
      }),
      this.database.staff.count({ where }),
    ]);

    return {
      data,
      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages: Math.max(1, Math.ceil(total / safeLimit)),
      },
    };
  }

  @Get("record/:staffId")
  async getStaffRecord(@Query("tenantId") tenantId: string, @Param("staffId") staffId: string) {
    if (!tenantId?.trim()) {
      throw new NotFoundException();
    }

    const record = await this.staffRepository.findById(staffId);
    if (!record || record.tenantId !== tenantId.trim()) {
      throw new NotFoundException();
    }

    return {
      id: record.id,
      tenantId: record.tenantId,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email,
      phone: record.phone,
      staffType: record.staffType,
      status: record.status,
    };
  }

  @Get(":staffId")
  async getStaffInternal(@Query("tenantId") tenantId: string, @Param("staffId") staffId: string) {
    if (!tenantId?.trim()) {
      throw new NotFoundException();
    }

    const record = await this.staffRepository.findById(staffId);
    if (!record || record.tenantId !== tenantId.trim()) {
      throw new NotFoundException();
    }

    const workingHoursConfig = await this.staffConfigRepository.findByStaffAndNamespace(
      staffId,
      "workingHours",
    );

    const workingHoursData = workingHoursConfig?.data as StaffWorkingHoursConfig | undefined;
    const defaultWorkingHours = DEFAULT_STAFF_CONFIGS.workingHours as StaffWorkingHoursConfig;
    const weeklySchedule = workingHoursData?.weeklySchedule ?? defaultWorkingHours.weeklySchedule;

    return {
      id: record.id,
      tenantId: record.tenantId,
      status: record.status,
      weeklySchedule,
    };
  }
}
