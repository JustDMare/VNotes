<script setup lang="ts">
import { GripIcon, PlusIcon } from "@/components/icons";
import getBlockDictionary from "@/services/block-dictionary";
import { useMainStore } from "@/stores/main";
import type { Block } from "@/types/blocks";
import { type PropType, ref } from "vue";

const blockDictionary = getBlockDictionary();

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const mainStore = useMainStore();

let buttonsVisible = ref(false);

function createBlockBelow() {
  mainStore.createBlockInEditor(props.block.blockID);
}
function showButtons(): void {
  buttonsVisible.value = true;
}
function hideButtons(): void {
  buttonsVisible.value = false;
}
</script>

<template>
  <div
    class="block"
    @mouseover="showButtons"
    @mouseleave="hideButtons"
    @focusout="hideButtons"
  >
    <component
      class="block__content"
      :is="blockDictionary.get(block.type)"
      :block="block"
    ></component>
    <div
      class="block__button-wrapper"
      @mouseover="showButtons"
      @mouseleave="hideButtons"
      @focusout="hideButtons"
    >
      <button
        v-show="buttonsVisible"
        class="block__button"
        @click="createBlockBelow"
      >
        <PlusIcon class="plus-icon" />
      </button>
      <button v-show="buttonsVisible" class="block__button">
        <GripIcon class="plus-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.block {
  display: flex;
  align-items: start;
  position: relative;

  &__content {
    width: 100%;
    min-height: 1em;
    z-index: 1;
  }
  &__button {
    align-content: center;
    padding: 0;
    display: block;
    width: 24px;
    height: 24px;
    border: 0;
    background: transparent;
    border-radius: 4px;
    color: var(--color-base-50);

    &:hover {
      background-color: var(--color-base-80);
      color: var(--color-base-30);
    }

    &-wrapper {
      position: absolute;
      left: calc(-24px * 2 - 8px);
      min-width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: row;
      gap: 4x;
      z-index: 0;
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
