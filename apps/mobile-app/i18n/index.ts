import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import bn from "./bn.json";
import en from "./en.json";

const resources = {
  en: { translation: en },
  bn: { translation: bn },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";
const fallbackLanguage = deviceLanguage === "bn" ? "bn" : "en";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: fallbackLanguage,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    compatibilityJSON: "v4",
  });
}

export default i18n;
