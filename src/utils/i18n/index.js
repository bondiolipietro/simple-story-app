import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Cache from "i18next-localstorage-cache";
import LanguageDetector from "i18next-browser-languagedetector";

import translation from "./en/translation.json";
import { i18nConfig } from "../../config/i18nConfig";

export const resources = {
  en: {
    translation,
  },
};

i18n
  .use(Cache)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: i18nConfig.DEFAULT_LANGUAGE,
    resources,
    detection: {
      checkWhitelist: true,
    },
    debug: process.env.NODE_ENV === "development",
    whitelist: i18nConfig.LANGUAGES,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
