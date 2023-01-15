import { useEditorStore } from "@/stores/editor";
import type { Block, BlockType } from "vnotes-types";

//TODO: Document
export default function convertBlockTypeCommand(
  blockType: BlockType
): () => void {
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
  if (
    blockType === "checkbox" &&
    block.uniqueProperties.selected === undefined
  ) {
    block.uniqueProperties = { selected: false };
  }
  block.type = blockType;
}
