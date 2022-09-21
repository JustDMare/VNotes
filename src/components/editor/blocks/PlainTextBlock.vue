<script lang="ts" setup>
import type { Block } from "@/types/blocks";
import { type PropType, reactive } from "vue";
const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});

const block = reactive(props.block);

function parseKeyPress(event: KeyboardEvent) {
  if (event.code === "Enter" && event.shiftKey) {
    event.preventDefault();

    const cursorPosition = window.getSelection()?.getRangeAt(0).startOffset;
    if (cursorPosition) {
      const blockContent = props.block.content;
      console.log(props.block.content.charAt(cursorPosition));
      block.content =
        blockContent.substring(0, cursorPosition) +
        "\n" +
        blockContent.substring(cursorPosition);

      console.log(
        block.content.substring(0, cursorPosition) +
          block.content.substring(cursorPosition)
      );
    }
  }
}
function processInput(event: Event) {
  const input = event.target as HTMLElement;
  block.content = input.innerText;
}
</script>

<template>
  <p contenteditable @keydown="parseKeyPress" @input="processInput">
    {{ block.content }}
  </p>
</template>
