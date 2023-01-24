import { useEditorStore } from "@/stores/editor";
import { ofCourseItIsFirefox, focusAndPlaceCaretAtEnd } from "@/utils";
import type { Block } from "vnotes-types";
import { unref, type Ref } from "vue";
import { findContentEditables } from "./utils/find-content-editables";

export function useHandleBackspace(block: Block, blockHTMLContent: Ref<HTMLElement | null>) {
  const editorStore = useEditorStore();

  function handleDeleteBlockShortcut(event: KeyboardEvent) {
    event.preventDefault();
    deleteBlockAndFocusPrevious();
  }

  function handleBackspaceOnEmptyBlock(event: KeyboardEvent) {
    if (editorStore.commandPaletteOpen) {
      return;
    }
    if (!blockHTMLContent.value) {
      return;
    }

    const isBlockDeleted = deleteBlockIfEmpty(event);
    if (isBlockDeleted) {
      return;
    }
    //Check for Firefox's special case
    if (ofCourseItIsFirefox()) {
      deleteBlockInFirefoxIfEmpty(event);
    }
    //Checks if the block' s HTML ref's content is empty. If it is, delete it right away.
    function deleteBlockIfEmpty(event: KeyboardEvent) {
      const blockHTMLInnerText = blockHTMLContent.value?.innerText;
      if (
        blockHTMLInnerText === "" ||
        !blockHTMLContent.value?.innerHTML.length ||
        blockHTMLInnerText === "\u200B" ||
        blockHTMLInnerText === "\n"
      ) {
        event.preventDefault();
        deleteBlockAndFocusPrevious();
        return true;
      }
      return false;
    }

    // If the browser is Firefox, the first node is empty and the last node is
    // a BR tag. If it is, delete the block.
    function deleteBlockInFirefoxIfEmpty(event: KeyboardEvent) {
      if (
        blockHTMLContent.value?.childNodes.length === 2 &&
        blockHTMLContent.value?.lastChild?.nodeName === "BR"
      ) {
        const blockHTMLFirstChildTextContent = blockHTMLContent.value?.firstChild?.textContent;
        if (
          blockHTMLFirstChildTextContent === "\u200B" ||
          blockHTMLFirstChildTextContent === "\n" ||
          blockHTMLFirstChildTextContent === ""
        ) {
          event.preventDefault();
          deleteBlockAndFocusPrevious();
        }
      }
    }
  }
  function deleteBlockAndFocusPrevious() {
    const elements = findContentEditables();
    const index = elements.findIndex((element) => element === blockHTMLContent.value);
    if (index > 0) {
      const elementToFocus = elements[index - 1];
      focusAndPlaceCaretAtEnd(elementToFocus);
    }
    editorStore.deleteBlockById(unref(block._id));
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
      currentNode.textContent?.length === 1 && range.startOffset === 1 && range.endOffset === 1;

    const removingAllCharactersWithSelection =
      range.startOffset === 0 && range.endOffset === currentNodeText.length;

    const removingAllCaractersFromNode =
      removingAllCharactersWithSelection || removingLastCharacter;
    const nodeIsOnlyNode = blockHTMLContent.value.childNodes.length === 1;

    //To avoid the problem of the empty node being counted inside the previous node and
    //the creation of a <br> element, add an empty character to the node
    if (removingAllCaractersFromNode && !nodeIsOnlyNode) {
      event.preventDefault();
      currentNode.nodeValue = "\u200B";
    }
    //Firefox special case to be able to work with the placeholder property
    if (ofCourseItIsFirefox() && removingAllCaractersFromNode && nodeIsOnlyNode) {
      blockHTMLContent.value.removeChild(currentNode);
    }

    if (currentNodeText === "\u200B") {
      deleteTextNodeAndLineBreakAndFocusPrevious(event, currentNode, range);
    }
  }

  function deleteTextNodeAndLineBreakAndFocusPrevious(
    event: KeyboardEvent,
    currentNode: Node,
    range: Range
  ) {
    event.preventDefault();
    const previousSibling = currentNode.previousSibling;
    if (!previousSibling || !blockHTMLContent.value) {
      return;
    }

    const nodeToFocus = previousSibling.previousSibling;
    blockHTMLContent.value.removeChild(previousSibling);
    blockHTMLContent.value.removeChild(currentNode);
    editorStore.updateBlockContent(unref(block._id), blockHTMLContent.value.innerText);
    if (nodeToFocus && nodeToFocus.textContent) {
      range.setStart(nodeToFocus, nodeToFocus.textContent.length);
      range.setEnd(nodeToFocus, nodeToFocus.textContent.length);
    }
  }

  return {
    handleDeleteBlockShortcut,
    handleBackspaceOnContentEditable,
    handleBackspaceOnEmptyBlock,
  };
}
