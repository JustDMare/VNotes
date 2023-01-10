<script setup lang="ts">
import NoteEditor from "./NoteEditor.vue";
import NoteWorkspaceHeader from "./NoteWorkspaceHeader.vue";
</script>
<template>
  <div id="workspace">
    <NoteWorkspaceHeader class="workspace__header" />
    <NoteEditor class="workspace__editor" />
  </div>
</template>
<style scoped lang="scss">
#workspace {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  position: relative;
}
.workspace__header {
  position: sticky;
  top: 0;
  left: 0;
  align-self: flex-start;
  flex-basis: 2rem;
  border-bottom: solid 1px black;
  margin-left: -15px;
  width: 100%;
}

.workspace__editor {
  margin-top: 2.5rem;
}
</style>
