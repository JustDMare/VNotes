BLOCK_DICTIONARYBLOCK_DICTIONARY
<script setup lang="ts">
import BLOCK_DICTIONARY from "@/services/block-dictionary";
import type { Block } from "@/types/blocks";
import type { PropType } from "vue";

defineProps({
  block: { type: Object as PropType<Block>, required: true },
  index: { type: Number, required: true },
});
</script>

<template>
  <component
    :is="BLOCK_DICTIONARY.get(block.type)"
    :index="index"
    :block="block"
  ></component>
</template>

<style scoped>
[contenteditable]:focus {
  outline: 0px solid transparent;
}
[contenteditable] {
  white-space: pre-wrap;
}
</style>
