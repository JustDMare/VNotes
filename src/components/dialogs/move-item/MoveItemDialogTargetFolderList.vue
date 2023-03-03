<script lang="ts" setup>
import { useUserSpaceStore } from "@/stores/user-space";
import { toRef } from "vue";
import MoveItemDialogTargetFolderLabel from "./MoveItemDialogTargetFolderLabel.vue";
import MoveItemDialogTargetFolder from "./MoveItemDialogTargetFolder.vue";

const userSpaceStore = useUserSpaceStore();
const sidebarContent = toRef(userSpaceStore.$state.userSpace, "content");

defineProps<{ selectedNewParentFolderId: string | null }>();
const emits = defineEmits<{
  (e: "folder-selected", folderId: string | null): void;
}>();

function handleFolderSelected(folderId: string | null) {
  emits("folder-selected", folderId);
}
</script>

<template>
  <ul class="move-item__target-list">
    <li class="move-item__target-list__target-item">
      <MoveItemDialogTargetFolderLabel
        :folder-name="$t('moveItemDialog.rootFolder')"
        :selected-new-parent-folder-id="selectedNewParentFolderId"
        :folder-id="null"
        @folder-selected="handleFolderSelected"
      />
    </li>
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
.move-item__target-list {
  overflow-y: auto;
  height: 100%;
}
.move-item__target-list,
:deep(.move-item__target-list) {
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
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
