import { useEditorStore } from "@/stores/editor";
import { ofCourseItIsFirefox, focusAndPlaceCaretAtEnd } from "@/utils";
import type { Block } from "vnotes-types";
import { unref, type Ref } from "vue";
import { findContentEditables } from "./utils/find-content-editables";

export function useHandleBackspace(
  block: Block,
  blockHTMLContent: Ref<HTMLElement | null>
) {
  const editorStore = useEditorStore();

  function handleBackspaceOnEmptyBlock(event: KeyboardEvent) {
    if (event.metaKey || event.ctrlKey) {
      event.preventDefault();
      deleteBlockAndFocusPrevious();
    } else if (
      (blockHTMLContent.value?.innerText === "" ||
        !blockHTMLContent.value?.innerHTML.length ||
        blockHTMLContent.value?.innerText === "\u200B" ||
        blockHTMLContent.value?.innerText === "\n") &&
      !editorStore.commandPaletteOpen
    ) {
      event.preventDefault();
      deleteBlockAndFocusPrevious();
    } else if (
      blockHTMLContent.value?.childNodes.length === 2 &&
      ofCourseItIsFirefox() &&
      blockHTMLContent.value?.lastChild?.nodeName === "BR" &&
      !editorStore.commandPaletteOpen
    ) {
      if (
        blockHTMLContent.value?.firstChild?.textContent === "\u200B" ||
        blockHTMLContent.value?.firstChild?.textContent === "\n" ||
        blockHTMLContent.value?.firstChild?.textContent === ""
      ) {
        event.preventDefault();
        deleteBlockAndFocusPrevious();
      }
    }
  }
  //TODO: Documentar. Maybe change the name to a more fitting one
  //TODO: Change all if (selection/blockHTMLContent) to return if they are falsy
  function handleBackspaceOnContentEditable(event: KeyboardEvent) {
    const selection = window.getSelection();
    if (!selection || !blockHTMLContent.value) {
      return;
    }

    const range = selection.getRangeAt(0);
    const currentNode = range.startContainer;
    const currentNodeText = currentNode.textContent;
    if (!currentNodeText) {
      return;
    }

    const removingLastCharacter =
      currentNode.textContent?.length === 1 &&
      range.startOffset === 1 &&
      range.endOffset === 1;

    const removingAllCharactersWithSelection =
      range.startOffset === 0 && range.endOffset === currentNodeText.length;

    const removingAllCaractersFromNode =
      removingAllCharactersWithSelection || removingLastCharacter;
    const nodeIsOnlyNode = blockHTMLContent.value.childNodes.length === 1;

    if (removingAllCaractersFromNode && !nodeIsOnlyNode) {
      event.preventDefault();
      currentNode.nodeValue = "\u200B";
    } else if (ofCourseItIsFirefox() && removingAllCaractersFromNode && nodeIsOnlyNode) {
      blockHTMLContent.value.removeChild(currentNode);
    }
    if (currentNodeText === "\u200B") {
      event.preventDefault();
      const previousSibling = currentNode.previousSibling;
      if (previousSibling) {
        const nodeToFocus = previousSibling.previousSibling;
        blockHTMLContent.value.removeChild(previousSibling);
        blockHTMLContent.value.removeChild(currentNode);
        editorStore.updateBlockContent(
          unref(block._id),
          blockHTMLContent.value.innerText
        );
        if (nodeToFocus && nodeToFocus.textContent) {
          range.setStart(nodeToFocus, nodeToFocus.textContent.length);
          range.setEnd(nodeToFocus, nodeToFocus.textContent.length);
        }
      }
    }
  }

  return { handleBackspaceOnContentEditable, handleBackspaceOnEmptyBlock };

  // Helper funictions

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
}
