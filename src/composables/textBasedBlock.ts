import { useMainStore } from "@/stores/main";
import type { Block } from "@/types";

export function useTextBasedBlock(block: Block) {
  const mainStore = useMainStore();
  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addNewBlockBelow();
    }
  }
  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    mainStore.updateBlockContent(block.blockID, input.innerText);
  }

  // HELPER FUNCTIONS
  function addNewBlockBelow() {
    mainStore.createBlockBelowBlockID(block.blockID);
  }

  return { parseSpecialKeys, processInput };
}
