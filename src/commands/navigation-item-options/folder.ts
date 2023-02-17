import { useEventStore } from "@/stores/event";
import { MoveItemIcon, NewFolderIcon, NewNoteIcon, TrashIcon } from "@/components/icons";
import type { NavigationItemOption } from "./interfaces";
import { i18n } from "@/i18n/i18n.plugin";
import RenameIcon from "@/components/icons/RenameIcon.vue";

export function getFolderOptions(folderId: string, folderName: string): NavigationItemOption[] {
  const eventStore = useEventStore();
  const t = i18n.global.t;
  return [
    {
      name: t("navigationItemOptions.newFolder"),
      icon: NewFolderIcon,
      execute: () => {
        eventStore.openCreateItemDialog("create-folder", folderId);
      },
    },
    {
      name: t("navigationItemOptions.newNote"),
      icon: NewNoteIcon,
      execute: () => {
        eventStore.openCreateItemDialog("create-note", folderId);
      },
    },
    {
      name: t("navigationItemOptions.rename"),
      icon: RenameIcon,
      execute: () => {
        eventStore.openRenameItemDialog("rename-folder", folderId);
      },
    },
    {
      name: t("navigationItemOptions.moveItem"),
      icon: MoveItemIcon,
      execute: () => {
        console.log("Move");
      },
    },
    {
      name: t("navigationItemOptions.delete"),
      icon: TrashIcon,
      execute: () => {
        eventStore.openDeleteItemDialog("delete-folder", folderId, folderName);
      },
    },
  ];
}
