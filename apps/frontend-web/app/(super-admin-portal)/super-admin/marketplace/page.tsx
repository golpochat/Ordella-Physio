import { MarketplaceCatalog } from "@/components/marketplace/marketplace-catalog";

export default function SuperAdminMarketplacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Marketplace</h1>
        <p className="text-muted-foreground">
          Global catalog of supported third-party integrations available to clinic tenants.
        </p>
      </div>
      <MarketplaceCatalog detailBasePath="/super-admin/marketplace" showTenantStatus={false} />
    </div>
  );
}
