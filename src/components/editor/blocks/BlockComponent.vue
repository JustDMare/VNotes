BLOCK_DICTIONARYBLOCK_DICTIONARY
<script setup lang="ts">
import { PlusIcon } from "@/components/icons";
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

    <button class="block--button__create" @click="createBlockBelow">
      <PlusIcon class="plus-icon" />
    </button>
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
    width: 100%;
    min-height: 1em;
  }
  &--button__create {
    align-content: center;
    position: absolute;
    padding: 0;
    display: block;
    width: 24px;
    height: 24px;
    border: 0;
    background: transparent;
    left: -30px;
    border-radius: 4px;
    color: var(--color-base-50);

    &:hover {
      background-color: var(--color-base-80);
      color: var(--color-base-30);
    }
  }
}

.plus-icon {
  width: 100%;
  height: 100%;
}

[contenteditable]:not(:focus):empty::before {
  content: "\A0";
  color: rgba(0, 0, 0, 1);
}
[contenteditable]:focus:empty::before {
  content: "Type '/' for commands";
  color: rgba(0, 0, 0, 0.5);
}
</style>
