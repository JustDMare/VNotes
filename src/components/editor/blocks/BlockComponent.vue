<script setup lang="ts">
import { GripIcon, PlusIcon } from "@/components/icons";
import { getBlockComponentMap, getBlockClassMap } from "@/common/maps";
import { useEditorStore } from "@/stores/editor";
import type { Block, BlockType } from "vnotes-types";
import { type PropType, ref, type Component } from "vue";

const blockComponentMap: ReadonlyMap<BlockType, Component> =
  getBlockComponentMap();
const blockClassMap: ReadonlyMap<BlockType, string> = getBlockClassMap();

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const editorStore = useEditorStore();

let buttonsVisible = ref(false);

function createBlockBelow() {
  editorStore.createBlockBelowBlockId(props.block._id);
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
    :class="blockClassMap.get(block.type)"
    @mouseover="showButtons"
    @mouseleave="hideButtons"
    @hover="showButtons"
  >
    <component
      class="block__content"
      :is="blockComponentMap.get(block.type)"
      :block="block"
    ></component>
    <div
      class="block__btn-wrapper"
      @mouseover="showButtons"
      @mouseleave="hideButtons"
      @hover="showButtons"
    >
      <button
        v-show="buttonsVisible"
        class="block__btn"
        @click="createBlockBelow"
      >
        <PlusIcon class="block__btn__icon" />
      </button>
      <button v-show="buttonsVisible" class="block__btn">
        <GripIcon class="block__btn__icon" />
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
  &__btn {
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

.block__btn__icon {
  width: 100%;
  height: 100%;
}

:deep([contenteditable]:not(:focus):empty::before) {
  content: "\A0";
  color: rgba(0, 0, 0, 1);
}
:deep([contenteditable]:focus:empty::before) {
  content: "Type '/' for commands";
  color: rgba(0, 0, 0, 0.5);
}

//Styling based on block type
.block {
  &--text {
    margin-top: 2px;

    & .block__btn {
      top: 0px;
    }
  }
  &--heading__big {
    margin-top: 2em;

    & .block__btn {
      top: 9px;
    }
  }
  &--heading__medium {
    margin-top: 1.5em;

    & .block__btn {
      top: 5px;
    }
  }
  &--heading__small {
    margin-top: 1em;

    & .block__btn {
      top: 3px;
    }
  }
  &--checkbox {
    margin-top: 2px;

    & .block__btn {
      top: 0px;
    }
  }
}
</style>
