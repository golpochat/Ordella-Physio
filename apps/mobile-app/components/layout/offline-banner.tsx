import { Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useNetwork } from "@/hooks/useNetwork";

export function OfflineBanner() {
  const { isOffline } = useNetwork();
  const { t } = useTranslation();

  if (!isOffline) {
    return null;
  }

  return (
    <View className="bg-amber-500 px-4 py-2">
      <Text className="text-center text-sm font-medium text-white">{t("common.offline")}</Text>
      <Text className="text-center text-xs text-white/90">{t("common.offlineHint")}</Text>
    </View>
  );
}
