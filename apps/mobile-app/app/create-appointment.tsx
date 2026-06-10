import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateAppointmentModal() {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerClassName="gap-4 p-4">
      <Input label="Patient" placeholder="Select patient" />
      <Input label="Therapist" placeholder="Select therapist" />
      <Input label="Date" placeholder="YYYY-MM-DD" />
      <Input label="Time" placeholder="HH:MM" />
      <Input label="Type" placeholder="Appointment type" />
      <View className="mt-2">
        <Button label={t("common.save")} onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
