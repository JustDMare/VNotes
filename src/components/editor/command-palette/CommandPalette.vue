<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import { nextTick, ref, watch } from "vue";
import CommandList from "./CommandList.vue";

const editorStore = useEditorStore();

let { x, y } = { x: 0, y: 0 };
const showCommandPalette = ref(false);

const cmdPalette = ref<HTMLElement | null>(null);

const MAX_HEIGHT = 200;
const isPositionedOnTop = ref(false);

//TODO: Document.
function getCommandPaletteCoordinates() {
  console.log(isPositionedOnTop.value);
  let { x, y } = { x: 0, y: 0 };
  let dialogHeight = MAX_HEIGHT;
  if (cmdPalette.value && cmdPalette.value.getBoundingClientRect().height > 0) {
    dialogHeight = cmdPalette.value.getBoundingClientRect().height;
  }
  const selection = window.getSelection();
  if (selection && selection.rangeCount !== 0) {
    const range = selection.getRangeAt(0).cloneRange();
    range.collapse(true);
    const rect = range.getClientRects()[0];
    if (rect) {
      computeCoordinates(rect.left, rect.top, rect.height, dialogHeight);
      ({ x, y } = computeCoordinates(
        rect.left,
        rect.top,
        rect.height,
        dialogHeight
      ));
    } else {
      selection.collapseToStart();
      const element: HTMLElement = selection.focusNode as HTMLElement;
      ({ x, y } = computeCoordinates(
        element.getBoundingClientRect().left,
        element.getBoundingClientRect().top,
        element.getBoundingClientRect().height,
        dialogHeight
      ));
    }
  }
  return { x, y };
}
function computeCoordinates(
  blockX: number,
  blockY: number,
  blockHeight: number,
  dialogHeight: number
) {
  const x = blockX;
  let y = 0;
  if (
    blockY + blockHeight + dialogHeight > window.innerHeight ||
    isPositionedOnTop.value
  ) {
    isPositionedOnTop.value = true;
    y = blockY - dialogHeight;
  } else {
    y = blockY + blockHeight;
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

function recalculatePosition() {
  nextTick(() => {
    if (cmdPalette.value && showCommandPalette.value) {
      const { y } = getCommandPaletteCoordinates();
      cmdPalette.value.style.top = `${y}px`;
    }
  });
}

//TODO: Cleanup code (functions, files, etc.)
//TODO: Create the commands to be executed
watch(
  () => editorStore.commandPaletteOpen,
  (newVal: boolean, oldVal) => {
    if (newVal && newVal !== oldVal) {
      isPositionedOnTop.value = false;
      ({ x, y } = getCommandPaletteCoordinates());
      if (cmdPalette.value) {
        cmdPalette.value.style.left = `${x}px`;
        cmdPalette.value.style.top = `${y}px`;
      }

      showCommandPalette.value = true;
      document.addEventListener("mousedown", handleClickOutside);
    } else if (newVal === false && newVal !== oldVal) {
      document.removeEventListener("mousedown", handleClickOutside);
      cmdPalette?.value?.scrollTo(0, 0);
      showCommandPalette.value = false;
    }
  }
);
</script>

<template>
  <dialog :open="showCommandPalette" ref="cmdPalette" class="cmd-palette">
    <CommandList
      @commandListChanged="recalculatePosition"
      :showCommandPalette="showCommandPalette"
    />
  </dialog>
</template>

<style lang="scss" scoped>
.cmd-palette {
  position: absolute;
  padding: 0.5rem;
  border-radius: 6px;
  max-height: 200px;
  width: 250px;
  overflow-y: auto;
  background-color: var(--color-base-100);
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 10;
  transition: all 0.2s ease-in-out;
}
</style>
