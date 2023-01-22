import { useEditorStore } from "@/stores/editor";
import {
  focusUpAndAlignCaretInSameVertical,
  focusAndPlaceCaretAtEnd,
  focusDownAndAlignCaretInSameVertical,
} from "@/utils";
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
    if (contentToParse === "") {
      return;
    }
    if (blockHTMLContent.value) {
      blockHTMLContent.value.innerHTML = "";
      const contentForTextNodes = contentToParse.split("\n");
      contentForTextNodes.forEach((nodeContent, index) => {
        if (blockHTMLContent.value === null) {
          return;
        }

        if (nodeContent.includes("\u200B")) {
          const firstEmptyCharIndex = nodeContent.indexOf("\u200B");
          nodeContent = nodeContent.replace(/\u200B/g, (emptyChar, index) =>
            index === firstEmptyCharIndex ? emptyChar : ""
          );
          if (nodeContent !== "\u200B") {
            console.log(nodeContent);
            nodeContent = nodeContent.replace(/\u200B/g, "");
          }
        }
        const textNode = document.createTextNode(nodeContent);
        blockHTMLContent.value.appendChild(textNode);
        if (index < contentForTextNodes.length - 1) {
          const lineBreakNode = document.createTextNode("\n");
          blockHTMLContent.value.append(lineBreakNode);
        }
      });
    }
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
        const nextSibling: HTMLElement = range.startContainer.nextSibling as HTMLElement;
        let isBlockButtonsWrapperNextSibling = false;
        if (nextSibling && nextSibling.className) {
          isBlockButtonsWrapperNextSibling = nextSibling.className.includes("wrapper");
        }
        if (!nextSibling || isBlockButtonsWrapperNextSibling) {
          event.preventDefault();
          focusNextContentEditable();
        }
      }
    }
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const selection = window.getSelection();
      if (selection && blockHTMLContent.value) {
        const range = selection.getRangeAt(0);
        range.collapse(true);
        const currentNode = range.startContainer;
        const currentNodeIndex = Array.from(blockHTMLContent.value.childNodes).indexOf(
          currentNode as ChildNode
        );
        if (currentNodeIndex === -1) {
          return;
        }
        const newLineNode = document.createElement("BR");
        blockHTMLContent.value.childNodes[currentNodeIndex].after(newLineNode);
        const newTextNode = document.createTextNode("\u200B");
        blockHTMLContent.value.childNodes[currentNodeIndex + 1].after(newTextNode);
        editorStore.updateBlockContent(block._id, blockHTMLContent.value.innerText);
        range.setStart(newTextNode, 1);
        range.setEnd(newTextNode, 1);
      }
    }
    if (event.key === "Backspace" && (event.metaKey || event.ctrlKey)) {
      event.preventDefault();
      deleteBlockAndFocusPrevious();
    } else if (
      event.key === "Backspace" &&
      (blockHTMLContent.value?.innerText === "" ||
        !blockHTMLContent.value?.innerHTML.length ||
        blockHTMLContent.value?.innerText === "\u200B") &&
      !editorStore.commandPaletteOpen
    ) {
      event.preventDefault();
      deleteBlockAndFocusPrevious();
    }

    if (event.key === "Backspace" && blockHTMLContent.value?.innerText.length) {
      const selection = window.getSelection();
      if (selection && blockHTMLContent.value) {
        const range = selection.getRangeAt(0);
        const currentNode = range.startContainer;
        const currentNodeText = currentNode.textContent;
        if (currentNodeText) {
          const removingLastCharacter =
            currentNode.textContent?.length === 1 &&
            range.startOffset === 1 &&
            range.endOffset === 1;
          const removingWholeLineWithSelection =
            range.startOffset === 0 && range.endOffset === currentNodeText.length;
          if (removingLastCharacter || removingWholeLineWithSelection) {
            event.preventDefault();
            currentNode.nodeValue = "\u200B";
          }
          if (currentNodeText === "\u200B") {
            event.preventDefault();
            const previousSibling = currentNode.previousSibling;
            if (previousSibling) {
              const nodeToFocus = previousSibling.previousSibling;
              blockHTMLContent.value.removeChild(previousSibling);
              blockHTMLContent.value.removeChild(currentNode);
              editorStore.updateBlockContent(block._id, blockHTMLContent.value.innerText);
              if (nodeToFocus && nodeToFocus.textContent) {
                range.setStart(nodeToFocus, nodeToFocus.textContent.length);
                range.setEnd(nodeToFocus, nodeToFocus.textContent.length);
              }
            }
          }
        }
      }
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

  function deleteBlockAndFocusPrevious() {
    const elements = findContentEditables();
    //TODO: Refactor to separate function?
    const index = elements.findIndex((element) => element === blockHTMLContent.value);
    if (index > 0) {
      const elementToFocus = elements[index - 1];
      focusAndPlaceCaretAtEnd(elementToFocus);
    }
    editorStore.deleteBlockById(unref(block._id));
  }

  function focusPreviousContentEditable() {
    const elements = findContentEditables();
    const index = elements.findIndex((element) => element === blockHTMLContent.value);
    if (index > 0) {
      const elementToFocus = elements[index - 1];
      focusUpAndAlignCaretInSameVertical(elementToFocus);
    }
  }
  function focusNextContentEditable() {
    const elements = findContentEditables();
    const index = elements.findIndex((element) => element === blockHTMLContent.value);
    if (index < elements.length - 1) {
      const elementToFocus = elements[index + 1];
      focusDownAndAlignCaretInSameVertical(elementToFocus);
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
