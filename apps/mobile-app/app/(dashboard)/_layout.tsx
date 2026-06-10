import { Redirect, Tabs } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "@/components/ui/loader";
import { TabBar } from "@/components/layout/tab-bar";

export default function DashboardLayout() {
  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="appointments" />
      <Tabs.Screen name="patients" />
      <Tabs.Screen name="notes" options={{ href: null }} />
      <Tabs.Screen name="billing" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
