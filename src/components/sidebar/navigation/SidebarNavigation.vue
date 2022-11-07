<script setup lang="ts">
import SidebarFolder from "./SidebarFolder.vue";
import SidebarNote from "./SidebarNote.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const sidebarContent = mainStore.$state.userSpace.content;
</script>

<template>
  <nav id="navigation">
    <SidebarFolder
      v-for="folderReference in sidebarContent.folders"
      :key="folderReference.folderID"
      :folder-reference="folderReference"
    />
    <SidebarNote
      v-for="noteReference in sidebarContent.notes"
      :key="noteReference.noteID"
      :note-reference="noteReference"
    />
  </nav>
</template>

<style lang="scss" scoped>
#navigation {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
