"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function CommunicationPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("communication.title")}
      description={t("communication.description")}
      tabs={[
        { value: "notifications", label: t("communication.notifications") },
        { value: "reminders", label: t("communication.reminders") },
        { value: "templates", label: t("communication.templates") },
      ]}
    />
  );
}
