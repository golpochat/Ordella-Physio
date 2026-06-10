"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function ReportingPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("reporting.title")}
      description={t("reporting.description")}
      tabs={[
        { value: "daily", label: t("reporting.daily") },
        { value: "monthly", label: t("reporting.monthly") },
        { value: "export", label: t("reporting.export") },
      ]}
    />
  );
}
