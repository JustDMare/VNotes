import { useEditorStore } from "@/stores/editor";
import type { Ref } from "vue";

export function useFocusBlockOnCreation(
  blockHTMLContent: Ref<HTMLElement | null>
) {
  const editorStore = useEditorStore();

  function focusBlockOnCreation() {
    if (editorStore.blockCreated && blockHTMLContent.value) {
      blockHTMLContent.value.innerHTML = "<span>&nbsp;</span>"; //Firefox
      blockHTMLContent.value.focus();
      editorStore.setBlockCreated(false);
      blockHTMLContent.value.innerHTML = ""; //Firefox
    }
  }
  return { focusBlockOnCreation };
}
