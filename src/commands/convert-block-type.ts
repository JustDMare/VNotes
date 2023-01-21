import { useEditorStore } from "@/stores/editor";
import type { Block, BlockType } from "vnotes-types";

//TODO: Document
export default function convertBlockTypeCommand(blockType: BlockType): () => void {
  return function (): void {
    const editorStore = useEditorStore();
    const block = editorStore.blockOpeningCommandPalette;
    if (block) {
      handleBlockConversion(block, blockType);
    }
  };
}
//TODO: Modify so that conversion is done in the store
function handleBlockConversion(block: Block, blockType: BlockType) {
  if (block.type === blockType) {
    return;
  }
  //TODO: Add to testing findings that a block returned from backend (not newly created)
  //used to break when converting to a block type that had unique properties because of
  //the lack of `block.uniqueProperties === undefined` check
  if (
    blockType === "checkbox" &&
    (block.uniqueProperties === undefined ||
      block.uniqueProperties.selected === undefined)
  ) {
    block.uniqueProperties = { selected: false };
  }
  block.type = blockType;
}
