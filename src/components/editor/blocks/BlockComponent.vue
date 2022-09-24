BLOCK_DICTIONARYBLOCK_DICTIONARY
<script setup lang="ts">
import BLOCK_DICTIONARY from "@/services/block-dictionary";
import { useMainStore } from "@/stores/main";
import type { Block } from "@/types/blocks";
import type { PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const mainStore = useMainStore();

function createBlockBelow() {
  mainStore.createBlockInEditor(props.block.blockId);
}
</script>

<template>
  <div>
    <button @click="createBlockBelow">+</button>
    <component
      :is="BLOCK_DICTIONARY.get(block.type)"
      :block="block"
    ></component>
  </div>
</template>

<style scoped>
[contenteditable]:focus {
  outline: 0px solid transparent;
}
[contenteditable] {
  white-space: pre-wrap;
}
</style>
