<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import type { SidebarFolderReference } from "@/types";
import { ref, type PropType } from "vue";
import SidebarNote from "./SidebarNote.vue";

const mainStore = useMainStore();
defineProps({
  folderReference: {
    type: Object as PropType<SidebarFolderReference>,
    required: true,
  },
});
let showContents = ref(false);

function toggleContentVisibility(): void {
  showContents.value = !showContents.value;
}
</script>

<template>
  <button @click="toggleContentVisibility">{{ folderReference.name }}</button>
  <div class="folder" v-if="showContents">
    <div>
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
  </div>
</template>

<style scoped lang="scss">
.folder {
  padding-left: 16px;
}
</style>
