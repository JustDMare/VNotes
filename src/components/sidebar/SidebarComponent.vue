<script setup lang="ts">
import { ref, type Ref } from "vue";
import SidebarNavigation from "./navigation/SidebarNavigation.vue";
import SidebarNewFolderAndNoteButtons from "./SidebarNewFolderAndNoteButtons.vue";
import SidebarUserDropdown from "./SidebarUserDropdown.vue";

defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});
const sidebar: Ref<HTMLDivElement | null> = ref(null);
const resizer: Ref<HTMLDivElement | null> = ref(null);
const originalTransition = ref("");

function resize(event: MouseEvent): void {
  const size = `${event.x}px`;
  if (sidebar.value && sidebar.value) {
    sidebar.value.style.transition = "none";
    sidebar.value.style.flexBasis = size;
    document.body.style.cursor = "col-resize";
  }
}

function onMouseDown(): void {
  if (sidebar.value) {
    originalTransition.value = sidebar.value.style.transition;
  }
  document.addEventListener("mousemove", resize, false);
  document.addEventListener(
    "mouseup",
    () => {
      document.removeEventListener("mousemove", resize, false);
      document.body.style.cursor = "default";
      if (sidebar.value) {
        sidebar.value.style.transition = originalTransition.value;
      }
    },
    false
  );
}
</script>

<template>
  <aside
    ref="sidebar"
    class="sidebar"
    :class="isSidebarOpen ? 'sidebar--open' : 'sidebar--closed'"
    data-test="sidebar"
  >
    <div id="sidebar-content">
      <SidebarUserDropdown />
      <SidebarNewFolderAndNoteButtons />
      <SidebarNavigation id="sidebar-nav" />
    </div>
    <div class="resizer" ref="resizer">
      <span @mousedown.prevent="onMouseDown" class="resizer-delimiter"></span>
    </div>
  </aside>
</template>

<style scoped lang="scss">
//variables
.sidebar {
  --sidebar-item--padding: 4px;
  --sidebar-item--margin: 6px;
}

.sidebar {
  background-color: var(--color-base-90);
  box-shadow: -1px 0px 2px rgba(0, 0, 0, 0.08) inset;
  display: flex;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) 0s;
  &--open {
    width: 300px;
    min-width: 280px;
    max-width: 500px;
    > #sidebar-content {
      transition: opacity 0.2s ease-in 0.05s;
      opacity: 1;
    }
  }
  &--closed {
    width: 0 !important;
    min-width: 0 !important;
    flex-basis: 0 !important;
    > #sidebar-content {
      transition: opacity 0.05s ease-in;
      opacity: 0;
    }
    > .resizer {
      display: none;
    }
  }
}

#sidebar-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
#sidebar-nav {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  border-top: 1px solid var(--color-base-80);
}

:deep(.sidebar__item) {
  display: grid;
  grid-template-columns: 9fr 24px;
  border-radius: 3px;
  padding: 2px 0 2px 0;
  margin: 0 var(--sidebar-item--margin) 0 var(--sidebar-item--margin);
  background-color: transparent;
  color: var(--color-base-30);
  transition: all 0.2s ease-in;
  &:hover {
    background-color: var(--color-base-80);
    color: var(--color-base-10);
  }
}
:deep(.sidebar__item--highlight) {
  background-color: var(--color-base-80);
  color: var(--color-base-10);
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
