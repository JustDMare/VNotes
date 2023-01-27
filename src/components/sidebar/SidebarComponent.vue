<script setup lang="ts">
import { ref, type Ref } from "vue";
import SidebarNavigation from "./navigation/SidebarNavigation.vue";
import UserDropdown from "./UserDropdown.vue";

const sidebar: Ref<HTMLDivElement | null> = ref(null);
const resizer: Ref<HTMLDivElement | null> = ref(null);

function resize(event: MouseEvent): void {
  const size = `${event.x}px`;
  if (sidebar.value && sidebar.value) {
    sidebar.value.style.flexBasis = size;
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
  <aside ref="sidebar" id="sidebar">
    <div id="sidebar-content">
      <UserDropdown />
      <SidebarNavigation id="sidebar-nav" />
    </div>
    <div class="resizer" ref="resizer">
      <span @mousedown.prevent="onMouseDown" class="resizer-delimiter"></span>
    </div>
  </aside>
</template>

<style scoped lang="scss">
//variables
#sidebar {
  --sidebar-item--padding: 8px;
  --sidebar-item--margin: 6px;
}

#sidebar {
  background-color: var(--color-base-90);
  box-shadow: -1px 0px 2px rgba(0, 0, 0, 0.08) inset;
  display: flex;
}
:deep(.sidebar__item) {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-base-30);
  border-radius: 2px;
  padding: 2px 0 2px var(--sidebar-item--padding);
  margin: 0 var(--sidebar-item--margin) 0 var(--sidebar-item--margin);
  background-color: transparent;
  border: 0;
  text-align: start;
  transition: all 0.2s ease-in;
  &:hover {
    background-color: var(--color-base-80);
    color: var(--color-base-10);
  }
}
#sidebar-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  // overflow-y: auto;
  overflow-x: hidden;
}
#sidebar-nav {
  width: 100%;
}
.resizer {
  flex-basis: 1px;
  z-index: 4;
  border-right: 1px solid var(--color-base-50);
  box-sizing: border-box;
  width: 0;

  &-delimiter {
    cursor: col-resize;
    height: 100%;
    display: block;
    right: 2px;
    padding-left: 8px;
  }
}
</style>
