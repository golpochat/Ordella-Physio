"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ordella/ui";
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/components/i18n-provider";

export type ModuleTab = {
  value: string;
  label: string;
};

export type ModulePlaceholderProps = {
  title: string;
  description?: string;
  tabs?: ModuleTab[];
};

export function ModulePlaceholder({ title, description, tabs }: ModulePlaceholderProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        </div>
        <Badge variant="secondary">{t("common.scaffold")}</Badge>
      </div>

      {tabs && tabs.length > 0 ? (
        <Tabs defaultValue={tabs[0]?.value}>
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <Card>
                <CardHeader>
                  <CardTitle>{tab.label}</CardTitle>
                  <CardDescription>{t("common.modulePlaceholder")}</CardDescription>
                </CardHeader>
                <CardBody>
                  <p className="text-sm text-muted-foreground">{t("common.comingSoon")}</p>
                </CardBody>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{t("common.modulePlaceholder")}</CardDescription>
          </CardHeader>
          <CardBody>
            <p className="text-sm text-muted-foreground">{t("common.comingSoon")}</p>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
