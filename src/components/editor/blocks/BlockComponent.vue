BLOCK_DICTIONARYBLOCK_DICTIONARY
<script setup lang="ts">
import BLOCK_DICTIONARY from "@/services/block-dictionary";
import type { Block } from "@/types/blocks";
import type { PropType } from "vue";

defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
</script>

<template>
  <component :is="BLOCK_DICTIONARY.get(block.type)" :block="block"></component>
</template>

<style scoped></style>
