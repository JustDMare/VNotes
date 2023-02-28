<script lang="ts" setup>
import { useUserSpaceStore } from "@/stores/user-space";
import { toRef } from "vue";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";
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
  <ul>
    <li>
      <MoveItemDialogTargetFolderButton
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
ul,
:deep(ul) {
  padding-inline-start: 0;
}
:deep(ul) {
  padding-left: 1rem;
}
:deep(li) {
  list-style-type: none;
}
</style>
