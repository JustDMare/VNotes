<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import { useUserSpaceStore } from "@/stores/user-space";
import type { Folder, Note } from "vnotes-types";
import { ref, toRef, watchEffect } from "vue";
import BreadcrumbComponent from "./BreadcrumbComponent.vue";

const userSpaceStore = useUserSpaceStore();
const editorStore = useEditorStore();

const note: Note | null = editorStore.noteInEditor;
const parentHashtable = toRef(userSpaceStore, "parentHashTable");

const breadcrumbs = ref<Folder[]>([]);

watchEffect(() => {
  if (parentHashtable.value) {
    computeBreadcrumbs();
  }
});

function computeBreadcrumbs() {
  breadcrumbs.value = [];
  if (!note) {
    return breadcrumbs;
  }
  const parents = getOrderedParentIds(note);
  let currentLevelParents = userSpaceStore.userSpace.content.folders;
  let parentFolder;
  parents.forEach((parent: string) => {
    parentFolder = currentLevelParents.find((folder: Folder) => folder._id === parent);
    if (parentFolder) {
      breadcrumbs.value.push(parentFolder);
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
</script>

<template>
  <div class="header__breadcrumbs" v-if="note">
    <BreadcrumbComponent v-for="folder in breadcrumbs" :key="folder._id" :name="folder.name" />
    <BreadcrumbComponent class="header__breadcrumbs__note" :name="note.title" :show-icon="false" />
  </div>
</template>

<style lang="scss" scoped>
.header__breadcrumbs {
  display: flex;
  flex-direction: row;
  &__note > :deep(.breadcrumb__text) {
    font-weight: 600;
    font-style: italic;
  }
}
</style>
