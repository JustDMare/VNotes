import { useEventStore } from "@/stores/event";
import { NoteIcon } from "@/components/icons";
import type { NavigationItemOption } from "./interfaces";
import { i18n } from "@/i18n/i18n.plugin";

export function getFolderOptions(folderId: string): NavigationItemOption[] {
  const eventStore = useEventStore();
  const t = i18n.global.t;
  return [
    {
      name: t("navigationItemOptions.newFolder"),
      icon: NoteIcon,
      action: () => {
        eventStore.openCreateItemDialog("create-folder", folderId);
      },
    },
    {
      name: t("navigationItemOptions.newNote"),
      icon: NoteIcon,
      action: () => {
        eventStore.openCreateItemDialog("create-note", folderId);
      },
    },
    {
      name: t("navigationItemOptions.rename"),
      icon: NoteIcon,
      action: () => {
        eventStore.openRenameItemDialog("rename-folder", folderId);
      },
    },
    {
      name: t("navigationItemOptions.delete"),
      icon: NoteIcon,
      action: () => {
        console.log("Delete");
      },
    },
  ];
}
