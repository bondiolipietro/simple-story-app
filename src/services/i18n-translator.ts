import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import ChainedBackend from "i18next-chained-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import LocalStorageBackend from "i18next-localstorage-backend"

import { i18nConfig } from "@/config/i18n"

i18n
  .use(ChainedBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: i18nConfig.DEFAULT_LANGUAGE,
    backend: {
      backends: [LocalStorageBackend],
      backendOptions: [
        {
          expirationTime: 7 * 24 * 60 * 60 * 1000,
        },
      ],
    },
    debug: process.env.NODE_ENV === "development",
    detection: {
      order: ["queryString", "cookie"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  })

export { i18n }
