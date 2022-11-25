import { useEditorStore } from "@/stores/editor";
import type { Block } from "@/types";
import { ref, unref, watch, type Ref } from "vue";

export function useTextBasedBlock(block: Block) {
  const initialBlockContent: Ref<string> = ref(block.content);
  const blockHTMLContent: Ref<HTMLElement | null> = ref(null);

  const editorStore = useEditorStore();

  //TODO: Documentar que este watch comprueba los cambios que
  //puedan venir de la store central para sustituir los datos actuales por los heredados
  // Sirve como failsafe para guardar los datos previos en caso de error.
  watch(
    () => block.content,
    (inheritedContent) => {
      if (blockHTMLContent.value?.innerText !== inheritedContent) {
        initialBlockContent.value = inheritedContent;
      }
    }
  );

  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      editorStore.createBlockBelowBlockID(unref(block.blockID));
    }
  }

  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    editorStore.updateBlockContent(unref(block.blockID), input.innerText);
  }

  return {
    initialBlockContent,
    blockHTMLContent,
    parseSpecialKeys,
    processInput,
  };
}
