import { createI18n, type LocaleMessages, type VueMessageType } from "vue-i18n";
import { LOCALES, type I18nOptions } from "./i18n.types";
import { en, es } from "./locales";

export const defaultLocale = LOCALES.EN;

export const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  globalInjection: true,
  legacy: false,
  messages: { en, es },
});
