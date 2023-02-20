<script lang="ts" setup>
import type { Folder } from "vnotes-types";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";

const props = defineProps<{ folder: Folder; selectedNewParentFolderId: string | null }>();
</script>

<template>
  <li>
    <MoveItemDialogTargetFolderButton
      :folder-name="folder.name"
      :folder-id="folder._id"
      :selected-new-parent-folder-id="selectedNewParentFolderId"
    />
    <ul>
      <MoveItemDialogTargetFolder
        v-for="childFolder in folder.content.folders"
        :key="childFolder._id"
        :folder="childFolder"
        :selected-new-parent-folder-id="selectedNewParentFolderId"
      />
    </ul>
  </li>
</template>

<style lang="scss" scoped></style>
