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
    class="block__content--heading__small"
    v-once
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ block.content }}
  </h3>
</template>
<style lang="scss">
.block__content--heading__small + .block__button-wrapper {
  top: 1px;
}
</style>
