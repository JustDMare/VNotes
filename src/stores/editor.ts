import { noteBlocks } from "@/mock-data/note-mock";
import { userSpaceMock } from "@/mock-data/workspace-mock";
import type {
  Block,
  Note,
  UserSpace,
  PlainTextBlock,
  BlockUniqueProperties,
  AllPropertyTypes,
} from "@/types";

import { defineStore } from "pinia";
import { reactive } from "vue";

export const useEditorStore = defineStore("editor", {
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
    //TODO: DOCUMENTATE ACTIONS
    updateNoteTitle(content: string): void {
      //TODO: Check for errors
      this.noteInEditor.title = content;
    },
    updateBlockContent(blockID: string, content: string): void {
      const block = this.getBlockInEditorById(blockID);
      if (block) {
        //TODO: Check for errors
        block.content = content;
      }
    },
    updateBlockUniqueProperty(
      blockID: string,
      uniqueProperty: keyof BlockUniqueProperties,
      uniquePropertyValue: AllPropertyTypes<BlockUniqueProperties>
    ): void {
      //TODO: Check for errors
      const block = this.getBlockInEditorById(blockID);
      if (block) {
        block.uniqueProperties[uniqueProperty] = uniquePropertyValue;
      }
    },

    createBlockBelowBlockID(previousBlockID?: string): void {
      //TODO: Check for errors
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
        uniqueProperties: {},
      };
      this.blockCreated = true;
      this.noteInEditor.content.splice(newBlockIndex, 0, newBlock);
    },
    setBlockCreated(blockCreated: boolean): void {
      this.blockCreated = blockCreated;
    },
  },
});
