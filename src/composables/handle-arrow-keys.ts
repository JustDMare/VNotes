import {
  focusUpAndAlignCaretInSameVertical,
  focusDownAndAlignCaretInSameVertical,
} from "@/utils";
import type { Ref } from "vue";
import { findContentEditables } from "./utils/find-content-editables";

export function useHandleArrowKeys(blockHTMLContent: Ref<HTMLElement | null>) {
  //TODO: DOCUMENT
  function handleArrowUpKey(event: KeyboardEvent) {
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
  function handleArrowDownKey(event: KeyboardEvent) {
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
  return { handleArrowUpKey, handleArrowDownKey };
}
