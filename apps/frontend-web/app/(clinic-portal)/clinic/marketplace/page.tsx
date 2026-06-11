import { PageHeader } from "@/components/dashboard/PageHeader";
import { MarketplaceCatalog } from "@/components/marketplace/marketplace-catalog";

export default function ClinicMarketplacePage() {
  return (
    <>
      <PageHeader
        title="Marketplace"
        subtitle="Connect third-party tools for calendar sync, messaging, storage, and exercise programs."
      />
      <MarketplaceCatalog detailBasePath="/clinic/marketplace" />
    </>
  );
}
