<script setup lang="ts">
import { ChevronRightIcon, FolderIcon } from "@/components/icons";
import type { NavigationFolderReference } from "@/types";
import { ref, type PropType } from "vue";
import NavigationNote from "./NavigationNote.vue";

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
  <button class="nav__folder nav__item" @click="toggleContentVisibility">
    <ChevronRightIcon class="nav__icon nav__icon--chevron" />
    <FolderIcon class="nav__icon nav__icon--folder" />
    <span class="nav__item__text">{{ folderReference.name }}</span>
  </button>
  <div class="nav__folder__content" v-if="showContents">
    <NavigationFolder
      v-for="subfolderReference in folderReference.content.folders"
      :key="subfolderReference.folderID"
      :folder-reference="subfolderReference"
    />
    <NavigationNote
      v-for="noteReference in folderReference.content.notes"
      :key="noteReference.noteID"
      :note-reference="noteReference"
    />
  </div>
</template>

<style scoped lang="scss">
.nav__folder {
  padding-left: 16px;
  background-color: transparent;
  border: 0;
  text-align: start;

  &__content {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
  }
}
</style>
