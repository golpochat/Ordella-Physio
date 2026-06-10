import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { InvoiceItem } from "@/components/lists/invoice-item";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MOCK_INVOICES } from "@/lib/fixtures";
import { QUERY_KEYS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { formatCurrency } from "@/lib/helpers";

export default function BillingScreen() {
  const { t } = useTranslation();

  const { data: invoices = MOCK_INVOICES } = useQuery({
    queryKey: QUERY_KEYS.billing,
    queryFn: () => fetcher<typeof MOCK_INVOICES>("/billing/invoices").catch(() => MOCK_INVOICES),
  });

  const outstanding = invoices
    .filter((invoice) => invoice.status === "outstanding")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <View className="flex-1 bg-background">
      <Header title={t("billing.title")} />
      <ScrollView contentContainerClassName="gap-4 p-4 pb-10">
        <Card>
          <CardTitle>{t("billing.outstanding")}</CardTitle>
          <CardDescription className="text-2xl font-bold text-foreground">
            {formatCurrency(outstanding)}
          </CardDescription>
        </Card>

        <Text className="text-lg font-semibold text-foreground">{t("billing.invoices")}</Text>
        {invoices.length ? (
          invoices.map((invoice) => <InvoiceItem key={invoice.id} {...invoice} />)
        ) : (
          <Text className="text-center text-muted-foreground">{t("billing.empty")}</Text>
        )}

        <Text className="text-lg font-semibold text-foreground">{t("billing.payments")}</Text>
        <Card>
          <CardDescription>Payment history placeholder — connect to payments API.</CardDescription>
        </Card>
      </ScrollView>
    </View>
  );
}
