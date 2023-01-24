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
    const newTextNode = createNewTextNodeBelow(currentNodeIndex);
    if (!newTextNode) {
      return;
    }

    range.setStart(newTextNode, 1);
    range.setEnd(newTextNode, 1);
  }

  function createNewTextNodeBelow(currentNodeIndex: number): Node | null {
    if (!blockHTMLContent.value) {
      return null;
    }
    console.log(currentNodeIndex);
    const lineBreakNode = document.createTextNode("\n");
    blockHTMLContent.value.childNodes[currentNodeIndex].after(lineBreakNode);

    const newTextNode = document.createTextNode("\u200B");
    blockHTMLContent.value.childNodes[currentNodeIndex + 1].after(newTextNode);
    editorStore.updateBlockContent(block._id, blockHTMLContent.value.innerText);
    return newTextNode;
  }

  return handleShiftEnter;
}
