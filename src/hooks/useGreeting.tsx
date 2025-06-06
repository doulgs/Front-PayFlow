import { useTranslation } from "react-i18next";

export function useGreeting() {
  const { t } = useTranslation();
  const hora = new Date().getHours();

  let greeting = "";

  if (hora >= 5 && hora < 12) {
    greeting = t("common.greeting.morning");
  } else if (hora >= 12 && hora < 18) {
    greeting = t("common.greeting.afternoon");
  } else {
    greeting = t("common.greeting.night");
  }

  return { greeting };
}
