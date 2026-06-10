import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/layout/header";
import { PatientItem } from "@/components/lists/patient-item";
import { Button } from "@/components/ui/button";
import { MOCK_PATIENTS } from "@/lib/fixtures";
import { QUERY_KEYS } from "@/lib/constants";
import { fetcher } from "@/lib/fetcher";

export default function PatientsScreen() {
  const { t } = useTranslation();

  const { data: patients = MOCK_PATIENTS } = useQuery({
    queryKey: QUERY_KEYS.patients,
    queryFn: () => fetcher<typeof MOCK_PATIENTS>("/patients").catch(() => MOCK_PATIENTS),
  });

  return (
    <View className="flex-1 bg-background">
      <Header
        title={t("patients.title")}
        rightSlot={<Button label="+" size="sm" onPress={() => router.push("/add-patient")} />}
      />
      <ScrollView contentContainerClassName="gap-3 p-4 pb-10">
        {patients.length ? (
          patients.map((patient) => (
            <PatientItem
              key={patient.id}
              {...patient}
              onPress={() => router.push({ pathname: "/(dashboard)/notes", params: { patientId: patient.id } })}
            />
          ))
        ) : (
          <Text className="text-center text-muted-foreground">{t("patients.empty")}</Text>
        )}
      </ScrollView>
    </View>
  );
}
