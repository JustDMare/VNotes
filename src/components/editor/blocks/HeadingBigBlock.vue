<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block";
import type { Block } from "@/types";
import type { PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});

const { initialBlockContent, parseSpecialKeys, processInput } =
  useTextBasedBlock(props.block);
</script>

<template>
  <h1
    class="block__content--heading__big"
    contenteditable
    ref="blockHTMLContent"
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ initialBlockContent }}
  </h1>
</template>

<style lang="scss"></style>
