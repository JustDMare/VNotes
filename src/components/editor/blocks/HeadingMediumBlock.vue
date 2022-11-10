<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block";
import type { Block } from "@/types";
import { toRef, type PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const { parseSpecialKeys, processInput } = useTextBasedBlock(
  toRef(props.block, "blockID")
);
</script>

<template>
  <h2
    class="block__content--heading__medium"
    v-once
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ block.content }}
  </h2>
</template>
<style lang="scss"></style>
