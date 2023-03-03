<script lang="ts" setup>
import type { Folder } from "vnotes-types";
import { ref, toRef, watchEffect } from "vue";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderLabel.vue";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue";
import { useEventStore } from "@/stores/event";

const props = defineProps<{ folder: Folder; selectedNewParentFolderId: string | null }>();
const emits = defineEmits<{
  (e: "folder-selected", folderId: string): void;
}>();

const eventStore = useEventStore();
const dialogEvent = toRef(eventStore, "moveItemDialogEvent");

const showSubfolders = ref(false);
const isFolderSelected = ref(props.selectedNewParentFolderId === props.folder._id);

watchEffect(() => {
  isFolderSelected.value = props.selectedNewParentFolderId === props.folder._id;
  if (!dialogEvent.value.isOpen) {
    showSubfolders.value = false;
  }
});

function handleFolderSelected(folderId: string) {
  emits("folder-selected", folderId);
}

function toggleSubfolderVisibility() {
  showSubfolders.value = !showSubfolders.value;
}
</script>

<template>
  <li class="move-item__target-list__target-item" v-if="dialogEvent.movedItemId !== folder._id">
    <div
      class="move-item__target-list__target"
      :class="{ 'move-item__target-list__target--selected': isFolderSelected }"
    >
      <div class="move-item__target-list__target__dropdown-btn">
        <button
          class="move-item__target-list__target__dropdown-btn"
          @click="toggleSubfolderVisibility"
          v-if="folder.content.folders.length > 0"
        >
          <ChevronRightIcon
            class="target__icon target__icon--chevron"
            :rotate-down="showSubfolders"
          />
        </button>
      </div>

      <MoveItemDialogTargetFolderButton
        :folder-name="folder.name"
        :folder-id="folder._id"
        :selected-new-parent-folder-id="selectedNewParentFolderId"
        @folder-selected="handleFolderSelected"
      />
    </div>
    <ul v-if="showSubfolders" class="move-item__target-list">
      <MoveItemDialogTargetFolder
        v-for="childFolder in folder.content.folders"
        :key="childFolder._id"
        :folder="childFolder"
        :selected-new-parent-folder-id="selectedNewParentFolderId"
        @folder-selected="handleFolderSelected"
      />
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.move-item__target-list__target {
  list-style-type: none;
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  justify-content: stretch;
  gap: 4px;
  padding: 4px 6px 4px 6px;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.25s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: var(--color-base-80);
  }
  &--selected {
    background-color: var(--color-base-70);

    &:hover {
      background-color: var(--color-base-70);
    }
  }

  &__dropdown-btn {
    display: inline-flex;
    background: none;
    border: none;
    padding: 0;
    align-self: center;
    align-content: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &:hover {
      background-color: var(--color-base-60);
    }
  }
}

.target__icon {
  width: 20px;
  height: 20px;
  align-self: center;

  &--chevron {
    grid-column: 1;
  }
}
</style>
