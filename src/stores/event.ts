import { defineStore } from "pinia";

//TODO: Move to a separate file?
export interface CreateAndRenameItemDialogEvent {
  isOpen: boolean;
  type: "create-folder" | "rename-folder" | "create-note" | "rename-note" | null;
  renamedItemId: string | null;
  parentFolderId: string | null;
}

export const useEventStore = defineStore("event", {
  state: () => ({
    createAndRenameItemDialogEvent: {
      isOpen: false,
      type: null,
      renamedItemId: null,
      parentFolderId: null,
    } as CreateAndRenameItemDialogEvent,
  }),
  getters: {},
  actions: {
    openCreateItemDialog(
      type: NonNullable<CreateAndRenameItemDialogEvent["type"]>,
      parentFolderId: string | null = null
    ) {
      Object.assign(this.createAndRenameItemDialogEvent, {
        isOpen: true,
        type,
        parentFolderId,
      });
    },
    openRenameItemDialog(
      type: NonNullable<CreateAndRenameItemDialogEvent["type"]>,
      renamedItemId: string
    ) {
      Object.assign(this.createAndRenameItemDialogEvent, {
        isOpen: true,
        type,
        renamedItemId,
      });
    },
    closeCreateAndRenameItemDialog() {
      Object.assign(this.createAndRenameItemDialogEvent, {
        isOpen: false,
        type: null,
        parentFolderId: null,
        renamedItemId: null,
      });
    },
  },
});
