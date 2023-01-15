import { useEditorStore } from "@/stores/editor";

export default function deleteBlockCommand(): () => void {
  return function (): void {
    const editorStore = useEditorStore();
    const block = editorStore.blockOpeningCommandPalette;
    if (block) {
      editorStore.deleteBlockById(block._id);
    }
  };
}
