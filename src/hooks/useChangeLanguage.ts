import { useCallback } from "react";
import { useLanguageContext } from "../contexts/language-context";
import { useTranslation } from "react-i18next";

export const useChangeLanguage = () => {
  const { t } = useTranslation();
  const { setLanguage, currentLanguage } = useLanguageContext();

  const changeLanguage = useCallback(
    async (lang: "pt" | "en") => {
      if (lang !== currentLanguage) {
        await setLanguage(lang);
      }
    },
    [setLanguage, currentLanguage]
  );

  return { t, currentLanguage, changeLanguage };
};
