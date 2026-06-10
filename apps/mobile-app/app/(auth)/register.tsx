import { useState } from "react";
import { Link, router } from "expo-router";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { registerSchema } from "@ordella/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { parseApiError } from "@/lib/api-client";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterScreen() {
  const { t } = useTranslation();
  const { register, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const parsed = registerSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? t("common.error"));
      return;
    }

    try {
      await register(email, password);
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
        <Text className="text-3xl font-bold text-foreground">{t("auth.register")}</Text>

        <View className="mt-8 gap-4">
          <Input label={t("auth.email")} value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
          <Input label={t("auth.password")} value={password} onChangeText={setPassword} secureTextEntry />
          <Input label={t("auth.confirmPassword")} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
          {error ? <Text className="text-sm text-destructive">{error}</Text> : null}
          <Button label={t("auth.register")} onPress={onSubmit} loading={isLoading} />
        </View>

        <View className="mt-8 flex-row items-center gap-1">
          <Text className="text-sm text-muted-foreground">{t("auth.hasAccount")}</Text>
          <Link href="/(auth)/login" className="text-sm font-semibold text-primary">
            {t("auth.login")}
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
