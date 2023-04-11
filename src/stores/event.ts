import { defineStore } from "pinia";

//TODO: Move to a separate file?
export interface CreateItemDialogEvent {
  isOpen: boolean;
  type: "create-folder" | "create-note" | null;
  parentFolderId: string | null;
}
export interface RenameItemDialogEvent {
  isOpen: boolean;
  type: "rename-folder" | "rename-note" | null;
  renamedItemId: string | null;
  renamedItemName: string | null;
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
  movedItemName: string | null;
  newParentId: string | null;
}

export interface UserSettingsDialogEvent {
  isOpen: boolean;
}

export const useEventStore = defineStore("event", {
  state: () => ({
    createItemDialogEvent: {
      isOpen: false,
      type: null,
      parentFolderId: null,
    } as CreateItemDialogEvent,
    renameItemDialogEvent: {
      isOpen: false,
      type: null,
      renamedItemId: null,
      renamedItemName: null,
    } as RenameItemDialogEvent,
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
    userSettingsDialogEvent: {
      isOpen: false,
    } as UserSettingsDialogEvent,
  }),
  getters: {},
  actions: {
    openCreateItemDialog(
      type: NonNullable<CreateItemDialogEvent["type"]>,
      parentFolderId: string | null = null
    ) {
      Object.assign(this.createItemDialogEvent, {
        isOpen: true,
        type,
        parentFolderId,
      });
    },
    openRenameItemDialog(
      type: NonNullable<RenameItemDialogEvent["type"]>,
      renamedItemId: string,
      renamedItemName: string
    ) {
      Object.assign(this.renameItemDialogEvent, {
        isOpen: true,
        type,
        renamedItemId,
        renamedItemName,
      });
    },
    closeCreateItemDialog() {
      Object.assign(this.createItemDialogEvent, {
        isOpen: false,
        type: null,
        parentFolderId: null,
      });
    },
    closeRenameItemDialog() {
      Object.assign(this.createItemDialogEvent, {
        isOpen: false,
        type: null,
        renamedItemId: null,
        renamedItemName: null,
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
      type: NonNullable<MoveItemDialogEvent["type"]>,

      movedItemId: string,
      movedItemName: string
    ) {
      Object.assign(this.moveItemDialogEvent, {
        isOpen: true,
        type,
        movedItemId,
        movedItemName,
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
    openUserSettingsDialog() {
      Object.assign(this.userSettingsDialogEvent, {
        isOpen: true,
      });
    },
    closeUserSettingsDialog() {
      Object.assign(this.userSettingsDialogEvent, {
        isOpen: false,
      });
    },
  },
});
