import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import pt from "../i18n/locales/pt-br.json";
import en from "../i18n/locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    pt: { translation: pt },
    en: { translation: en },
  },
  lng: "pt",
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
