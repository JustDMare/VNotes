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
<style lang="scss">
.block__content--heading__medium + .block__button-wrapper {
  top: 4px;
}
</style>
