import { useState } from "react";
import { Link, router } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { loginSchema } from "@ordella/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseApiError } from "@/lib/api-client";
import { useAuth } from "@/hooks/useAuth";

export default function LoginScreen() {
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);
    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? t("common.error"));
      return;
    }

    try {
      await login(email, password);
      router.replace("/(dashboard)");
    } catch (err) {
      setError(parseApiError(err));
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-background"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerClassName="flex-grow justify-center px-6 py-10" keyboardShouldPersistTaps="handled">
        <Text className="text-3xl font-bold text-foreground">{t("auth.welcomeBack")}</Text>
        <Text className="mt-2 text-base text-muted-foreground">{t("auth.signInSubtitle")}</Text>

        <View className="mt-8 gap-4">
          <Input
            label={t("auth.email")}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          <Input
            label={t("auth.password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoComplete="password"
          />
          {error ? <Text className="text-sm text-destructive">{error}</Text> : null}
          <Button label={t("auth.login")} onPress={onSubmit} loading={isLoading} />
        </View>

        <Link href="/(auth)/forgot-password" className="mt-4 text-sm font-medium text-primary">
          {t("auth.forgotPassword")}
        </Link>

        <View className="mt-8 flex-row items-center gap-1">
          <Text className="text-sm text-muted-foreground">{t("auth.noAccount")}</Text>
          <Link href="/(auth)/register" className="text-sm font-semibold text-primary">
            {t("auth.register")}
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
