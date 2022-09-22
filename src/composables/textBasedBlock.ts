import { useMainStore } from "@/stores/main";
import type { Block } from "@/types";

export function useTextBasedBlock(block: Block) {
  const mainStore = useMainStore();

  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.code === "Enter") {
      console.log(mainStore.getBlockInEditorById(block.blockId));
    }
  }
  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    mainStore.updateBlockContentInEditor(block.blockId, input.innerText);
  }

  return { parseSpecialKeys, processInput };
}
