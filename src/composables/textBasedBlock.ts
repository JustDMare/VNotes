import { useMainStore } from "@/stores/main";
import type { Block } from "@/types";
import type { Ref } from "vue";

export function useTextBasedBlock(block: Block) {
  const mainStore = useMainStore();

  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.code === "Enter" && event.shiftKey) {
      createNewLine(event);
    }
  }
  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    mainStore.updateBlockContentInEditor(block.blockId, input.innerText);
  }

  // HELPER FUNCTIONS

  function createNewLine(event: KeyboardEvent) {
    event.preventDefault();
    const windowSelection = window.getSelection();

    if (windowSelection?.rangeCount) {
      const range = windowSelection.getRangeAt(0);
      const cursorPosition = window.getSelection()?.getRangeAt(0).startOffset;
      if (cursorPosition !== undefined) {
        const oldBlockContent = block.content;
        const newBlockContent =
          oldBlockContent.substring(0, cursorPosition) +
          "\n" +
          oldBlockContent.substring(cursorPosition);
        block.content = newBlockContent;
        //mainStore.updateBlockContentInEditor(block.blockId, newBlockContent);
      }
    }
  }

  return { parseSpecialKeys, processInput };
}
