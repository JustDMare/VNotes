<script setup lang="ts">
import NavigationFolder from "./NavigationFolder.vue";
import NavigationNote from "./NavigationNote.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const sidebarContent = mainStore.$state.userSpace.content;
</script>

<template>
  <nav id="navigation">
    <NavigationFolder
      v-for="folderReference in sidebarContent.folders"
      :key="folderReference.folderID"
      :folder-reference="folderReference"
    />
    <NavigationNote
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
