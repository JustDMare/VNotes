<script lang="ts" setup>
import { i18n } from "@/i18n/i18n.plugin";
import { useUserSpaceStore } from "@/stores/user-space";
import type { Folder } from "vnotes-types";
import { toRef } from "vue";
import MoveItemDialogTargetFolder from "./MoveItemDialogTargetFolder.vue";

const userSpaceStore = useUserSpaceStore();
const sidebarContent = toRef(userSpaceStore.$state.userSpace, "content");
const t = i18n.global.t;

const rootFolder: Folder = {
  _id: userSpaceStore.userSpace._id,
  name: t("moveItemDialog.rootFolder"),
  content: {
    folders: [],
    notes: [],
  },
  numberOfItems: 0,
  createdTime: "",
  lastUpdatedTime: "",
};

defineProps<{ selectedNewParentFolderId: string | null }>();

const emits = defineEmits<{
  (e: "folder-selected", folderId: string): void;
}>();

function handleFolderSelected(folderId: string) {
  emits("folder-selected", folderId);
}
</script>

<template>
  <ul class="move-item__target-list">
    <MoveItemDialogTargetFolder
      :selected-new-parent-folder-id="selectedNewParentFolderId"
      @folder-selected="handleFolderSelected"
      :folder="rootFolder"
    />

    <MoveItemDialogTargetFolder
      v-for="folder in sidebarContent.folders"
      :key="folder._id"
      :folder="folder"
      :selected-new-parent-folder-id="selectedNewParentFolderId"
      @folder-selected="handleFolderSelected"
    />
  </ul>
</template>

<style lang="scss" scoped>
.move-item__target-list,
:deep(.move-item__target-list) {
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.move-item__target-list {
  overflow-y: auto;
  height: 100%;
  border: solid 1px var(--color-base-70);
  border-radius: 4px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}

:deep(.move-item__target-list) {
  padding-left: 0.5rem;
  margin-left: calc(1rem - 0.5px);
  border-left: 1px solid var(--color-base-50);
}
:deep(.move-item__target-list__target-item) {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
