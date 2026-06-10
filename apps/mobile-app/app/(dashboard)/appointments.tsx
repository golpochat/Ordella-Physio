import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { AppointmentItem } from "@/components/lists/appointment-item";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MOCK_APPOINTMENTS } from "@/lib/fixtures";
import { QUERY_KEYS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { router } from "expo-router";

export default function AppointmentsScreen() {
  const { t } = useTranslation();
  const [view, setView] = useState<"list" | "calendar">("list");

  const { data: appointments = MOCK_APPOINTMENTS } = useQuery({
    queryKey: QUERY_KEYS.appointments,
    queryFn: () => fetcher<typeof MOCK_APPOINTMENTS>("/appointments").catch(() => MOCK_APPOINTMENTS),
  });

  return (
    <View className="flex-1 bg-background">
      <Header
        title={t("appointments.title")}
        rightSlot={<Button label="+" size="sm" onPress={() => router.push("/create-appointment")} />}
      />
      <View className="flex-row gap-2 px-4 py-3">
        <Button
          label={t("appointments.upcoming")}
          size="sm"
          variant={view === "list" ? "primary" : "outline"}
          onPress={() => setView("list")}
        />
        <Button
          label={t("appointments.calendar")}
          size="sm"
          variant={view === "calendar" ? "primary" : "outline"}
          onPress={() => setView("calendar")}
        />
      </View>

      {view === "calendar" ? (
        <View className="flex-1 items-center justify-center px-6">
          <Card className="w-full">
            <CardTitle>{t("appointments.calendar")}</CardTitle>
            <CardDescription>{t("appointments.calendarPlaceholder")}</CardDescription>
          </Card>
        </View>
      ) : (
        <ScrollView contentContainerClassName="gap-3 p-4 pb-10">
          {appointments.length ? (
            appointments.map((appointment) => (
              <AppointmentItem key={appointment.id} {...appointment} />
            ))
          ) : (
            <Text className="text-center text-muted-foreground">{t("appointments.empty")}</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}
