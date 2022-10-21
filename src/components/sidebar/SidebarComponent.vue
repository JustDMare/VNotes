<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import { ref, type Ref } from "vue";
import SidebarFolder from "./SidebarFolder.vue";
import SidebarNote from "./SidebarNote.vue";

const mainStore = useMainStore();
const sidebarContent = mainStore.$state.workspace.content;
const sidebar: Ref<HTMLDivElement | null> = ref(null);
defineExpose({ sidebar });
</script>

<template>
  <aside ref="sidebar">
    <nav>
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
  </aside>
</template>

<style scoped lang="scss"></style>
