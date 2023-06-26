import { useEditorStore } from "@/stores/editor";
import { onMounted, type Ref } from "vue";

export function useFocusBlockOnCreation(blockHTMLContent: Ref<HTMLElement | null>) {
  const editorStore = useEditorStore();

  onMounted(() => {
    focusBlockOnCreation();
  });

  function focusBlockOnCreation() {
    if (editorStore.blockCreated && blockHTMLContent.value) {
      blockHTMLContent.value.focus();
      editorStore.setBlockCreated(false);
    }
  }
}
