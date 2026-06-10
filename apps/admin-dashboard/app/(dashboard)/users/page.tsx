"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function UsersPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("users.title")}
      description={t("users.description")}
      tabs={[
        { value: "list", label: t("users.list") },
        { value: "invite", label: t("users.invite") },
        { value: "roles", label: t("users.roles") },
      ]}
    />
  );
}
