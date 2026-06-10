import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { AppointmentItem } from "@/components/lists/appointment-item";
import { MOCK_ACTIVITY, MOCK_APPOINTMENTS, MOCK_NOTIFICATIONS } from "@/lib/fixtures";
import { QUERY_KEYS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";
import { useAuth } from "@/hooks/useAuth";
import { useNotifications } from "@/hooks/useNotifications";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useAuth();
  useNotifications();

  const { data: appointments = MOCK_APPOINTMENTS } = useQuery({
    queryKey: QUERY_KEYS.appointments,
    queryFn: () => fetcher<typeof MOCK_APPOINTMENTS>("/appointments").catch(() => MOCK_APPOINTMENTS),
  });

  const quickActions = [
    { label: t("home.newAppointment"), href: "/create-appointment" as const },
    { label: t("home.addPatient"), href: "/add-patient" as const },
    { label: t("home.addNote"), href: "/add-note" as const },
  ];

  return (
    <View className="flex-1 bg-background">
      <Header title={t("home.title")} subtitle={user?.email} />
      <ScrollView contentContainerClassName="gap-6 p-4 pb-10">
        <View>
          <Text className="mb-3 text-lg font-semibold text-foreground">{t("home.quickActions")}</Text>
          <View className="flex-row flex-wrap gap-3">
            {quickActions.map((action) => (
              <Pressable
                key={action.href}
                onPress={() => router.push(action.href)}
                className="rounded-xl bg-primary/10 px-4 py-3"
              >
                <Text className="text-sm font-medium text-primary">{action.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View>
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-foreground">{t("home.upcoming")}</Text>
            <Pressable onPress={() => router.push("/(dashboard)/appointments")}>
              <Text className="text-sm font-medium text-primary">{t("common.seeAll")}</Text>
            </Pressable>
          </View>
          <View className="gap-3">
            {appointments.slice(0, 3).map((appointment) => (
              <AppointmentItem key={appointment.id} {...appointment} />
            ))}
          </View>
        </View>

        <View>
          <Text className="mb-3 text-lg font-semibold text-foreground">{t("home.notifications")}</Text>
          <View className="gap-3">
            {MOCK_NOTIFICATIONS.map((notification) => (
              <Card key={notification.id}>
                <CardTitle>{notification.title}</CardTitle>
                <CardDescription>{notification.body}</CardDescription>
              </Card>
            ))}
          </View>
        </View>

        <View>
          <Text className="mb-3 text-lg font-semibold text-foreground">{t("home.recentActivity")}</Text>
          <View className="gap-3">
            {MOCK_ACTIVITY.map((item) => (
              <Card key={item.id}>
                <CardTitle>{item.label}</CardTitle>
                <CardDescription>{item.time}</CardDescription>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
