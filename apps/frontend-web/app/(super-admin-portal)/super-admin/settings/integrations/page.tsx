import { PageHeader } from "@/components/dashboard/PageHeader";
import { AddressLookupIntegrationsPanel } from "@/components/super-admin/settings/AddressLookupIntegrationsPanel";

export default function SuperAdminAddressLookupIntegrationsPage() {
  return (
    <>
      <PageHeader
        title="Address lookup integrations"
        subtitle="Manage platform-wide address vendor credentials. Super admin only."
      />
      <AddressLookupIntegrationsPanel />
    </>
  );
}
