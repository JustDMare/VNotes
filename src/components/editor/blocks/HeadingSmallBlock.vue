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
  <h3
    class="block--heading__small"
    v-once
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ block.content }}
  </h3>
</template>
<style lang="scss">
.block--heading__small + .block--button__create {
  left: -20px;
}
</style>
