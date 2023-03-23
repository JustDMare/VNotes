<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import { useUserSpaceStore } from "@/stores/user-space";
import type { Folder, Note } from "vnotes-types";
import { computed } from "vue";
import BreadcrumbComponent from "./BreadcrumbComponent.vue";

//TODO: On Click I could open a component like NavigationItemOptionsDropdown that allows
//me to create/edit/delete/etc in the parents of the note. Or do something similar to
//Obsidian where it opens the parent folders in the sidebar and highlights them
const userSpaceStore = useUserSpaceStore();
const editorStore = useEditorStore();

const note: Note | null = editorStore.noteInEditor;

const breadcrumbs = computed(() => {
  return computeBreadcrumbs();
});

function computeBreadcrumbs() {
  const breadcrumbs: Folder[] = [];
  if (!note) {
    return breadcrumbs;
  }
  const parents = getOrderedParentIds(note);
  let currentLevelParents = userSpaceStore.userSpace.content.folders;
  let parentFolder;
  parents.forEach((parent: string) => {
    parentFolder = currentLevelParents.find((folder: Folder) => folder._id === parent);
    if (parentFolder) {
      breadcrumbs.push(parentFolder);
      currentLevelParents = parentFolder.content.folders;
    }
  });

  function getOrderedParentIds(note: Note) {
    let parents: string[] = [];
    let parentId = note.parentId;
    while (parentId) {
      parents.push(parentId);
      parentId = userSpaceStore.parentHashTable[parentId];
    }
    return parents.reverse();
  }
  return breadcrumbs;
}
//TODO: MISSING BETTER STYLING
</script>

<template>
  <div class="header__breadcrumbs" v-if="note">
    <BreadcrumbComponent v-for="folder in breadcrumbs" :key="folder._id" :name="folder.name" />
    <BreadcrumbComponent :name="note.title" :show-icon="false" />
  </div>
</template>

<style lang="scss" scoped>
.header__breadcrumbs {
  display: flex;
  flex-direction: row;
}
</style>
