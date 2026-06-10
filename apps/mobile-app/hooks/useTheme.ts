import { useColorScheme } from "react-native";
import { useUiStore, type ThemeMode } from "@/store/ui.store";

export function useTheme() {
  const systemScheme = useColorScheme();
  const theme = useUiStore((state) => state.theme);
  const setTheme = useUiStore((state) => state.setTheme);

  const resolvedTheme: "light" | "dark" =
    theme === "system" ? (systemScheme === "dark" ? "dark" : "light") : theme;

  const isDark = resolvedTheme === "dark";

  const toggleDarkMode = () => {
    const next: ThemeMode = isDark ? "light" : "dark";
    setTheme(next);
  };

  return {
    theme,
    resolvedTheme,
    isDark,
    setTheme,
    toggleDarkMode,
  };
}
