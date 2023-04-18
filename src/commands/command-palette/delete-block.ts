import { useEditorStore } from "@/stores/editor";
import type { Executor } from "../interfaces";

/**
 * Returns an `Executor` that deletes the block from which the command palette was opened.
 *
 * @returns {Executor} The executor.
 */
export default function deleteBlockCommand(): Executor {
  return function (): void {
    const editorStore = useEditorStore();
    const block = editorStore.blockOpeningCommandPalette;
    if (block) {
      editorStore.deleteBlockById(block._id);
    }
  };
}
