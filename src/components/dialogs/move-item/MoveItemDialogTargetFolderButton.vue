<script lang="ts">
/**
 *
 *
 * @component MoveItemDialogTargetFolderLabel
 */
export default {
  name: "MoveItemDialogTargetFolderButton",
};
</script>

<script lang="ts" setup>
import { FadeTransition } from "@/components/animations";
import { computed, ref, watchEffect } from "vue";

const props = defineProps<{
  folderName: string;
  folderId: string;
  selectedNewParentFolderId: string | null;
}>();
const emits = defineEmits<{
  (e: "folder-selected", folderId: string): void;
}>();
const isSelected = ref(props.selectedNewParentFolderId === props.folderId);
watchEffect(() => {
  isSelected.value = props.selectedNewParentFolderId === props.folderId;
});

const checkboxId = computed(() => {
  return `folder-${props.folderId}`;
});

function onCheckboxChange(event: Event) {
  event.preventDefault();
  emits("folder-selected", props.folderId);
  return false;
}
</script>

<template>
  <label class="move-item__target-list__target__name" :for="checkboxId"
    >{{ folderName }}
    <FadeTransition>
      <input
        v-show="isSelected"
        :id="checkboxId"
        :checked="isSelected"
        @change="onCheckboxChange"
        type="checkbox"
        class="move-item__target-list__target__checkbox"
      />
    </FadeTransition>
  </label>
</template>

<style lang="scss" scoped>
.move-item__target-list__target {
  &__name {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }
  &__checkbox {
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
