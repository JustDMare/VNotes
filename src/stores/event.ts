import { defineStore } from "pinia";

//TODO: Move to a separate file?
export interface CreateAndRenameItemDialogEvent {
  isOpen: boolean;
  type: "create-folder" | "rename-folder" | "create-note" | "rename-note" | null;
  renamedItemId: string | null;
  parentFolderId: string | null;
}
export interface DeleteItemDialogEvent {
  isOpen: boolean;
  type: "delete-folder" | "delete-note" | null;
  deletedItemId: string | null;
  deletedItemName: string | null;
}

export interface MoveItemDialogEvent {
  isOpen: boolean;
  type: "move-folder" | "move-note" | null;
  movedItemId: string | null;
  newParentId: string | null;
}

export const useEventStore = defineStore("event", {
  state: () => ({
    createAndRenameItemDialogEvent: {
      isOpen: false,
      type: null,
      renamedItemId: null,
      parentFolderId: null,
    } as CreateAndRenameItemDialogEvent,
    deleteItemDialogEvent: {
      isOpen: false,
      type: null,
      deletedItemId: null,
      deletedItemName: null,
    } as DeleteItemDialogEvent,
    moveItemDialogEvent: {
      isOpen: false,
      type: null,
      movedItemId: null,
      newParentId: null,
    } as MoveItemDialogEvent,
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
    openDeleteItemDialog(
      type: NonNullable<DeleteItemDialogEvent["type"]>,
      deletedItemId: string,
      deletedItemName: string
    ) {
      Object.assign(this.deleteItemDialogEvent, {
        isOpen: true,
        type,
        deletedItemId,
        deletedItemName,
      });
    },
    closeDeleteItemDialog() {
      Object.assign(this.deleteItemDialogEvent, {
        isOpen: false,
        type: null,
        deletedItemId: null,
        deletedItemName: null,
      });
    },
    openMoveItemDialog(
      type: NonNullable<DeleteItemDialogEvent["type"]>,
      movedItemId: string,
      newParentId: string
    ) {
      Object.assign(this.moveItemDialogEvent, {
        isOpen: true,
        type,
        movedItemId,
        newParentId,
      });
    },
    closeMoveItemDialog() {
      Object.assign(this.moveItemDialogEvent, {
        isOpen: false,
        type: null,
        movedItemId: null,
        newParentId: null,
      });
    },
  },
});
