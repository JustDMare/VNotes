<script setup lang="ts">
import { SidebarComponent } from "@/components/sidebar";
import { NoteWorkspace } from "@/components/editor";
import CommandPalette from "@/components/editor/command-palette/CommandPalette.vue";
import {
  CreateAndRenameItemDialog,
  MoveItemDialog,
  DeleteItemDialog,
  UserSettingsDialog,
} from "@/components/dialogs";
import { ref } from "vue";

const isSidebarOpen = ref(true);
function onToggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value;
}
</script>

<template>
  <div id="main-view">
    <SidebarComponent id="sidebar" :is-sidebar-open="isSidebarOpen" />
    <NoteWorkspace
      :is-sidebar-open="isSidebarOpen"
      @toggle-sidebar="onToggleSidebar"
      id="workspace"
    />
  </div>
  <CommandPalette />
  <CreateAndRenameItemDialog />
  <DeleteItemDialog />
  <MoveItemDialog />
  <UserSettingsDialog />
</template>

<style lang="scss" scoped>
#main-view {
  display: flex;
  flex-direction: row;
  height: 100%;
}
#dialogs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 11;
}
</style>
