import { defineStore } from "pinia";
import { noteBlocks } from "@/mock-data/note-mock";
import { reactive } from "vue";
import type { Note } from "@/types";

export const useMainStore = defineStore("main", {
  state: () => ({
    noteInEditor: reactive(noteBlocks) as Note,
  }),
  getters: {},
  actions: {},
});
