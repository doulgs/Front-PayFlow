// src/types/i18n.d.ts
import "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: typeof import("../i18n/locales/pt-br.json");
    };
  }
}
