import { useEditorStore } from "@/stores/editor";
import type { BlockType } from "vnotes-types";
import type { Executor } from "../interfaces";

/**
 * Returns an `Executor` that converts the block from which the command palette was opened
 * to the given `BlockType`.
 *
 * @param {BlockType} blockType - new `BlockType` to convert the block to.
 * @returns {Executor} The executor.
 */
export default function convertBlockTypeCommand(blockType: BlockType): Executor {
  return function (): void {
    const editorStore = useEditorStore();
    const block = editorStore.blockOpeningCommandPalette;
    if (block) {
      editorStore.convertBlockType(block._id, blockType);
    }
  };
}
