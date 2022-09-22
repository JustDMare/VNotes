<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/textBasedBlock";
import type { Block } from "@/types/blocks";
import { reactive, type PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const block = reactive(props.block);

const { parseSpecialKeys, processInput } = useTextBasedBlock(block);
</script>

<template>
  <p
    v-once
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
    v-text="block.content"
  />
</template>
