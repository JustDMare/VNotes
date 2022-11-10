import { useMainStore } from "@/stores/main";
import { unref, type Ref } from "vue";

export function useTextBasedBlock(blockID: Ref<string>) {
  const mainStore = useMainStore();
  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      addNewBlockBelow();
    }
  }
  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    mainStore.updateBlockContent(unref(blockID), input.innerText);
  }

  // HELPER FUNCTIONS
  function addNewBlockBelow() {
    console.log(blockID);
    mainStore.createBlockBelowBlockID(unref(blockID));
  }

  return { parseSpecialKeys, processInput };
}
