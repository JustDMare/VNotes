import { useEditorStore } from "@/stores/editor";

export default function deleteBlockCommand(blockId: string): () => void {
  return function (): void {
    const editorStore = useEditorStore();
    editorStore.deleteBlockById(blockId);
  };
}
