import { useMainStore } from "@/stores/main";
import type { Block } from "@/types";

export function useTextBasedBlock(block: Block) {
  const mainStore = useMainStore();
  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      AddNewBlockBelow();
    }
  }
  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    mainStore.updateBlockContentInEditor(block.blockId, input.innerText);
  }

  // HELPER FUNCTIONS
  function AddNewBlockBelow() {
    mainStore.createBlockInEditor(block.blockId);
  }

  return { parseSpecialKeys, processInput };
}
