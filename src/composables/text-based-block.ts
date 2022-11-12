import { useEditorStore } from "@/stores/editor";
import { unref, type Ref } from "vue";

export function useTextBasedBlock(blockID: Ref<string>) {
  const editorStore = useEditorStore();
  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      editorStore.createBlockBelowBlockID(unref(blockID));
    }
  }
  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    editorStore.updateBlockContent(unref(blockID), input.innerText);
  }

  return { parseSpecialKeys, processInput };
}
