<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/textBasedBlock";
import type { Block } from "@/types";
import type { PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});

const { parseSpecialKeys, processInput } = useTextBasedBlock(props.block);
</script>

<template>
  <h1 v-once contenteditable @keydown="parseSpecialKeys" @input="processInput">
    {{ block.content }}
  </h1>
</template>

<style lang="scss" scoped>
h1 {
  font-family: var(--font-sans);
}
</style>
