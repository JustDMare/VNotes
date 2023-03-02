<script lang="ts" setup>
import type { Folder } from "vnotes-types";
import { ref } from "vue";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";

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
  <li>
    <button @click="toggleSubfolderVisibility">
      <ChevronRightIcon class="nav__icon nav__icon--chevron" :rotate-down="showSubfolders" />
    </button>
    <MoveItemDialogTargetFolderButton
      :folder-name="folder.name"
      :folder-id="folder._id"
      :selected-new-parent-folder-id="selectedNewParentFolderId"
      @folder-selected="handleFolderSelected"
    />
    <ul>
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

<style lang="scss" scoped></style>
