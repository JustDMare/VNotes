<script setup lang="ts">
import NoteEditor from "./NoteEditor.vue";
import NoteWorkspaceHeader from "./NoteWorkspaceHeader.vue";
import { useEditorStore } from "@/stores/editor";
import { computed } from "vue";

const editorStore = useEditorStore();
defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});
const emits = defineEmits(["toggle-sidebar"]);
const scrollStateClass = computed(() => {
  return editorStore.commandPaletteOpen ? "disable-scroll" : "allow-scroll";
});
const note = computed(() => {
  return editorStore.noteInEditor;
});
function onToggleSidebar() {
  emits("toggle-sidebar");
}
</script>

<template>
  <div v-if="note" id="workspace" :class="scrollStateClass">
    <NoteWorkspaceHeader
      :is-sidebar-open="isSidebarOpen"
      @toggle-sidebar="onToggleSidebar"
      id="ws__header"
    />
    <NoteEditor :note="note" id="ws__editor" />
  </div>
</template>

<style scoped lang="scss">
#workspace {
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  flex-basis: 0;
  flex-grow: 1;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
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
