import { useEditorStore } from "@/stores/editor";
import { unref, type Ref } from "vue";

export function useTextBasedBlock(blockID: Ref<string>) {
  const editorStore = useEditorStore();
  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addNewBlockBelow();
    }
  }
  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    editorStore.updateBlockContent(unref(blockID), input.innerText);
  }

  // HELPER FUNCTIONS
  function addNewBlockBelow() {
    console.log(blockID);
    editorStore.createBlockBelowBlockID(unref(blockID));
  }

  return { parseSpecialKeys, processInput };
}
