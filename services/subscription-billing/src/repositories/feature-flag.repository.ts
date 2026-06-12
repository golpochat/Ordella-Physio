import { Injectable } from "@nestjs/common";
import { DatabaseService } from "@/database/database.module";

@Injectable()
export class FeatureFlagRepository {
  constructor(private readonly database: DatabaseService) {}

  listByPlan(planId: string) {
    return this.database.featureFlag.findMany({
      where: { planId },
      orderBy: { featureKey: "asc" },
    });
  }

  findByPlanAndKey(planId: string, featureKey: string) {
    return this.database.featureFlag.findUnique({
      where: {
        planId_featureKey: { planId, featureKey },
      },
    });
  }
}
