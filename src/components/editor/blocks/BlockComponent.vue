<script lang="ts">
/**
 * Dynamic block component that renders the correct block component based on the Block's
 * `type` and its mapping in the `blockComponentMap`, along with its corresponding styling
 * based on the `blockClassMap` mapping.
 *
 * @component BlockComponent
 * @see getBlockComponentMap
 * @see getBlockClassMap
 */
export default {
  name: "BlockComponent",
};
</script>

<script setup lang="ts">
import { FadeTransition } from "@/components/animations";
import { GripIcon, PlusIcon } from "@/components/icons";
import { useEditorStore } from "@/stores/editor";
import { focusAndPlaceCaretAtEnd } from "@/utils";
import type { Block, BlockType } from "vnotes-types";
import { type PropType, ref, type Ref, watch } from "vue";
import type { PlainTextBlock } from ".";
import { getBlockToComponentMap, type BlockTypeMapping } from "./block-to-component-map";

const blockToComponentMap: ReadonlyMap<BlockType, BlockTypeMapping> = getBlockToComponentMap();
const editorStore = useEditorStore();

const props = defineProps({
  /**
   * The block object to render.
   *
   * @type {Block}
   * @required
   */
  block: { type: Object as PropType<Block>, required: true },
});

/**
 * Ref to the block's inner component.
 *
 * @type {Ref<PlainTextBlock | null>}
 */
const blockInnerComponent: Ref<typeof PlainTextBlock | null> = ref(null);

/**
 * Whether the create and move buttons should be visible.
 *
 * @type {Ref<boolean>}
 * @reactive
 */
let buttonsVisible: Ref<boolean> = ref(false);

function createBlockBelow() {
  editorStore.createBlockBelowBlockId(props.block._id);
}
function showButtons(): void {
  buttonsVisible.value = true;
}
function hideButtons(): void {
  buttonsVisible.value = false;
}
watch(
  () => props.block.type,
  () => {
    setTimeout(() => {
      if (blockInnerComponent.value) {
        focusAndPlaceCaretAtEnd(blockInnerComponent.value.blockContentEditable.blockHTMLContent);
      }
    }, 25);
  }
);
</script>

<template>
  <div
    class="block"
    :class="blockToComponentMap.get(block.type)?.cssClass"
    @mouseover="showButtons"
    @mouseleave="hideButtons"
    @hover="showButtons"
    data-test="block-wrapper"
  >
    <component
      class="block__content"
      :is="blockToComponentMap.get(block.type)?.component"
      :block="block"
      ref="blockInnerComponent"
    ></component>

    <div
      class="block__btn-wrapper"
      @mouseover="showButtons"
      @mouseleave="hideButtons"
      @hover="showButtons"
    >
      <FadeTransition>
        <button
          :title="$t('tooltips.block.addBlockButton')"
          v-show="buttonsVisible"
          class="block__btn"
          @click="createBlockBelow"
          data-test="add-block-btn"
        >
          <PlusIcon class="block__btn__icon" />
        </button>
      </FadeTransition>
      <FadeTransition>
        <button
          :title="$t('tooltips.block.gripButton')"
          v-show="buttonsVisible"
          class="block__btn grip-btn"
          data-test="move-block-btn"
        >
          <GripIcon class="block__btn__icon" />
        </button>
      </FadeTransition>
    </div>
  </div>
</template>

<style scoped lang="scss">
//Variables
.block {
  --button--size: 24px;
  --button-wrapper--right-margin: 8px;
  --button-wrapper--left-alignment: 0;
}
//Generic styling
.block {
  display: flex;
  align-items: start;
  position: relative;
  padding: 0 6rem;

  &__content {
    width: 100%;
    min-height: 1em;
    z-index: 1;
    padding: 2px;
  }
  &__btn {
    position: relative;
    align-content: center;
    padding: 0;
    display: block;
    width: var(--button--size);
    height: var(--button--size);
    border: 0;
    background: transparent;
    border-radius: 4px;
    color: var(--color-base-50);
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &__icon {
      width: 100%;
      height: 100%;
    }
    &:hover {
      background-color: var(--color-base-80);
      color: var(--color-base-30);
    }

    &-wrapper {
      position: absolute;
      left: 40px;
      min-width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: row;
      column-gap: 2px;
      z-index: 0;
      transition: all 1s ease-in-out;
    }
  }
}

:deep([contenteditable]:not(:focus):empty::before) {
  content: "\A0";
  color: rgba(0, 0, 0, 1);
}
:deep(.block__show-placeholder:focus::before) {
  content: attr(placeholder);
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
.grip-btn {
  cursor: grab;
  cursor: -webkit-grab;
  &:active {
    cursor: grabbing;
    cursor: -webkit-grabbing;
  }
}
</style>
