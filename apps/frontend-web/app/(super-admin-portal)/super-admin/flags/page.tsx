import { PlatformFeatureFlagsPlaceholder } from "@/components/super-admin-portal/feature-flags-placeholder";

export default function SuperAdminFlagsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Feature flags</h1>
        <p className="text-muted-foreground">Toggle platform capabilities per environment.</p>
      </div>
      <PlatformFeatureFlagsPlaceholder />
    </div>
  );
}
