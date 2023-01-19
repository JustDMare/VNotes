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
  /*TODO: Mencionarlo en la documentacion y en la presentacion. Mencionar tambien que se
   debe a que la prop, al ser un objeto y Vue no es capaz de impedir que se cambien sus
   propiedades (ni lanzar warnings), se debe usar un atributo no reactivo para guardar el
   estado inicial y compararlo con el actual. Ademas, si fuese reactivo, el problema seria
   que al cambiar el estado inicial, el componente se renderiza otra vez, lo que hace que
   se resetee el foco del input al principio de la linea. 
   */
  watch(
    () => block.content,
    (inheritedContent) => {
      if (blockHTMLContent.value?.innerText !== inheritedContent) {
        initialBlockContent.value = inheritedContent;
      }
    }
  );

  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      editorStore.saveNoteChanges();
    }
    if (event.key === "/") {
      editorStore.setCommandPaletteOpen(true);
      editorStore.setBlockOpeningCommandPalette(block);
    }

    if (event.code === "Enter" && !event.shiftKey && !editorStore.commandPaletteOpen) {
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
