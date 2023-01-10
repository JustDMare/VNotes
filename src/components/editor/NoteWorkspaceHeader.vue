<script setup lang="ts">
import { useEditorStore } from "@/stores/editor";
const editorStore = useEditorStore();
</script>
<template>
  <menu id="workspace-header">
    <button @click="editorStore.saveNoteChanges()">
      {{ $t("header.saveChanges") }}
    </button>
  </menu>
</template>
<style scoped lang="scss">
#workspace-header {
  display: flex;
  border-bottom: solid 1px black;
  background-color: var(--color-background);
}
</style>
