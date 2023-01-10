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
}
.workspace__header {
  position: sticky;
  align-self: flex-start;
  height: 20px;
}
</style>
