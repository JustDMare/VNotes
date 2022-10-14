<script setup lang="ts">
import EditorComponent from "@/components/editor/EditorComponent.vue";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";
</script>

<template>
  <div id="editor">
    <SidebarComponent id="sidebar" />
    <EditorComponent id="editor" />
  </div>
</template>
<style lang="scss" scoped>
#editor {
  display: flex;
  flex-direction: row;
}
</style>
