<script lang="ts" setup>
import type { Block } from "@/types/blocks";
import { type PropType, reactive, ref } from "vue";
import { useTextBasedBlock } from "@/composables/textBasedBlock";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const block = reactive(props.block);

const { parseSpecialKeys, processInput } = useTextBasedBlock(block);
</script>

<template>
  <p contenteditable @keydown="parseSpecialKeys" @input="processInput">
    {{ block.content }}
  </p>
</template>
