import { Injectable } from "@nestjs/common";
import { toFeatureFlagResponse } from "@/models/FeatureFlag";
import { FeatureFlagRepository } from "@/repositories/feature-flag.repository";
import { TenantSubscriptionRepository } from "@/repositories/tenant-subscription.repository";
import { featureNotAvailableError } from "@/utils/subscription-errors";
import { validateFeatureKey } from "@/validators/feature.validator";

@Injectable()
export class FeatureGateService {
  constructor(
    private readonly featureFlagRepository: FeatureFlagRepository,
    private readonly subscriptionRepository: TenantSubscriptionRepository,
  ) {}

  async isFeatureEnabled(tenantId: string, featureKeyInput: string) {
    const featureKey = validateFeatureKey(featureKeyInput);
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const planId = subscription?.planId ?? "plan_free";
    const flag = await this.featureFlagRepository.findByPlanAndKey(planId, featureKey);
    return flag?.enabled ?? false;
  }

  async enforceFeature(tenantId: string, featureKeyInput: string) {
    const enabled = await this.isFeatureEnabled(tenantId, featureKeyInput);
    if (!enabled) {
      throw featureNotAvailableError();
    }
    return true;
  }

  async listFeaturesForTenant(tenantId: string) {
    const subscription = await this.subscriptionRepository.findByTenantId(tenantId);
    const planId = subscription?.planId ?? "plan_free";
    const flags = await this.featureFlagRepository.listByPlan(planId);
    return flags.map(toFeatureFlagResponse);
  }
}
