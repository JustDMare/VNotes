<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import { ref, watch } from "vue";

const editorStore = useEditorStore();

const showCommandPalette = ref(false);
let { x, y } = { x: 0, y: 0 };
const cmdPalette = ref<HTMLElement | null>(null);

function getCommandPaletteCoordinates() {
  let { x, y } = { x: 0, y: 0 };
  const selection = window.getSelection();
  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rect = range.getClientRects()[0];
    if (rect) {
      x = rect.left;
      y = rect.top + rect.height;
    } else {
      selection.collapseToStart();
      const element: HTMLElement = selection.focusNode as HTMLElement;
      x = element.getBoundingClientRect().left;
      
      y =
        element.getBoundingClientRect().top +
        element.getBoundingClientRect().height;
    }
  }
  return { x, y };
}

watch(
  () => editorStore.commandPaletteOpen,
  (val: boolean) => {
    if (val) {
      ({ x, y } = getCommandPaletteCoordinates());
      if (cmdPalette.value) {
        cmdPalette.value.style.left = `${x}px`;
        cmdPalette.value.style.top = `${y}px`;
      }
      showCommandPalette.value = true;
    } else {
      showCommandPalette.value = false;
    }
  }
);
</script>

<template>
  <dialog :open="showCommandPalette" ref="cmdPalette" class="cmd-palette">
    HELLO
  </dialog>
</template>

<style lang="scss" scoped>
.cmd-palette {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 50px;
  background-color: #fff;
  border: 1px solid #000;
  z-index: 10;
}
</style>
