<script setup lang="ts">
import { SidebarComponent } from "@/components/sidebar";
import { NoteWorkspace } from "@/components/editor";
import CommandPalette from "@/components/editor/command-palette/CommandPalette.vue";
</script>

<template>
  <div id="main-view">
    <SidebarComponent id="sidebar" />
    <NoteWorkspace id="workspace" />
    <CommandPalette />
  </div>
</template>

<style lang="scss" scoped>
#main-view {
  display: flex;
  flex-direction: row;
  height: 100%;
}

#sidebar {
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 260px;
  min-width: 220px;
  max-width: 480px;
}

#workspace {
  flex-basis: 0;
  flex-grow: 1;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
}
</style>
