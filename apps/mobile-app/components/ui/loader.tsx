import { ActivityIndicator, Text, View } from "react-native";
import { useTranslation } from "react-i18next";

export function Loader({ message }: { message?: string }) {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center gap-3 p-6">
      <ActivityIndicator size="large" color="#0f766e" />
      <Text className="text-sm text-muted-foreground">{message ?? t("common.loading")}</Text>
    </View>
  );
}
