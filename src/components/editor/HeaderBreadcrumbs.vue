<script lang="ts" setup>
//TODO: On Click I could open a component like NavigationItemOptionsDropdown that allows
//me to create/edit/delete/etc in the parents of the note. Or do something similar to
//Obsidian where it opens the parent folders in the sidebar and highlights them

import { useEditorStore } from "@/stores/editor";
import { useUserSpaceStore } from "@/stores/user-space";
import { computed } from "vue";

const userSpaceStore = useUserSpaceStore();
const editorStore = useEditorStore();

//TODO: I think it'll be better to return the temporal hashmap from the backend that is
//used to compute the nested folder structure to make it easy to find the breadcrumbs
const breadcrumbs = computed(() => {
  return [];
});
</script>

<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
