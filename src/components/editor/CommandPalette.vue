<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import { ref, watch } from "vue";

const editorStore = useEditorStore();

const showCommandPalette = ref(false);
let { x, y } = { x: 0, y: 0 };
const cmdPalette = ref<HTMLElement | null>(null);
const searchTerm = ref("");

//TODO: Document. Should improve to displace the dialog if it doesn't fit on the screen.
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

function handleClickOutside(event: MouseEvent) {
  if (cmdPalette.value) {
    if (cmdPalette.value && !cmdPalette.value.contains(event.target as Node)) {
      editorStore.setCommandPaletteOpen(false);
    }
  }
}
function handleSpecialKeys(event: KeyboardEvent) {
  if (
    event.code === "Escape" ||
    event.code === "Space" ||
    event.code === "Tab"
  ) {
    editorStore.setCommandPaletteOpen(false);
  }
  if (event.code === "Enter") {
    editorStore.setCommandPaletteOpen(false); //Change to select the command
  }
  if (event.code === "Backspace" && searchTerm.value === "") {
    editorStore.setCommandPaletteOpen(false);
  }
}
/*TODO: Document. Mention that it doesn't support more complex interactions like copy/paste,
 * adding or removing chars in the middle of the term, etc.
 * It does support selecting from the end (like with shift + left arrow) to
 * delete multiple chars.
 * Checking all interactions adds too much complexity
 * and it's not worth it.
 * Also, doesn't support "Delete" key. Once again, too much complexity to be worth it.
 */
function handleKeypress(event: KeyboardEvent) {
  if (event.key.length === 1) {
    searchTerm.value += event.key;
  }
  if (event.code === "Backspace") {
    let numberOfCharsToDelete = 1;
    const selection = window.getSelection();
    if (selection && selection.rangeCount !== 0) {
      const range = selection.getRangeAt(0).cloneRange();
      if (range.startOffset !== range.endOffset) {
        numberOfCharsToDelete = range.endOffset - range.startOffset;
      }
    }
    searchTerm.value = searchTerm.value.slice(0, -numberOfCharsToDelete);
  }
}
//TODO: Cleanup code (functions, files, etc.)
//TODO: Create the commands to be executed
watch(
  () => editorStore.commandPaletteOpen,
  (newVal: boolean, oldVal) => {
    if (newVal && newVal !== oldVal) {
      ({ x, y } = getCommandPaletteCoordinates());
      if (cmdPalette.value) {
        cmdPalette.value.style.left = `${x}px`;
        cmdPalette.value.style.top = `${y}px`;
      }
      showCommandPalette.value = true;
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeypress);
      document.addEventListener("keydown", handleSpecialKeys);
    } else if (newVal === false && newVal !== oldVal) {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeypress);
      document.removeEventListener("keydown", handleSpecialKeys);
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
