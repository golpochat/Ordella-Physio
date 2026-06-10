"use client";

import { ModulePlaceholder } from "@/components/module-placeholder";
import { useTranslation } from "@/components/i18n-provider";

export default function NotesPage() {
  const { t } = useTranslation();

  return (
    <ModulePlaceholder
      title={t("notes.title")}
      description={t("notes.description")}
      tabs={[
        { value: "soap", label: t("notes.soap") },
        { value: "clinical", label: t("notes.clinical") },
      ]}
    />
  );
}
