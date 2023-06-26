<script setup lang="ts">
import { SidebarCloseIcon, SidebarOpenIcon } from "../icons";
import HeaderBreadcrumbs from "./HeaderBreadcrumbs.vue";
import HeaderSaveButton from "./HeaderSaveButton.vue";

defineProps({
  isSidebarOpen: {
    type: Boolean,
    required: true,
  },
});
defineEmits(["toggle-sidebar"]);
</script>

<template>
  <menu class="ws__header">
    <div class="ws__header__nav-section">
      <button
        @click="$emit('toggle-sidebar')"
        class="ws__header__btn ws__header__btn--toggle-sidebar"
        :title="$t('tooltips.sidebarButton')"
        data-test="sidebar-toggle-btn"
      >
        <SidebarCloseIcon v-if="isSidebarOpen" />
        <SidebarOpenIcon v-else />
      </button>
      <HeaderBreadcrumbs />
    </div>
    <HeaderSaveButton />
  </menu>
</template>

<style scoped lang="scss">
.ws__header {
  display: flex;
  background-color: var(--color-base-100);
  padding: 12px;
  justify-content: space-between;
  box-shadow: -8px 13px 43px 0px rgba(0, 0, 0, 0.03);
  align-items: center;
  &__nav-section {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }
}

:deep(.ws__header__btn) {
  font-size: 14px;
  //Could be turned into a button--primary class
  justify-content: center;
  display: flex;
  align-items: center;
  background: var(--color-base-100);
  color: var(--color-text);
  border: 1px solid var(--color-base-80);
  border-radius: 4px;
  gap: 6px;
  padding: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--color-base-80);
    color: var(--x=color-base-0);
  }
  &:active {
    transform: scale(0.95);
  }
  span {
    font-size: inherit;
  }
}
.ws__header__btn--toggle-sidebar {
  border: none;
}
</style>
