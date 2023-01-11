<script setup lang="ts">
import NoteEditor from "./NoteEditor.vue";
import NoteWorkspaceHeader from "./NoteWorkspaceHeader.vue";
</script>
<template>
  <div id="workspace">
    <NoteWorkspaceHeader id="ws__header" />
    <NoteEditor id="ws__editor" />
  </div>
</template>
<style scoped lang="scss">
#workspace {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  position: relative;
}
#ws__header {
  position: sticky;
  top: 0;
  left: 0;
  align-self: flex-start;
  min-height: 2.5rem;
  width: 100%;
  z-index: 3;
}

#ws__editor {
  margin-top: 2.5rem;
}
</style>
