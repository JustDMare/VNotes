<script lang="ts" setup>
import { useUserSpaceStore } from "@/stores/user-space";
import { toRef } from "vue";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";
import MoveItemDialogTargetFolder from "./MoveItemDialogTargetFolder.vue";

const userSpaceStore = useUserSpaceStore();
const sidebarContent = toRef(userSpaceStore.$state.userSpace, "content");
</script>

<template>
  <ul>
    <li><MoveItemDialogTargetFolderButton :folder-name="$t('moveItemDialog.rootFolder')" /></li>
    <MoveItemDialogTargetFolder
      v-for="folder in sidebarContent.folders"
      :key="folder._id"
      :folder="folder"
    />
  </ul>
</template>

<style lang="scss" scoped></style>
