import { useEventStore } from "@/stores/event";
import { NewFolderIcon, NewNoteIcon, TrashIcon } from "@/components/icons";
import type { NavigationItemOption } from "./interfaces";
import { i18n } from "@/i18n/i18n.plugin";
import RenameIcon from "@/components/icons/RenameIcon.vue";

export function getFolderOptions(folderId: string): NavigationItemOption[] {
  const eventStore = useEventStore();
  const t = i18n.global.t;
  return [
    {
      name: t("navigationItemOptions.newFolder"),
      icon: NewFolderIcon,
      action: () => {
        eventStore.openCreateItemDialog("create-folder", folderId);
      },
    },
    {
      name: t("navigationItemOptions.newNote"),
      icon: NewNoteIcon,
      action: () => {
        eventStore.openCreateItemDialog("create-note", folderId);
      },
    },
    {
      name: t("navigationItemOptions.rename"),
      icon: RenameIcon,
      action: () => {
        eventStore.openRenameItemDialog("rename-folder", folderId);
      },
    },
    {
      name: t("navigationItemOptions.delete"),
      icon: TrashIcon,
      action: () => {
        console.log("Delete");
      },
    },
  ];
}
