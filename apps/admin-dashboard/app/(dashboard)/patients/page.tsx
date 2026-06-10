"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function PatientsPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("patients.title")}
      description={t("patients.description")}
      tabs={[
        { value: "list", label: t("patients.list") },
        { value: "profile", label: t("patients.profile") },
        { value: "records", label: t("patients.records") },
      ]}
    />
  );
}
