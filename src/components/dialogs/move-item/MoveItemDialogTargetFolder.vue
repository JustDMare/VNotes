<script lang="ts" setup>
import type { Folder } from "vnotes-types";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";

defineProps<{ folder: Folder; selectedNewParentFolderId: string | null }>();
const emits = defineEmits<{
  (e: "folder-selected", folderId: string | null): void;
}>();

function handleFolderSelected(folderId: string | null) {
  emits("folder-selected", folderId);
}
</script>

<template>
  <li>
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
