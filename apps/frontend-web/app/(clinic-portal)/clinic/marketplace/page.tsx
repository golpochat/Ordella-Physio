import { MarketplaceCatalog } from "@/components/marketplace/marketplace-catalog";

export default function ClinicMarketplacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Marketplace</h1>
        <p className="text-muted-foreground">
          Connect third-party tools for calendar sync, messaging, storage, and exercise programs.
        </p>
      </div>
      <MarketplaceCatalog detailBasePath="/clinic/marketplace" />
    </div>
  );
}
