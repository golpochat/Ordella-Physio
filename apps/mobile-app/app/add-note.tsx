import { router } from "expo-router";
import { ScrollView, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddNoteModal() {
  const { t } = useTranslation();

  return (
    <ScrollView contentContainerClassName="gap-4 p-4">
      <Input label="Patient" placeholder="Select patient" />
      <Input label="Note type" placeholder="SOAP / Clinical" />
      <View className="gap-1.5">
        <Input label="Content" />
        <TextInput
          multiline
          numberOfLines={8}
          placeholder="Write clinical note..."
          placeholderTextColor="#a1a1aa"
          className="min-h-[160px] rounded-xl border border-border bg-background px-4 py-3 text-base text-foreground"
          textAlignVertical="top"
        />
      </View>
      <View className="mt-2">
        <Button label={t("common.save")} onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
