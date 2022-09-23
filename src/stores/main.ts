import { noteBlocks } from "@/mock-data/note-mock";
import type { Block, Note } from "@/types";
import type TextBlock from "@/types/blocks/text";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMainStore = defineStore("main", {
  state: () => ({
    noteInEditor: reactive(noteBlocks) as Note,
    blockCreated: false as boolean,
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
    updateBlockContentInEditor(blockId: string, content: string): void {
      const block = this.getBlockInEditorById(blockId);
      if (block) {
        //Check for errors
        block.content = content;
      }
    },
    createBlockInEditor(previousBlockId: string): void {
      const previousBlockIndex = this.noteInEditor.content.findIndex(
        (block: Block) => block.blockId === previousBlockId
      );
      const newBlockIndex = previousBlockIndex + 1;
      const newBlock: TextBlock = {
        type: "text",
        blockId: crypto.randomUUID(),
        parentId: this.noteInEditor.noteId,
        createdTime: String(Date.now()),
        lastUpdatedTime: String(Date.now()),
        content: "",
      };
      this.blockCreated = true;
      this.noteInEditor.content.splice(newBlockIndex, 0, newBlock);
    },
    setBlockCreated(blockCreated: boolean): void {
      this.blockCreated = blockCreated;
    },
  },
});
