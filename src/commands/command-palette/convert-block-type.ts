import { useEditorStore } from "@/stores/editor";
import type { BlockType } from "vnotes-types";

//TODO: Document
export default function convertBlockTypeCommand(blockType: BlockType): () => void {
  return function (): void {
    const editorStore = useEditorStore();
    const block = editorStore.blockOpeningCommandPalette;
    if (block) {
      editorStore.convertBlockType(block._id, blockType);
    }
  };
}
