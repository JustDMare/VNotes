<script lang="ts" setup>
//TODO: On Click I could open a component like NavigationItemOptionsDropdown that allows
//me to create/edit/delete/etc in the parents of the note. Or do something similar to
//Obsidian where it opens the parent folders in the sidebar and highlights them

import { useEditorStore } from "@/stores/editor";
import { useUserSpaceStore } from "@/stores/user-space";
import type { Folder } from "vnotes-types";
import { computed } from "vue";

const userSpaceStore = useUserSpaceStore();
const editorStore = useEditorStore();

const breadcrumbs = computed(() => {
  const note = editorStore.noteInEditor;
  if (note) {
    const breadcrumbs: Folder[] = [];
    let parents: string[] = [];
    let parentId = note.parentId;
    while (parentId) {
      parents.push(parentId);
      parentId = userSpaceStore.parentHashTable[parentId];
    }
    parents = parents.reverse();
    parents.forEach((parent: string) => {
      //TODO: I have to rethink this
      //breadcrumbs.push(userSpaceStore.userSpace.content.folders[parent]);
    });
  }
  return [];
});
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
