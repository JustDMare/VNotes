import type { LocaleMessages, VueMessageType } from "vue-i18n";

export enum LOCALES {
  EN = "en",
  ES = "es",
}

export type Locale = LOCALES;

type LocaleValues = Record<LOCALES, { value: string; caption: string }>;

export const localeValues: LocaleValues = {
  es: { value: LOCALES.ES, caption: "Español" },
  en: { value: LOCALES.EN, caption: "English" },
};

export interface I18nOptions {
  locale: Locale;
  fallbackLocale: Locale;
  globalInjection: boolean;
  legacy: boolean;
  messages: LocaleMessages<VueMessageType>;
}
