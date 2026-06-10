import { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { AppProviders } from "@/components/providers/app-providers";
import { OfflineBanner } from "@/components/layout/offline-banner";
import { useTheme } from "@/hooks/useTheme";
import "@/styles/globals.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isDark } = useTheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AppProviders>
      <StatusBar style={isDark ? "light" : "dark"} />
      <OfflineBanner />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(dashboard)" />
        <Stack.Screen
          name="create-appointment"
          options={{ presentation: "modal", headerShown: true, title: "Create appointment" }}
        />
        <Stack.Screen
          name="add-patient"
          options={{ presentation: "modal", headerShown: true, title: "Add patient" }}
        />
        <Stack.Screen name="add-note" options={{ presentation: "modal", headerShown: true, title: "Add note" }} />
      </Stack>
    </AppProviders>
  );
}
