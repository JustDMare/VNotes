<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";

const props = defineProps<{
  folderName: string;
  folderId: string | null;
  selectedNewParentFolderId: string | null;
}>();
const emits = defineEmits<{
  (e: "folder-selected", folderId: string | null): void;
}>();
const isSelected = ref(props.selectedNewParentFolderId === props.folderId);
watchEffect(() => {
  isSelected.value = props.selectedNewParentFolderId === props.folderId;
});

const checkboxId = computed(() => {
  if (props.folderId === null) {
    return "folder-root";
  }
  return `folder-${props.folderId}`;
});

function onCheckboxChange(event: Event) {
  event.preventDefault();
  emits("folder-selected", props.folderId);
  return false;
}
</script>

<template>
  <label class="move-item-dialog__target-folder__button__content" :for="checkboxId"
    >{{ folderName }}
    <input
      :id="checkboxId"
      :checked="isSelected"
      @change="onCheckboxChange"
      type="checkbox"
      class="move-item-dialog__target-folder__button__checkbox"
    />
  </label>
</template>

<style lang="scss" scoped>
.move-item-dialog {
  &__target-folder__button__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 0.5em 1em;
    &:hover {
      background-color: var(--color-base-80);
    }
  }
  &__target-folder__button__checkbox {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border-radius: 3px;
    height: 1em;
    width: 1em;
    align-self: center;
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    &:checked {
      background: url("@/assets/icons/checked-icon-black.svg") no-repeat center center / cover;
    }
  }
}
</style>
