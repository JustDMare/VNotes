<script setup lang="ts">
import { SidebarComponent } from "@/components/sidebar";
import { NoteWorkspace } from "@/components/editor";
import CommandPalette from "@/components/editor/command-palette/CommandPalette.vue";
import {
  CreateAndRenameItemDialog,
  MoveItemDialog,
  DeleteItemDialog,
  UserSpaceSettingsDialog,
} from "@/components/dialogs";
</script>

<template>
  <div id="main-view">
    <SidebarComponent id="sidebar" />
    <NoteWorkspace id="workspace" />
    <CommandPalette />
    <CreateAndRenameItemDialog />
    <DeleteItemDialog />
    <MoveItemDialog />
    <UserSpaceSettingsDialog />
  </div>
</template>

<style lang="scss" scoped>
#main-view {
  display: flex;
  flex-direction: row;
  height: 100%;
}
</style>
