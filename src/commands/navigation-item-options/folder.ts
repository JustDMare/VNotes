import { useEventStore } from "@/stores/event";
import { MoveItemIcon, NewFolderIcon, NewNoteIcon, TrashIcon } from "@/components/icons";
import type { NavigationItemOption } from "./interfaces";
import { i18n } from "@/i18n/i18n.plugin";
import RenameIcon from "@/components/icons/RenameIcon.vue";
import type { Ref } from "vue";

/**
 * Returns an array of predefined `NavigationItemOptions` for a folder, given its
 * `folderId` and `folderName`.
 *
 * @param {string} folderId - The ID of the folder for which the `NavigationItemOptions`
 * are customized.
 * @param {string} folderName - The name of the folder for which the
 * `NavigationItemOptions` are customized.
 */
export function getFolderOptions(
  folderId: string,
  folderName: Ref<string>
): NavigationItemOption[] {
  const eventStore = useEventStore();
  const t = i18n.global.t;
  return [
    {
      name: t("navigationItemOptions.newFolder"),
      icon: NewFolderIcon,
      dataTest: "nav-create-folder",
      execute: () => {
        eventStore.openCreateItemDialog("create-folder", folderId);
      },
    },
    {
      name: t("navigationItemOptions.newNote"),
      icon: NewNoteIcon,
      dataTest: "nav-create-note",
      execute: () => {
        eventStore.openCreateItemDialog("create-note", folderId);
      },
    },
    {
      name: t("navigationItemOptions.rename"),
      icon: RenameIcon,
      dataTest: "nav-rename-folder",
      execute: () => {
        eventStore.openRenameItemDialog("rename-folder", folderId, folderName.value);
      },
    },
    {
      name: t("navigationItemOptions.moveItem"),
      icon: MoveItemIcon,
      dataTest: "nav-move-folder",
      execute: () => {
        eventStore.openMoveItemDialog("move-folder", folderId, folderName.value);
      },
    },
    {
      name: t("navigationItemOptions.delete"),
      icon: TrashIcon,
      dataTest: "nav-delete-folder",
      execute: () => {
        eventStore.openDeleteItemDialog("delete-folder", folderId, folderName.value);
      },
    },
  ];
}
