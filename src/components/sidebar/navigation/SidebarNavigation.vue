<script setup lang="ts">
import NavigationFolder from "./NavigationFolder.vue";
import NavigationNote from "./NavigationNote.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const sidebarContent = mainStore.$state.userSpace.content;
</script>

<template>
  <nav class="nav">
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
//Variables
.nav {
  --nav-icon-size: 1.125em;
}
.nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
}

::v-deep .nav__icon {
  width: var(--nav-icon-size) !important;
  height: var(--nav-icon-size) !important;
}
</style>
