import { createI18n } from "vue-i18n";
import { LOCALES } from "./i18n.types";
import { en, es } from "./locales";

export const defaultLocale = LOCALES.ES;

//TODO: Typecheck messages

export const i18n = createI18n({
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  globalInjection: true,
  legacy: false,
  messages: { en, es },
});
