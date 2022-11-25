<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block";
import type { Block } from "@/types";
import type { PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const {
  initialBlockContent,
  blockHTMLContent,
  parseSpecialKeys,
  processInput,
} = useTextBasedBlock(props.block);
</script>

<template>
  <h2
    class="block__content--heading__medium"
    contenteditable
    ref="blockHTMLContent"
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ initialBlockContent }}
  </h2>
</template>
<style lang="scss"></style>
