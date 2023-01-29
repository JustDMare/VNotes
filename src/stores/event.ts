import { defineStore } from "pinia";

export const useEventStore = defineStore("event", {
  state: () => ({
    nameFolderOrNoteDialog: {
      isOpen: false,
      type: null as "folder" | "note" | null,
      title: "",
      mainButtonText: "",
      inputPlaceholder: "",
    },
  }),
  getters: {},
  actions: {
    openNameFolderOrNoteDialog(
      title: string,
      mainButtonText: string,
      inputPlaceholder: string,
      type: "folder" | "note"
    ) {
      Object.assign(this.nameFolderOrNoteDialog, {
        isOpen: true,
        type,
        title,
        mainButtonText,
        inputPlaceholder,
      });
    },
    closeNameFolderOrNoteDialog() {
      Object.assign(this.nameFolderOrNoteDialog, {
        isOpen: false,
        type: null,
        title: "",
        mainButtonText: "",
        inputPlaceholder: "",
      });
    },
  },
});
