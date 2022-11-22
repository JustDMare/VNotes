import { noteBlocks } from "@/mock-data/note-mock";
import { userSpaceMock } from "@/mock-data/workspace-mock";
import type {
  AllPropertyTypesFromInterface,
  Block,
  BlockType,
  BlockUniqueProperties,
  CheckboxBlock,
  Note,
  PlainTextBlock,
  UserSpace,
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
      uniquePropertyValue: AllPropertyTypesFromInterface<BlockUniqueProperties>
    ): void {
      //TODO: Check for errors
      const block = this.getBlockInEditorById(blockID);
      if (block) {
        block.uniqueProperties[uniqueProperty] = uniquePropertyValue;
      }
    },

    createBlockBelowTitle() {
      const newBlock = getNewBlockTemplate(this.noteInEditor.noteID);
      this.addBlockToNote(0, newBlock);
    },

    createBlockBelowBlockID(previousBlockID: string): void {
      //TODO: Check for errors
      const previousBlockIndex = this.noteInEditor.content.findIndex(
        (block: Block) => block.blockID === previousBlockID
      );
      const newBlockIndex = previousBlockIndex + 1;
      const previousBlockType =
        this.getBlockInEditorById(previousBlockID)?.type;

      const newBlock = getNewBlockTemplate(
        this.noteInEditor.noteID,
        previousBlockType
      );
      this.addBlockToNote(newBlockIndex, newBlock);
    },
    addBlockToNote(blockIndex: number, block: Block) {
      this.setBlockCreated(true);
      this.noteInEditor.content.splice(blockIndex, 0, block);
    },
    setBlockCreated(blockCreated: boolean): void {
      this.blockCreated = blockCreated;
    },
  },
});
//Documentar
function newBlockTemplate(parentID: string): Block {
  return {
    type: "text",
    blockID: crypto.randomUUID(),
    parentID: parentID,
    createdTime: String(Date.now()),
    lastUpdatedTime: String(Date.now()),
    content: "",
    uniqueProperties: {},
  };
}
//Documentar
function getNewBlockTemplate(noteID: string, type?: BlockType): Block {
  const newBlock: Block = newBlockTemplate(noteID);
  newBlock.parentID = noteID;
  if (type === "checkbox") {
    console.log(newBlock);
    newBlock.type = "checkbox";
    newBlock.uniqueProperties.selected = false;
    console.log(newBlock);
    return <CheckboxBlock>newBlock;
  }
  return <PlainTextBlock>newBlock;
}
