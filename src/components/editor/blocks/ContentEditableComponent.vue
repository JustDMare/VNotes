<script setup lang="ts">
import { useRenderBlockContent } from "@/composables/block-render-content";
import { useFocusBlockOnCreation } from "@/composables/focus-block-on-creation";
import { useHandleArrowKeys } from "@/composables/handle-arrow-keys";
import { useHandleBackspace } from "@/composables/handle-backspace";
import { useHandleShiftEnter } from "@/composables/handle-shift-enter";
import { useIsContentEmpty } from "@/composables/is-content-empty";
import { useEditorStore } from "@/stores/editor";
import type { Block } from "vnotes-types";
import { ref, toRef, unref, type PropType, type Ref } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
  tag: { type: String, default: "p", required: true },
});

const editorStore = useEditorStore();
const blockHTMLContent: Ref<HTMLElement | null> = ref(null);

useRenderBlockContent(props.block, blockHTMLContent);
useFocusBlockOnCreation(blockHTMLContent);
const isContentEmpty = useIsContentEmpty(toRef(props.block, "content"));
const { handleArrowUpKey, handleArrowDownKey } = useHandleArrowKeys(blockHTMLContent);
const { handleDeleteBlockShortcut, handleBackspaceOnContentEditable, handleBackspaceOnEmptyBlock } =
  useHandleBackspace(props.block, blockHTMLContent);
const handleShiftEnter = useHandleShiftEnter(props.block, blockHTMLContent);

function handleSpecialKeys(event: KeyboardEvent) {
  if (event.key === "ArrowUp" && !editorStore.commandPaletteOpen) {
    handleArrowUpKey(event);
  }
  if (event.key === "ArrowDown" && !editorStore.commandPaletteOpen) {
    handleArrowDownKey(event);
  }
  if (event.key === "Enter" && event.shiftKey && !editorStore.commandPaletteOpen) {
    handleShiftEnter(event);
  }
  if (event.key === "Backspace" && (event.metaKey || event.ctrlKey)) {
    handleDeleteBlockShortcut(event);
  } else if (event.key === "Backspace") {
    handleBackspaceOnEmptyBlock(event);
  }
  if (event.key === "Backspace" && blockHTMLContent.value?.innerText.length) {
    handleBackspaceOnContentEditable(event);
  }
  if (event.code === "Enter" && !event.shiftKey && !editorStore.commandPaletteOpen) {
    event.preventDefault();
    editorStore.createBlockBelowBlockId(unref(props.block._id));
  }
}

function processInput(event: Event) {
  const inputEvent: InputEvent = event as InputEvent;
  const input = event.target as HTMLElement;
  if (inputEvent.inputType === "insertText" && inputEvent.data === "/") {
    editorStore.setCommandPaletteOpen(true);
    editorStore.setBlockOpeningCommandPalette(props.block);
    editorStore.setBlockContentBeforeOpeningCommandPalette(props.block.content);
  }
  editorStore.updateBlockContent(unref(props.block._id), input.innerText);
}

defineExpose({ blockHTMLContent });
</script>

<template>
  <component
    :is="tag"
    contenteditable="true"
    :placeholder="$t('note.blockPlaceholder')"
    ref="blockHTMLContent"
    @keydown="handleSpecialKeys"
    @input="processInput"
    class="note-editor__content-editable"
    :class="{ 'block__show-placeholder': isContentEmpty }"
    data-test="block-content"
  />
</template>
