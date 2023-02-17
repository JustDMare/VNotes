<script setup lang="ts">
import { SidebarComponent } from "@/components/sidebar";
import { NoteWorkspace } from "@/components/editor";
import CommandPalette from "@/components/editor/command-palette/CommandPalette.vue";
import CreateAndRenameItemDialog from "@/components/CreateAndRenameItemDialog.vue";
import DeleteItemDialog from "@/components/DeleteItemDialog.vue";
</script>

<template>
  <div id="main-view">
    <SidebarComponent id="sidebar" />
    <NoteWorkspace id="workspace" />
    <CommandPalette />
    <CreateAndRenameItemDialog />
    <DeleteItemDialog />
  </div>
</template>

<style lang="scss" scoped>
#main-view {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
