<script setup lang="ts">
import { ref, type Ref } from "vue";
import NoteComponent from "./NoteComponent.vue";

const editor: Ref<HTMLElement | null> = ref(null);
defineExpose({ editor });
</script>
<template>
  <main id="editor" ref="editor">
    <NoteComponent />
  </main>
</template>
<style scoped lang="scss"></style>
