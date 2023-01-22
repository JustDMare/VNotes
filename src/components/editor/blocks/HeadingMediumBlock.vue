<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block/text-based-block";
import type { Block } from "vnotes-types";
import type { PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const { blockHTMLContent, parseSpecialKeys, processInput } = useTextBasedBlock(
  props.block
);
defineExpose({ blockHTMLContent });
</script>

<template>
  <h2
    class="block__content--heading__medium note-editor__content-editable"
    contenteditable
    :placeholder="$t('note.blockPlaceholder')"
    ref="blockHTMLContent"
    @keydown="parseSpecialKeys"
    @input="processInput"
  ></h2>
</template>
<style lang="scss"></style>
