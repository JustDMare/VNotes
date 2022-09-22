import { defineStore } from "pinia";
import { noteBlocks } from "@/mock-data/note-mock";
import { reactive } from "vue";
import type { Block, Note } from "@/types";

export const useMainStore = defineStore("main", {
  state: () => ({
    noteInEditor: reactive(noteBlocks) as Note,
  }),
  getters: {
    getBlockInEditorById: (state) => {
      return (blockId: string) =>
        state.noteInEditor.content.find(
          (block: Block) => block.blockId === blockId
        );
    },
  },
  actions: {
    updateBlockContentInEditor(blockId: string, content: string) {
      const block = this.getBlockInEditorById(blockId);
      if (block) {
        //Check for errors
        block.content = content;
      }
    },
  },
});
