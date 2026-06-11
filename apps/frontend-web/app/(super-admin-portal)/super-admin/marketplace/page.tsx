import { Card } from "@/components/dashboard/Card";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MarketplaceCatalog } from "@/components/marketplace/marketplace-catalog";

export default function SuperAdminMarketplacePage() {
  return (
    <>
      <PageHeader
        title="Marketplace"
        subtitle="Global catalog of supported third-party integrations available to clinic tenants."
      />
      <Card>
        <MarketplaceCatalog detailBasePath="/super-admin/marketplace" showTenantStatus={false} />
      </Card>
    </>
  );
}
