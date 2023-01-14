import { i18n } from "@/i18n/i18n.plugin";
export function formatLongDateAndTime(timestamp: number | string): string {
  const date = new Date(Number(timestamp));
  const localizedDate = date.toLocaleString(i18n.global.locale.value, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return localizedDate;
}
