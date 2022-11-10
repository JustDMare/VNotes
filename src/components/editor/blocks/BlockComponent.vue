<script setup lang="ts">
import { GripIcon, PlusIcon } from "@/components/icons";
import {
  getBlockComponentDictionary,
  getBlockClassDictionary,
} from "@/services/block-dictionary";
import { useMainStore } from "@/stores/main";
import type { Block, BlockType } from "@/types/blocks";
import { type PropType, ref, type Component } from "vue";

const blockComponentDictionary: ReadonlyMap<BlockType, Component> =
  getBlockComponentDictionary();
const blockClassDictionary: ReadonlyMap<BlockType, string> =
  getBlockClassDictionary();

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const mainStore = useMainStore();

let buttonsVisible = ref(false);

function createBlockBelow() {
  mainStore.createBlockBelowBlockID(props.block.blockID);
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
    :class="blockClassDictionary.get(block.type)"
    @mouseover="showButtons"
    @mouseleave="hideButtons"
    @hover="showButtons"
  >
    <component
      class="block__content"
      :is="blockComponentDictionary.get(block.type)"
      :block="block"
    ></component>
    <div
      class="block__button-wrapper"
      @mouseover="showButtons"
      @mouseleave="hideButtons"
      @hover="showButtons"
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
//Variables
.block {
  --button--size: 24px;
  --button-wrapper--right-margin: 8px;
  --button-wrapper--left-alignment: calc(
    -1 * var(--button--size) * 2 - var(--button-wrapper--right-margin)
  );
}
//Generic styling
.block {
  display: flex;
  align-items: start;
  position: relative;

  &__content {
    width: 100%;
    min-height: 1em;
    z-index: 1;
    padding: 2px;
  }
  &__button {
    align-content: center;
    padding: 0;
    display: block;
    width: var(--button--size);
    height: var(--button--size);
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
      left: var(--button-wrapper--left-alignment);
      min-width: calc(100% - var(--button-wrapper--left-alignment));
      min-height: 100%;
      display: flex;
      flex-direction: row;
      column-gap: 2px;
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

//Styling based on block type
.block {
  &--text {
    margin-top: 2px;

    & .block__button {
      top: 0px;
    }
  }
  &--heading__big {
    margin-top: 2em;

    & .block__button {
      top: 9px;
    }
  }
  &--heading__medium {
    margin-top: 1.5em;

    & .block__button {
      top: 5px;
    }
  }
  &--heading__small {
    margin-top: 1em;

    & .block__button {
      top: 3px;
    }
  }
}
</style>
