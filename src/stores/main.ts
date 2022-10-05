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
          (block: Block) => block.blockID === blockId
        );
    },
  },
  actions: {
    //DOCUMENTATE ACTIONS
    updateNoteInEditorTitle(content: string): void {
      //Check for errors
      this.noteInEditor.title = content;
    },
    updateBlockContentInEditor(blockId: string, content: string): void {
      const block = this.getBlockInEditorById(blockId);
      if (block) {
        //Check for errors
        block.content = content;
      }
    },
    createBlockInEditor(previousBlockId?: string): void {
      //Check for errors
      let newBlockIndex: number;
      if (previousBlockId) {
        const previousBlockIndex = this.noteInEditor.content.findIndex(
          (block: Block) => block.blockID === previousBlockId
        );
        newBlockIndex = previousBlockIndex + 1;
      } else {
        newBlockIndex = 0;
      }
      const newBlock: TextBlock = {
        type: "text",
        blockID: crypto.randomUUID(),
        parentID: this.noteInEditor.noteID,
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
