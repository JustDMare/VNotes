<script setup lang="ts">
import NoteEditor from "./NoteEditor.vue";
</script>
<template>
  <div id="workspace">
    <NoteEditor />
  </div>
</template>
<style scoped lang="scss">
#workspace {
  overflow-y: scroll;
}
</style>
