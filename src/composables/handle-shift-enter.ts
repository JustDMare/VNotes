import { useEditorStore } from "@/stores/editor";
import type { Block } from "vnotes-types";
import type { Ref } from "vue";

export function useHandleShiftEnter(
  block: Block,
  blockHTMLContent: Ref<HTMLElement | null>
) {
  const editorStore = useEditorStore();

  //TODO: Document. Modified the original shit+enter to add the nodes in a similar way to
  //how I parse them on render function.
  function handleShiftEnter(event: KeyboardEvent) {
    event.preventDefault();
    const selection = window.getSelection();
    if (!selection || !blockHTMLContent.value) {
      return;
    }
    const range = selection.getRangeAt(0);
    range.collapse(true);
    const currentNode = range.startContainer;
    const currentNodeIndex = Array.from(blockHTMLContent.value.childNodes).indexOf(
      currentNode as ChildNode
    );
    if (currentNodeIndex === -1) {
      return;
    }
    const newLineNode = document.createTextNode("\n");
    blockHTMLContent.value.childNodes[currentNodeIndex].after(newLineNode);
    const newTextNode = document.createTextNode("\u200B");
    blockHTMLContent.value.childNodes[currentNodeIndex + 1].after(newTextNode);
    editorStore.updateBlockContent(block._id, blockHTMLContent.value.innerText);
    range.setStart(newTextNode, 1);
    range.setEnd(newTextNode, 1);
  }

  return handleShiftEnter;
}
