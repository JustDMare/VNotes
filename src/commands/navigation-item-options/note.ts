import { useDialogEventStore } from "@/stores/dialog-event";
import { MoveItemIcon, TrashIcon } from "@/components/icons";
import type { NavigationItemOption } from "./interfaces";
import { i18n } from "@/i18n/i18n.plugin";
import RenameIcon from "@/components/icons/RenameIcon.vue";

/**
 * Returns an array of predefined `NavigationItemOptions` for a note, given its
 * `noteId` and `noteTitle`.
 *
 * @param {string} noteId - The ID of the note for which the `NavigationItemOptions`
 * are customized.
 * @param {string} noteTitle - The title of the note for which the
 * `NavigationItemOptions` are customized.
 */
export function getNoteOptions(noteId: string, noteTitle: string): NavigationItemOption[] {
  const dialogEventStore = useDialogEventStore();
  const t = i18n.global.t;
  return [
    {
      name: t("navigationItemOptions.rename"),
      icon: RenameIcon,
      dataTest: "nav-rename-note",
      execute: () => {
        dialogEventStore.openRenameItemDialog("rename-note", noteId, noteTitle);
      },
    },
    {
      name: t("navigationItemOptions.moveItem"),
      icon: MoveItemIcon,
      dataTest: "nav-move-note",
      execute: () => {
        dialogEventStore.openMoveItemDialog("move-note", noteId, noteTitle);
      },
    },
    {
      name: t("navigationItemOptions.delete"),
      icon: TrashIcon,
      dataTest: "nav-delete-note",
      execute: () => {
        dialogEventStore.openDeleteItemDialog("delete-note", noteId, noteTitle);
      },
    },
  ];
}
