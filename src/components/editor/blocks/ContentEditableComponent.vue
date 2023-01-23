<script setup lang="ts">
import { useBlockRenderContent } from "@/composables/block-render-content";
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

useBlockRenderContent(props.block, blockHTMLContent);
useFocusBlockOnCreation(blockHTMLContent);
const isContentEmpty = useIsContentEmpty(toRef(props.block, "content"));
const handleArrowKeys = useHandleArrowKeys(blockHTMLContent);
const { handleBackspaceOnContentEditable, handleBackspaceOnEmptyBlock } =
  useHandleBackspace(props.block, blockHTMLContent);
const handleShiftEnter = useHandleShiftEnter(props.block, blockHTMLContent);

function handleSpecialKeys(event: KeyboardEvent) {
  handleArrowKeys(event);
  handleShiftEnter(event);
  handleBackspaceOnEmptyBlock(event);
  handleBackspaceOnContentEditable(event);

  if (event.key === "/") {
    editorStore.setCommandPaletteOpen(true);
    editorStore.setBlockOpeningCommandPalette(props.block);
  }

  if (event.code === "Enter" && !event.shiftKey && !editorStore.commandPaletteOpen) {
    event.preventDefault();
    editorStore.createBlockBelowBlockId(unref(props.block._id));
  }
}

function processInput(event: Event) {
  const input = event.target as HTMLElement;
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
    :class="{ 'block__show-placeholder': isContentEmpty }"
  />
</template>
