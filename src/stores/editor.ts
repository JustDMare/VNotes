import { useUserSpaceStore } from "@/stores/user-space";
import type {
  AllPropertyTypesFromInterface,
  Block,
  BlockType,
  BlockUniqueProperties,
  CheckboxBlock,
  PlainTextBlock,
  Note,
} from "vnotes-types";

import { defineStore } from "pinia";

export const useEditorStore = defineStore("editor", {
  state: () => ({
    noteInEditor: null as Note | null,
    blockCreated: false as boolean,
    commandPaletteOpen: false as boolean,
  }),

  getters: {
    getBlockInEditorById: (state) => {
      return (_id: string) =>
        state.noteInEditor?.content.find((block: Block) => block._id === _id);
    },
  },
  actions: {
    //TODO: Document and better error handling
    fetchNote(noteId: string) {
      fetch(`http://localhost:3030/notes/${noteId}`)
        .then((data) => data.json())
        .then((json) => {
          this.noteInEditor = json.note;
        })
        .catch((error) => {
          this.noteInEditor = null;
          console.log(error);
        });
    },
    //TODO: Document and better error handling
    saveNoteChanges() {
      if (this.noteInEditor) {
        fetch("http://localhost:3030/notes/update-content", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            _id: this.noteInEditor._id,
            title: this.noteInEditor.title,
            content: this.noteInEditor.content,
          }),
        })
          .then((data) => data.json())
          .then((json) => {
            const userSpaceStore = useUserSpaceStore();
            userSpaceStore.fetchAllUserSpaceContent();
            this.noteInEditor = json.note;
          })
          .catch((error) => console.log(error));
      }
    },

    //TODO: DOCUMENT ACTIONS
    updateNoteTitle(content: string): void {
      //TODO: Check for errors
      if (this.noteInEditor) {
        this.noteInEditor.title = content;
      }
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
      const newBlock = getNewBlockTemplate();
      this.addBlockToNote(0, newBlock);
    },

    createBlockBelowBlockId(previousBlockId: string): void {
      //TODO: Check for errors
      if (this.noteInEditor) {
        const previousBlockIndex = this.noteInEditor.content.findIndex(
          (block: Block) => block._id === previousBlockId
        );
        const newBlockIndex = previousBlockIndex + 1;
        const previousBlockType =
          this.getBlockInEditorById(previousBlockId)?.type;

        const newBlock = getNewBlockTemplate(previousBlockType);
        this.addBlockToNote(newBlockIndex, newBlock);
      }
    },
    addBlockToNote(blockIndex: number, block: Block) {
      if (this.noteInEditor) {
        this.setBlockCreated(true);
        this.noteInEditor.content.splice(blockIndex, 0, block);
      }
    },
    setBlockCreated(blockCreated: boolean): void {
      this.blockCreated = blockCreated;
    },
    setCommandPaletteOpen(commandPaletteOpen: boolean): void {
      this.commandPaletteOpen = commandPaletteOpen;
    },
  },
});
//TODO: Documentar
function newBlockTemplate(): Block {
  return {
    type: "text",
    _id: crypto.randomUUID(),
    content: "",
    uniqueProperties: {},
  };
}
//TODO: Documentar
function getNewBlockTemplate(type?: BlockType): Block {
  const newBlock: Block = newBlockTemplate();
  if (type === "checkbox") {
    newBlock.type = "checkbox";
    newBlock.uniqueProperties.selected = false;
    return <CheckboxBlock>newBlock;
  }
  return <PlainTextBlock>newBlock;
}
