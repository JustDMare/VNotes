export enum LOCALES {
  EN = "en",
  ES = "es",
}

export type Locale = LOCALES;

type LocaleValues = Record<LOCALES, { value: string; caption: string }>;

export const localeValues: LocaleValues = {
  es: { value: "es-ES", caption: "Español" },
  en: { value: "en-UK", caption: "English" },
};
