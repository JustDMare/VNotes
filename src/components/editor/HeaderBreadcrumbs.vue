<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import { useUserSpaceStore } from "@/stores/user-space";
import type { Folder, Note } from "vnotes-types";
import { toRef, type Ref, computed, type ComputedRef } from "vue";
import BreadcrumbComponent from "./BreadcrumbComponent.vue";

const userSpaceStore = useUserSpaceStore();
const editorStore = useEditorStore();

const note: Ref<Note | null> = toRef(editorStore, "noteInEditor");
const parentHashTable = toRef(userSpaceStore, "parentHashTable");

const breadcrumbs: ComputedRef<Folder[]> = computed(() => {
  const breadcrumbs: Folder[] = [];
  if (!note.value) {
    return breadcrumbs;
  }
  const parents = getOrderedParentIds(note.value);
  let currentLevelParents = userSpaceStore.userSpace.content.folders;
  let parentFolder;
  parents.forEach((parent: string) => {
    parentFolder = currentLevelParents.find((folder: Folder) => folder._id === parent);
    if (parentFolder) {
      breadcrumbs.push(parentFolder);
      currentLevelParents = parentFolder.content.folders;
    }
  });
  return breadcrumbs;
});

function getOrderedParentIds(note: Note) {
  let parents: string[] = [];
  let parentId = note.parentId;
  while (parentId) {
    parents.push(parentId);
    parentId = parentHashTable.value[parentId];
  }
  return parents.reverse();
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
