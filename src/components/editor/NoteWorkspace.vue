<script setup lang="ts">
import { ref, type Ref } from "vue";
import NoteEditor from "./NoteEditor.vue";

const workspace: Ref<HTMLElement | null> = ref(null);
defineExpose({ workspace });
</script>
<template>
  <div id="workspace" ref="workspace">
    <NoteEditor />
  </div>
</template>
<style scoped lang="scss"></style>
