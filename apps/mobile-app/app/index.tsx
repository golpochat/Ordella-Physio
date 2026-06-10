import { Redirect } from "expo-router";
import { Loader } from "@/components/ui/loader";
import { useAuth } from "@/hooks/useAuth";

export default function IndexScreen() {
  const { isAuthenticated, isHydrated } = useAuth();

  if (!isHydrated) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Redirect href="/(dashboard)" />;
  }

  return <Redirect href="/(auth)/login" />;
}
