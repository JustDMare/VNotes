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
      return (_id: string) =>
        state.noteInEditor.content.find((block: Block) => block._id === _id);
    },
  },
  actions: {
    //TODO: DOCUMENTATE ACTIONS
    updateNoteTitle(content: string): void {
      //TODO: Check for errors
      this.noteInEditor.title = content;
    },
    updateBlockContent(_id: string, content: string): void {
      const block = this.getBlockInEditorById(_id);
      if (block) {
        //TODO: Check for errors
        block.content = content;
      }
    },
    updateBlockUniqueProperty(
      _id: string,
      uniqueProperty: keyof BlockUniqueProperties,
      uniquePropertyValue: AllPropertyTypesFromInterface<BlockUniqueProperties>
    ): void {
      //TODO: Check for errors
      const block = this.getBlockInEditorById(_id);
      if (block) {
        block.uniqueProperties[uniqueProperty] = uniquePropertyValue;
      }
    },

    createBlockBelowTitle() {
      const newBlock = getNewBlockTemplate(this.noteInEditor._id);
      this.addBlockToNote(0, newBlock);
    },

    createBlockBelowBlockId(previousBlockId: string): void {
      //TODO: Check for errors
      const previousBlockIndex = this.noteInEditor.content.findIndex(
        (block: Block) => block._id === previousBlockId
      );
      const newBlockIndex = previousBlockIndex + 1;
      const previousBlockType =
        this.getBlockInEditorById(previousBlockId)?.type;

      const newBlock = getNewBlockTemplate(
        this.noteInEditor._id,
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
//TODO: Documentar
function newBlockTemplate(parentId: string): Block {
  return {
    type: "text",
    blockID: crypto.randomUUID(),
    parentId: parentId,
    createdTime: String(Date.now()),
    lastUpdatedTime: String(Date.now()),
    content: "",
    uniqueProperties: {},
  };
}
//TODO: Documentar
function getNewBlockTemplate(_id: string, type?: BlockType): Block {
  const newBlock: Block = newBlockTemplate(_id);
  newBlock.parentId = _id;
  if (type === "checkbox") {
    newBlock.type = "checkbox";
    newBlock.uniqueProperties.selected = false;
    return <CheckboxBlock>newBlock;
  }
  return <PlainTextBlock>newBlock;
}
