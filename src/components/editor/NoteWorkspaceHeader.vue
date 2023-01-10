<script setup lang="ts">
import { useEditorStore } from "@/stores/editor";
//TODO: CONTINUAR PONIENDO EL PLACEHOLDER A LOS BLOQUES PARA INTERNACIONALIZARLOS
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
}
</style>
