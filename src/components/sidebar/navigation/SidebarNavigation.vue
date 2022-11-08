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
  --nav-icon-size: 1rem;
}
.nav {
  margin-top: 8px;

  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
}
.nav ::v-deep {
  &,
  .nav__folder__content {
    row-gap: 0.5rem;
  }
  .nav__item {
    display: grid;
    grid-template-columns: var(--nav-icon-size) var(--nav-icon-size) 1fr;
    column-gap: 2px;
    &__text {
      padding-left: 6px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: inherit;
    }
  }
  .nav__icon {
    width: var(--nav-icon-size);
    height: var(--nav-icon-size);

    &--chevron {
      grid-column: 1;
    }
    &--folder,
    &--note {
      grid-column: 2;
    }
  }
}
</style>
