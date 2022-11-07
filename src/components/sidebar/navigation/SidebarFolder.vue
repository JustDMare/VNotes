<script setup lang="ts">
import type { NavigationFolderReference } from "@/types";
import { ref, type PropType } from "vue";
import SidebarNote from "./SidebarNote.vue";

defineProps({
  folderReference: {
    type: Object as PropType<NavigationFolderReference>,
    required: true,
  },
});
let showContents = ref(false);

function toggleContentVisibility(): void {
  showContents.value = !showContents.value;
}
</script>

<template>
  <button class="nav-folder" @click="toggleContentVisibility">
    {{ folderReference.name }}
  </button>
  <div class="nav-folder__content" v-if="showContents">
    <SidebarFolder
      v-for="subfolderReference in folderReference.content.folders"
      :key="subfolderReference.folderID"
      :folder-reference="subfolderReference"
    />
    <SidebarNote
      v-for="noteReference in folderReference.content.notes"
      :key="noteReference.noteID"
      :note-reference="noteReference"
    />
  </div>
</template>

<style scoped lang="scss">
.nav-folder {
  padding-left: 16px;
  &__content {
    margin-left: 16px;
  }
}
</style>
