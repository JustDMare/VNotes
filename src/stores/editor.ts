import { useAuth0 } from "@auth0/auth0-vue";
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
    blockOpeningCommandPalette: null as Block | null,
    isSavingNote: false as boolean,
    auth0: useAuth0(),
  }),

  getters: {
    getBlockInEditorById: (state) => {
      return (_id: string) => state.noteInEditor?.content.find((block: Block) => block._id === _id);
    },
  },
  actions: {
    //TODO: Document and better error handling
    async fetchNote(noteId: string) {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch(`http://localhost:3030/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
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
      if (!this.noteInEditor) {
        return;
      }
      this.isSavingNote = true;
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
          if (!this.noteInEditor) {
            this.noteInEditor = json.note;
          } else {
            this.noteInEditor._id = json.note._id;
            this.noteInEditor.parentId = json.note.parentId;
            this.noteInEditor.content = json.note.content;
            this.noteInEditor.title = json.note.title;
            this.noteInEditor.createdTime = json.note.createdTime;
            this.noteInEditor.lastUpdatedTime = json.note.lastUpdatedTime;
          }
        })
        .catch((error) => console.log(error));
      setTimeout(() => {
        // It's so fast that I need this timeout so I can showcase my spinning donut :D
        this.isSavingNote = false;
      }, 500);
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
    convertBlockType(id: string, blockType: BlockType): void {
      const block = this.getBlockInEditorById(id);
      if (!block) {
        return;
      }
      if (block.type === blockType) {
        return;
      }
      //TODO: Add to testing findings that a block returned from backend (not newly
      //created) used to break when converting to a block type that had unique properties
      //because of the lack of `block.uniqueProperties === undefined` check
      if (
        blockType === "checkbox" &&
        (!block.uniqueProperties || block.uniqueProperties.selected === undefined)
      ) {
        block.uniqueProperties = { selected: false };
      }
      block.type = blockType;
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
        const previousBlockType = this.getBlockInEditorById(previousBlockId)?.type;

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
    setBlockOpeningCommandPalette(block: Block): void {
      this.blockOpeningCommandPalette = block;
    },
    deleteBlockById(blockId: string): void {
      if (this.noteInEditor) {
        const blockIndex = this.noteInEditor.content.findIndex(
          (block: Block) => block._id === blockId
        );
        this.noteInEditor.content.splice(blockIndex, 1);
      }
    },
    updateNoteContent(content: Block[]): void {
      if (this.noteInEditor) {
        this.noteInEditor.content = content;
      }
    },
    moveBlockInNote(from: number, to: number) {
      if (!this.noteInEditor) {
        return;
      }
      const item = this.noteInEditor.content.splice(from, 1)[0];
      this.noteInEditor.content.splice(to, 0, item);
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
