"use client";

import { useEffect } from "react";
import { useTheme as useOrdellaTheme } from "@ordella/ui";
import { useUiStore } from "@/store/ui.store";

export function useTheme() {
  const { theme, setTheme: setOrdellaTheme } = useOrdellaTheme();
  const storedTheme = useUiStore((state) => state.theme);
  const setStoredTheme = useUiStore((state) => state.setTheme);

  useEffect(() => {
    if (storedTheme && storedTheme !== theme) {
      setOrdellaTheme(storedTheme);
    }
  }, [storedTheme, theme, setOrdellaTheme]);

  const setTheme = (next: "light" | "dark" | "system") => {
    setStoredTheme(next);
    setOrdellaTheme(next);
  };

  return { theme: storedTheme ?? theme, setTheme };
}
