import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddPatientModal() {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerClassName="gap-4 p-4">
      <Input label="Full name" placeholder="Patient name" />
      <Input label="Email" placeholder="email@example.com" autoCapitalize="none" keyboardType="email-address" />
      <Input label="Phone" placeholder="+44 ..." keyboardType="phone-pad" />
      <Input label="Date of birth" placeholder="YYYY-MM-DD" />
      <View className="mt-2">
        <Button label={t("common.save")} onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
