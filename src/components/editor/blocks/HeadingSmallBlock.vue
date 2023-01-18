<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block";
import type { Block } from "vnotes-types";
import type { PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const {
  initialBlockContent,
  parseSpecialKeys,
  processInput,
  blockHTMLContent,
} = useTextBasedBlock(props.block);
defineExpose({ blockHTMLContent });
</script>

<template>
  <h3
    class="block__content--heading__small"
    contenteditable
    :placeholder="$t('note.blockPlaceholder')"
    ref="blockHTMLContent"
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ initialBlockContent }}
  </h3>
</template>
<style lang="scss"></style>
