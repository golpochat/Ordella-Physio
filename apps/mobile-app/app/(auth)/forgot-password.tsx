import { useState } from "react";
import { Link } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_ROUTES } from "@/lib/constants";
import { apiClient } from "@/lib/api-client";

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await apiClient.post(API_ROUTES.auth.forgotPassword, { email }, { skipAuth: true });
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-10" keyboardShouldPersistTaps="handled">
        <Text className="text-3xl font-bold text-foreground">{t("auth.forgotPassword")}</Text>

        {submitted ? (
          <Text className="mt-6 text-base text-muted-foreground">{t("auth.resetSent")}</Text>
        ) : (
          <View className="mt-8 gap-4">
            <Input label={t("auth.email")} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
            <Button label={t("common.save")} onPress={onSubmit} loading={loading} />
          </View>
        )}

        <Link href="/(auth)/login" className="mt-8 text-sm font-semibold text-primary">
          {t("auth.login")}
        </Link>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
