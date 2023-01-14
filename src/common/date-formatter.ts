import { i18n } from "@/i18n/i18n.plugin";
import { localeValues } from "@/i18n/i18n.types";
export function formatLongDateAndTime(timestamp: number | string): string {
  const date = new Date(Number(timestamp));
  const locale = localeValues[i18n.global.locale.value].value;
  const localizedDate = date.toLocaleString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return localizedDate;
}
