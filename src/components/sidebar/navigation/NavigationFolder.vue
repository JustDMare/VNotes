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
  <li class="nav__folder">
    <button class="sidebar__item nav__item" @click="toggleContentVisibility">
      <ChevronRightIcon
        class="nav__icon nav__icon--chevron"
        :class="{ 'nav__icon--chevron--down': showContents }"
      />
      <FolderIcon class="nav__icon nav__icon--folder" />
      <span class="nav__item__text">{{ folderReference.name }}</span>
    </button>
    <ul class="nav__folder__content" v-if="showContents">
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
    </ul>
  </li>
</template>

<style scoped lang="scss">
.nav__folder {
  &__content {
    margin-left: 12px;
    border-left: 1px solid var(--color-base-50);
  }
}
.nav__icon--chevron {
  transition: transform 0.3s;
  &--down {
    transform: rotate(90deg);
  }
}
</style>
