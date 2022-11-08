<script setup lang="ts">
import { SidebarComponent } from "@/components/sidebar";
import { ref, type Ref } from "vue";
import { NoteWorkspace } from "@/components/editor";

const sidebarComponent: Ref<InstanceType<typeof SidebarComponent> | null> =
  ref(null);
const resizer: Ref<HTMLDivElement | null> = ref(null);

function resize(event: MouseEvent): void {
  const size = `${event.x}px`;
  if (sidebarComponent.value && sidebarComponent.value.sidebar) {
    sidebarComponent.value.sidebar.style.flexBasis = size;
    document.body.style.cursor = "col-resize";
  }
}

function onMouseDown(): void {
  document.addEventListener("mousemove", resize, false);
  document.addEventListener(
    "mouseup",
    () => {
      document.removeEventListener("mousemove", resize, false);
      document.body.style.cursor = "default";
    },
    false
  );
}
</script>

<template>
  <div id="main-view">
    <SidebarComponent id="sidebar" ref="sidebarComponent" />
    <div class="resizer" ref="resizer">
      <span @mousedown.prevent="onMouseDown" class="resizer-delimiter"></span>
    </div>
    <NoteWorkspace id="workspace" />
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
}
</style>
