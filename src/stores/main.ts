import { noteBlocks } from "@/mock-data/note-mock";
import { userSpaceMock } from "@/mock-data/workspace-mock";
import type { Block, Note, UserSpace, PlainTextBlock } from "@/types";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMainStore = defineStore("main", {
  state: () => ({
    noteInEditor: reactive(noteBlocks) as Note,
    blockCreated: false as boolean,
    userSpace: userSpaceMock as UserSpace,
  }),

  getters: {
    getBlockInEditorById: (state) => {
      return (blockID: string) =>
        state.noteInEditor.content.find(
          (block: Block) => block.blockID === blockID
        );
    },
  },
  actions: {
    //DOCUMENTATE ACTIONS
    updateNoteInEditorTitle(content: string): void {
      //Check for errors
      this.noteInEditor.title = content;
    },
    updateBlockContentInEditor(blockID: string, content: string): void {
      const block = this.getBlockInEditorById(blockID);
      if (block) {
        //Check for errors
        block.content = content;
      }
    },
    createBlockInEditor(previousBlockID?: string): void {
      //Check for errors
      let newBlockIndex: number;
      if (previousBlockID) {
        const previousBlockIndex = this.noteInEditor.content.findIndex(
          (block: Block) => block.blockID === previousBlockID
        );
        newBlockIndex = previousBlockIndex + 1;
      } else {
        newBlockIndex = 0;
      }
      const newBlock: PlainTextBlock = {
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
