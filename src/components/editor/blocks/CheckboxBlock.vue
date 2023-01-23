<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import type { CheckboxBlock } from "vnotes-types";
import { ref, watch, type PropType, type Ref } from "vue";
import ContentEditableComponent from "./ContentEditableComponent.vue";

const props = defineProps({
  block: { type: Object as PropType<CheckboxBlock>, required: true },
});
const checkboxChecked: Ref<boolean> = ref(props.block.uniqueProperties.selected);
const blockContentEditable = ref<HTMLElement | null>(null);

defineExpose({ blockContentEditable });
const editorStore = useEditorStore();

watch(
  () => props.block.uniqueProperties.selected,
  (selected) => {
    checkboxChecked.value = selected;
  }
);

function onCheckboxChange(): void {
  editorStore.updateBlockUniqueProperty(
    props.block._id,
    "selected",
    !checkboxChecked.value
  );
}
</script>

<template>
  <div class="block__content--checkbox">
    <label :for="block._id" class="block__content--checkbox__label">
      <input
        type="checkbox"
        class="block__content--checkbox__checkbox"
        name="checkbox"
        :checked="checkboxChecked"
        @change="onCheckboxChange"
        :id="block._id"
      />
    </label>
    <ContentEditableComponent
      :block="block"
      tag="p"
      ref="blockContentEditable"
      class="block__content--checkbox__text note-editor__content-editable"
      :class="{
        'block__content--checkbox__text--checked':
          checkboxChecked && block.content.length,
      }"
    />
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

    &:checked {
      background: var(--color-base-10) url("@/assets/icons/checked-icon.svg") no-repeat
        center center / cover;
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
