import { createI18n, type LocaleMessages, type VueMessageType } from "vue-i18n";
import { LOCALES, type I18nOptions } from "./i18n.types";
import { en, es } from "./locales";

const messages: LocaleMessages<VueMessageType> = {
  en,
  es,
};

export const defaultLocale = LOCALES.EN;

const i18nOptions: I18nOptions = {
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  globalInjection: true,
  legacy: false,
  messages: messages,
};

export const i18n = createI18n(i18nOptions);
