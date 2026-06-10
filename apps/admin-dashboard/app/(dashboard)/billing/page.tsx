"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function BillingPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("billing.title")}
      description={t("billing.description")}
      tabs={[
        { value: "invoices", label: t("billing.invoices") },
        { value: "items", label: t("billing.items") },
        { value: "tax", label: t("billing.taxRates") },
      ]}
    />
  );
}
