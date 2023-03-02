<script lang="ts" setup>
import type { Folder } from "vnotes-types";
import { ref } from "vue";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue";

defineProps<{ folder: Folder; selectedNewParentFolderId: string | null }>();
const emits = defineEmits<{
  (e: "folder-selected", folderId: string | null): void;
}>();

const showSubfolders = ref(false);

function handleFolderSelected(folderId: string | null) {
  emits("folder-selected", folderId);
}

function toggleSubfolderVisibility() {
  showSubfolders.value = !showSubfolders.value;
}
</script>

<template>
  <li class="move-item__target-list__target-item">
    <div class="move-item__target-list__target">
      <button
        class="move-item__target-list__target__dropdown-btn"
        @click="toggleSubfolderVisibility"
      >
        <ChevronRightIcon
          class="target__icon target__icon--chevron"
          :rotate-down="showSubfolders"
        />
      </button>

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
  grid-template-columns: 1rem 1fr;
  align-items: center;
  gap: 4px;
  padding-inline-start: 0;

  &__dropdown-btn {
    display: inline-flex;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    align-content: center;
  }
}
.target__icon {
  width: var(--nav-icon-size);
  height: var(--nav-icon-size);
  align-self: center;

  &--chevron {
    grid-column: 1;
  }
}
</style>
