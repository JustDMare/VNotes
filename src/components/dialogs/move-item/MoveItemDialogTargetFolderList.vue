<script lang="ts" setup>
import { useUserSpaceStore } from "@/stores/user-space";
import { toRef } from "vue";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";
import MoveItemDialogTargetFolder from "./MoveItemDialogTargetFolder.vue";

const userSpaceStore = useUserSpaceStore();
const sidebarContent = toRef(userSpaceStore.$state.userSpace, "content");

defineProps<{ selectedNewParentFolderId: string | null }>();
</script>

<template>
  <ul>
    <li>
      <MoveItemDialogTargetFolderButton
        :folder-name="$t('moveItemDialog.rootFolder')"
        :selected-new-parent-folder-id="selectedNewParentFolderId"
        :folder-id="null"
      />
    </li>
    <MoveItemDialogTargetFolder
      v-for="folder in sidebarContent.folders"
      :key="folder._id"
      :folder="folder"
      :selected-new-parent-folder-id="selectedNewParentFolderId"
    />
  </ul>
</template>

<style lang="scss" scoped></style>
