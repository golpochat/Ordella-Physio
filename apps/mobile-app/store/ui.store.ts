import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/lib/constants";

export type ThemeMode = "light" | "dark" | "system";
export type LanguageCode = "en" | "bn";

type UiState = {
  theme: ThemeMode;
  language: LanguageCode;
  showOfflineBanner: boolean;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: LanguageCode) => void;
  setShowOfflineBanner: (value: boolean) => void;
};

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: "system",
      language: "en",
      showOfflineBanner: false,
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      setShowOfflineBanner: (value) => set({ showOfflineBanner: value }),
    }),
    {
      name: STORAGE_KEYS.THEME,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ theme: state.theme, language: state.language }),
    },
  ),
);
