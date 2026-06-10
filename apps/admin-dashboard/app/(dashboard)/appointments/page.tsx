"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function AppointmentsPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("appointments.title")}
      description={t("appointments.description")}
      tabs={[
        { value: "calendar", label: t("appointments.calendar") },
        { value: "list", label: t("appointments.list") },
        { value: "create", label: t("appointments.create") },
      ]}
    />
  );
}
