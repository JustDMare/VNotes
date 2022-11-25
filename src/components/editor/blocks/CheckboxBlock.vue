<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block";
import { useEditorStore } from "@/stores/editor";
import type { CheckboxBlock } from "@/types/blocks";
import { onMounted, ref, toRef, watch, type PropType, type Ref } from "vue";

const props = defineProps({
  block: { type: Object as PropType<CheckboxBlock>, required: true },
});
const checkboxChecked: Ref<boolean> = ref(
  props.block.uniqueProperties.selected
);
const {
  initialBlockContent,
  blockHTMLContent,
  parseSpecialKeys,
  processInput,
} = useTextBasedBlock(props.block);

const editorStore = useEditorStore();

onMounted(() => {
  if (editorStore.blockCreated && blockHTMLContent.value) {
    blockHTMLContent.value.innerHTML = "<span>&nbsp;</span>"; //Firefox
    blockHTMLContent.value.focus();
    editorStore.setBlockCreated(false);
    blockHTMLContent.value.innerHTML = ""; //Firefox
  }
});

watch(
  () => props.block.uniqueProperties.selected,
  (selected) => {
    checkboxChecked.value = selected;
  }
);

function onCheckboxChange(): void {
  editorStore.updateBlockUniqueProperty(
    props.block.blockID,
    "selected",
    !checkboxChecked.value
  );
}
</script>

<template>
  <div class="block__content--checkbox">
    <label :for="block.blockID" class="block__content--checkbox__label">
      <input
        type="checkbox"
        class="block__content--checkbox__checkbox"
        name="checkbox"
        :checked="checkboxChecked"
        @change="onCheckboxChange"
        :id="block.blockID"
      />
    </label>
    <p
      class="block__content--checkbox__text"
      :class="{ 'block__content--checkbox__text--checked': checkboxChecked }"
      ref="blockHTMLContent"
      contenteditable
      @keydown="parseSpecialKeys"
      @input="processInput"
    >
      {{ initialBlockContent }}
    </p>
  </div>
</template>
<style lang="scss" scoped>
.block__content--checkbox {
  display: flex;
  column-gap: 0.5rem;
  flex-direction: row;
  justify-items: flex-start;

  &__label {
    height: 1rem;
    width: 1rem;
    align-self: start;
    align-items: start;
    margin-top: 2px;
  }
  &__checkbox {
    //Hiding the native checkbox but still accessible
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background: var(--color-base-90);
    border: 1px var(--color-base-30) solid;

    border-radius: 3px;
    height: 1em;
    width: 1em;
    align-self: center;
    transition: all 0.25s ease-in-out;

    cursor: pointer;

    /*
   // TODO: Usar un outline para marcar focus en checkbox?
    &:focus {
      outline: 1px solid var(--color-base-40);
      outline-offset: 2px;
    }*/

    &:checked {
      background: var(--color-accent) url("@/assets/icons/checked-icon.svg")
        no-repeat center center / cover;
    }
  }
  &__text {
    flex-grow: 1;
    &--checked {
      color: var(--color-base-40);
      text-decoration: line-through var(--color-base-40);
    }
  }
}
</style>
