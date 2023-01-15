import { useEditorStore } from "@/stores/editor";
import type { BlockType } from "vnotes-types";

export default function convertBlockTypeCommand(
  blockId: string,
  blockType: BlockType
): () => void {
  return function (): void {
    const editorStore = useEditorStore();
    const block = editorStore.getBlockInEditorById(blockId);
    if (block) {
      block.type = blockType;
    }
  };
}
