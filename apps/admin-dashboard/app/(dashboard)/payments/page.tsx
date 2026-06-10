"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function PaymentsPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("payments.title")}
      description={t("payments.description")}
      tabs={[
        { value: "history", label: t("payments.history") },
        { value: "refunds", label: t("payments.refunds") },
      ]}
    />
  );
}
