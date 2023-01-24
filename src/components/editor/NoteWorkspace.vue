<script setup lang="ts">
import NoteEditor from "./NoteEditor.vue";
import NoteWorkspaceHeader from "./NoteWorkspaceHeader.vue";
import { useEditorStore } from "@/stores/editor";
import { computed } from "vue";

const editorStore = useEditorStore();

const scrollStateClass = computed(() => {
  return editorStore.commandPaletteOpen ? "disable-scroll" : "allow-scroll";
});
const note = computed(() => {
  return editorStore.noteInEditor;
});
</script>

<template>
  <div v-if="note" id="workspace" :class="scrollStateClass">
    <NoteWorkspaceHeader id="ws__header" />
    <NoteEditor :note="note" id="ws__editor" />
  </div>
</template>

<style scoped lang="scss">
#workspace {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}
#ws__header {
  position: sticky;
  top: 0;
  left: 0;
  align-self: flex-start;
  height: 3.5rem;
  width: 100%;
  z-index: 3;
}

#ws__editor {
  margin-top: 2.5rem;
}

.allow-scroll {
  overflow-y: auto;
}
.disable-scroll {
  overflow-y: hidden;
}
</style>
