<script setup lang="ts">
import NavigationFolder from "./NavigationFolder.vue";
import NavigationNote from "./NavigationNote.vue";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
const sidebarContent = editorStore.$state.userSpace.content;
</script>

<template>
  <nav>
    <ul class="nav">
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
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
//Variables
.nav {
  --nav-icon-size: 1rem;
}
.nav {
  margin-top: 0.5rem;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
}
:deep(.nav) {
  &,
  .nav__folder,
  .nav__folder__content,
  .nav__note {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
  }
  &,
  .nav__folder__content {
    list-style: none;
    padding-inline-start: 0;
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
