<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import SidebarFolder from "./SidebarFolder.vue";
import SidebarNote from "./SidebarNote.vue";

const mainStore = useMainStore();
const sidebarContent = mainStore.$state.workspace.content;
console.log(sidebarContent);
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped lang="scss"></style>
