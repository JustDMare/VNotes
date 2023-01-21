<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block";
import type { Block } from "vnotes-types";
import type { PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});

const { initialBlockContent, parseSpecialKeys, processInput, blockHTMLContent } =
  useTextBasedBlock(props.block);
defineExpose({ blockHTMLContent });
</script>

<template>
  <h1
    class="block__content--heading__big note-editor__content-editable"
    contenteditable
    :placeholder="$t('note.blockPlaceholder')"
    ref="blockHTMLContent"
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ initialBlockContent }}
  </h1>
</template>

<style lang="scss"></style>
