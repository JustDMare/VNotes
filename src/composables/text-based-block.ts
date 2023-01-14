import { useEditorStore } from "@/stores/editor";
import type { Block } from "vnotes-types";
import { ref, unref, watch, type Ref } from "vue";

export function useTextBasedBlock(block: Block) {
  const initialBlockContent: Ref<string> = ref(block.content);
  const blockHTMLContent: Ref<HTMLElement | null> = ref(null);

  const editorStore = useEditorStore();

  //TODO: Documentar que este watch comprueba los cambios que
  //puedan venir de la store central para sustituir los datos actuales por los heredados
  // Sirve como failsafe para guardar los datos previos en caso de error.
  //TODO: Mencionarlo en la documentacion y en la presentacion
  watch(
    () => block.content,
    (inheritedContent) => {
      if (blockHTMLContent.value?.innerText !== inheritedContent) {
        initialBlockContent.value = inheritedContent;
      }
    }
  );

  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.key === "/") {
      editorStore.setCommandPaletteOpen(true);
    }
    if (event.code === "Enter" && !event.shiftKey) {
      event.preventDefault();
      editorStore.createBlockBelowBlockId(unref(block._id));
    }
  }

  function processInput(event: Event) {
    const input = event.target as HTMLElement;
    editorStore.updateBlockContent(unref(block._id), input.innerText);
  }

  return {
    initialBlockContent,
    blockHTMLContent,
    parseSpecialKeys,
    processInput,
  };
}
