export enum LOCALES {
  EN = "en-UK",
  ES = "es-ES",
}

export type Locale = LOCALES;

type LocaleValues = Record<LOCALES, { value: string; caption: string }>;

export const localeValues: LocaleValues = {
  "es-ES": { value: LOCALES.ES, caption: "Español" },
  "en-UK": { value: LOCALES.EN, caption: "English" },
};
