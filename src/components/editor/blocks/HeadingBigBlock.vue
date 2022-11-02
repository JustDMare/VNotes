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
  <h1
    class="block--heading__big"
    v-once
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ block.content }}
  </h1>
</template>

<style lang="scss">
.block--heading__big + .block--button__create {
  left: -20px;
}
</style>
