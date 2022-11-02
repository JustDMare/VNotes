BLOCK_DICTIONARYBLOCK_DICTIONARY
<script setup lang="ts">
import getBlockDictionary from "@/services/block-dictionary";
import { useMainStore } from "@/stores/main";
import type { Block } from "@/types/blocks";
import type { PropType } from "vue";

const blockDictionary = getBlockDictionary();

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const mainStore = useMainStore();

function createBlockBelow() {
  mainStore.createBlockInEditor(props.block.blockID);
}
</script>

<template>
  <div class="block--wrapper">
    <component
      class="block--component"
      :is="blockDictionary.get(block.type)"
      :block="block"
    ></component>
    <button class="block--button__create" @click="createBlockBelow">+</button>
  </div>
</template>

<style scoped lang="scss">
.block {
  &--wrapper {
    display: flex;
    align-items: start;
    position: relative;
  }
  &--component {
  }
  &--button__create {
    align-content: center;
    position: absolute;
  }
}
</style>
