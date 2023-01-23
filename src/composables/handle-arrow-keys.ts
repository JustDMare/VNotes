import { useEditorStore } from "@/stores/editor";
import {
  focusUpAndAlignCaretInSameVertical,
  focusDownAndAlignCaretInSameVertical,
} from "@/utils";
import type { Ref } from "vue";
import { findContentEditables } from "./utils/find-content-editables";

export function useHandleArrowKeys(blockHTMLContent: Ref<HTMLElement | null>) {
  const editorStore = useEditorStore();

  function handleArrowKeys(event: KeyboardEvent) {
    if (event.key === "ArrowUp" && !editorStore.commandPaletteOpen) {
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
    if (event.key === "ArrowDown" && !editorStore.commandPaletteOpen) {
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
  }
  return handleArrowKeys;

  // Helper functions

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
}
