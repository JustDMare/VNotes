<script setup lang="ts">
import { SidebarComponent } from "@/components/sidebar";
import { onMounted, ref, type Ref } from "vue";
//TODO:Importing from the index.ts raises an error for some reason, investigate
//import NoteWorkspace from "@/components/editor/NoteWorkspace.vue";
import { NoteWorkspace } from "@/components/editor";

const sidebarComponent: Ref<InstanceType<typeof SidebarComponent> | null> =
  ref(null);
const workspaceComponent: Ref<InstanceType<typeof NoteWorkspace> | null> =
  ref(null);
const resizer: Ref<HTMLDivElement | null> = ref(null);

function resize(event: MouseEvent): void {
  const size = `${event.x}px`;
  if (sidebarComponent.value && sidebarComponent.value.sidebar) {
    sidebarComponent.value.sidebar.style.flexBasis = size;
    sidebarComponent.value.sidebar.style.cursor = "col-resize";
  }
  if (workspaceComponent.value && workspaceComponent.value.workspace) {
    workspaceComponent.value.workspace.classList.toggle("moving", true);
  }
}

onMounted(() => {
  if (resizer.value) {
    resizer.value.addEventListener("mousedown", () => {
      document.addEventListener("mousemove", resize, false);
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", resize, false);
          if (sidebarComponent.value && sidebarComponent.value.sidebar) {
            sidebarComponent.value.sidebar.style.cursor = "default";
          }
          if (workspaceComponent.value && workspaceComponent.value.workspace) {
            workspaceComponent.value.workspace.classList.toggle(
              "moving",
              false
            );
          }
        },
        false
      );
    });
  }
});
</script>

<template>
  <div id="main-view">
    <SidebarComponent id="sidebar" ref="sidebarComponent" />
    <div class="resizer" ref="resizer">
      <span class="resizer-delimiter"></span>
    </div>
    <NoteWorkspace id="workspace" ref="workspaceComponent" />
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
  max-width: 400px;
}

.resizer {
  flex-basis: 1px;
  z-index: 2;
  cursor: col-resize;
  padding: 0 8px;
  box-sizing: border-box;

  &-delimiter {
    border-left: 1px solid rgba(0, 0, 0, 0.4);
    height: 100%;
    display: block;
    margin-left: -8px;
  }
}

#workspace {
  flex-basis: 0;
  flex-grow: 1;
  height: 100%;
  flex-direction: row;
  position: relative;
  display: flex;
  margin: 0;
  padding: 0;

  &.moving {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
}
</style>
