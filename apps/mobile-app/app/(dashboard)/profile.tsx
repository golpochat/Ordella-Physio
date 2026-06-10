import { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/layout/header";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useNotifications } from "@/hooks/useNotifications";
import { useUiStore, type LanguageCode } from "@/store/ui.store";

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { isDark, toggleDarkMode } = useTheme();
  const { registerDeviceToken } = useNotifications();
  const setLanguage = useUiStore((state) => state.setLanguage);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const switchLanguage = async (language: LanguageCode) => {
    setLanguage(language);
    await i18n.changeLanguage(language);
  };

  return (
    <View className="flex-1 bg-background">
      <Header title={t("profile.title")} />
      <ScrollView contentContainerClassName="gap-4 p-4 pb-10">
        <Card className="items-center">
          <Avatar name={user?.email ?? "User"} size="lg" />
          <CardTitle className="mt-3">{user?.email}</CardTitle>
          <CardDescription>{user?.role}</CardDescription>
        </Card>

        <Card>
          <CardTitle>{t("profile.language")}</CardTitle>
          <View className="mt-3 flex-row gap-2">
            <Button
              label={t("profile.english")}
              size="sm"
              variant={i18n.language === "en" ? "primary" : "outline"}
              onPress={() => switchLanguage("en")}
            />
            <Button
              label={t("profile.bangla")}
              size="sm"
              variant={i18n.language === "bn" ? "primary" : "outline"}
              onPress={() => switchLanguage("bn")}
            />
          </View>
        </Card>

        <Card>
          <View className="flex-row items-center justify-between">
            <View>
              <CardTitle>{t("profile.darkMode")}</CardTitle>
              <CardDescription>{isDark ? "On" : "Off"}</CardDescription>
            </View>
            <Switch value={isDark} onValueChange={toggleDarkMode} />
          </View>
        </Card>

        <Card>
          <CardTitle>{t("profile.notifications")}</CardTitle>
          <CardDescription>Manage push notification preferences.</CardDescription>
          <View className="mt-3">
            <Button label="Register device" size="sm" variant="outline" onPress={registerDeviceToken} />
          </View>
        </Card>

        <Button label={t("profile.changePassword")} variant="outline" onPress={() => setPasswordModalOpen(true)} />
        <Button label={t("profile.logout")} variant="destructive" onPress={logout} />
      </ScrollView>

      <Modal
        visible={passwordModalOpen}
        title={t("profile.changePassword")}
        onClose={() => setPasswordModalOpen(false)}
        onConfirm={() => setPasswordModalOpen(false)}
        confirmLabel={t("common.save")}
        cancelLabel={t("common.cancel")}
      >
        <View className="gap-3">
          <Input label="Current password" secureTextEntry />
          <Input label="New password" secureTextEntry />
          <Input label="Confirm new password" secureTextEntry />
        </View>
      </Modal>
    </View>
  );
}
