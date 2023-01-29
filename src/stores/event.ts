import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
    nameFolderOrNoteDialog: {
      isOpen: false,
    },
  }),
  getters: {},
  actions: {
    nameFolderOrNoteDialog: {
      setNameFolderOrNoteDialogOpen(isOpen: boolean): void {
        this.nameFolderOrNoteDialog.isOpen = isOpen;
      },
    },
  },
});
