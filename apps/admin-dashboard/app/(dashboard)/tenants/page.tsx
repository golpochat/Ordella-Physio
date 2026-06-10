"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function TenantsPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("tenants.title")}
      description={t("tenants.description")}
      tabs={[
        { value: "list", label: t("tenants.list") },
        { value: "settings", label: t("tenants.settings") },
        { value: "locations", label: t("tenants.locations") },
      ]}
    />
  );
}
