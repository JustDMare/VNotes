import { defineStore } from "pinia";

interface CreateAndRenameItemDialogEvent {
  isOpen: boolean;
  type: "create-folder" | "rename-folder" | "create-note" | "rename-note" | null;
  renamedFolderId: string | null;
  parentFolderId: string | null;
}

export const useEventStore = defineStore("event", {
  state: () => ({
    createAndRenameItemDialogEvent: {
      isOpen: false,
      type: null,
      renamedFolderId: null,
      parentFolderId: null,
    } as CreateAndRenameItemDialogEvent,
  }),
  getters: {},
  actions: {
    openCreateAndRenameItemDialog(
      type: NonNullable<CreateAndRenameItemDialogEvent["type"]>,
      parentFolderId: string | null = null,
      renamedFolderId: string | null = null
    ) {
      Object.assign(this.createAndRenameItemDialogEvent, {
        isOpen: true,
        type,
        parentFolderId,
        renamedFolderId,
      });
    },
    closeCreateAndRenameItemDialog() {
      Object.assign(this.createAndRenameItemDialogEvent, {
        isOpen: false,
        type: null,
        parentFolderId: null,
        renamedFolderId: null,
      });
    },
  },
});
