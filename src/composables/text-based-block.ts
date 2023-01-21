import { useEditorStore } from "@/stores/editor";
import { focusAndAlignCaretInSameVertical } from "@/utils";
import type { Block } from "vnotes-types";
import { onMounted, ref, unref, watch, type Ref } from "vue";

export function useTextBasedBlock(block: Block) {
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
        parseBlockContent();
      }
    }
  );
  onMounted(() => {
    parseBlockContent();
  });
  //DOCUMENTAR Y MENCIONAR EN LA DOCOUMENTACION COMO SE HA TRABAJADO CON LOS NODOS PARA
  //QUE SE PUEDA MOVER EL FOCO DE UN BLOQUE A OTRO.
  function parseBlockContent() {
    const contentToParse = block.content;
    const contentForTextNodes = contentToParse.split("\n");
    console.log(contentForTextNodes);
    if (!contentForTextNodes.length && blockHTMLContent.value) {
      const emptyTextNode = document.createTextNode("");
      blockHTMLContent.value.appendChild(emptyTextNode);
    }
    contentForTextNodes.forEach((nodeContent) => {
      if (blockHTMLContent.value === null) {
        return;
      }
      const textNode = document.createTextNode(nodeContent + "\n");
      blockHTMLContent.value.appendChild(textNode);
    });
  }

  function parseSpecialKeys(event: KeyboardEvent) {
    if (event.key === "ArrowUp") {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        range.collapse(true);
        if (!range.startContainer.previousSibling) {
          event.preventDefault();
          focusPreviousContentEditable();
        }
      }
    }
    if (event.key === "ArrowDown") {
      const selection = window.getSelection();
      if (selection) {
        const range = selection.getRangeAt(0);
        range.collapse(true);
        if (
          !range.startContainer.nextSibling
          // !range.startContainer.nextSibling || (range.startContainer.nextSibling as
          // HTMLElement).className.includes("wrapper")
        ) {
          event.preventDefault();
          focusNextContentEditable();
        }
      }
    }
    if (event.key === "Backspace" && (event.metaKey || event.ctrlKey)) {
      deleteBlockAndFocusPrevious(event);
    } else if (
      event.key === "Backspace" &&
      blockHTMLContent.value?.innerText === "" &&
      !editorStore.commandPaletteOpen
    ) {
      deleteBlockAndFocusPrevious(event);
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

  function deleteBlockAndFocusPrevious(event: KeyboardEvent) {
    event.preventDefault();
    focusPreviousContentEditable();
    editorStore.deleteBlockById(unref(block._id));
  }

  function focusPreviousContentEditable() {
    const elements = findContentEditables();
    const index = elements.findIndex((element) => element === blockHTMLContent.value);
    if (index > 0) {
      const elementToFocus = elements[index - 1];
      focusAndAlignCaretInSameVertical(elementToFocus);
    }
  }
  function focusNextContentEditable() {
    const elements = findContentEditables();
    const index = elements.findIndex((element) => element === blockHTMLContent.value);
    if (index < elements.length - 1) {
      const elementToFocus = elements[index + 1];
      focusAndAlignCaretInSameVertical(elementToFocus);
    }
  }
  function findContentEditables() {
    const elements: HTMLElement[] = Array.from(
      document.getElementsByClassName("note-editor__content-editable")
    ) as HTMLElement[];
    return elements;
  }
  return {
    blockHTMLContent,
    parseSpecialKeys,
    processInput,
  };
}
