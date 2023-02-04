<script lang="ts" setup>
import BaseDropdown from "@/components/base/BaseDropdown.vue";
import { OptionsButtonIcon } from "@/components/icons";
import type { NavigationItemOption } from "@/commands/navigation-item-options/interfaces";
import type { PropType } from "vue";

const MENU_MARGIN_FROM_BUTTON = 8;
const MENU_LEFT_DISPLACEMENT = 0.25;

defineProps({
  options: {
    type: Array as PropType<NavigationItemOption[]>,
    required: true,
  },
});
defineEmits(["optionsDropdownOpened", "optionsDropdownClosed"]);
</script>

<template>
  <Transition name="fade">
    <BaseDropdown
      @dropdown-opened="$emit('optionsDropdownOpened')"
      @dropdown-closed="$emit('optionsDropdownClosed')"
      class="nav-item__options"
      :menu-margin-from-button-in-px="MENU_MARGIN_FROM_BUTTON"
      :menu-percentage-left-alignment="MENU_LEFT_DISPLACEMENT"
    >
      <template #button-content>
        <OptionsButtonIcon
          :title="$t('tooltips.navigationItemOptionsButton')"
          class="nav-item__options__icon"
        />
      </template>
      <template #menu="{ closeOnClick }">
        <button
          class="nav-item__options__menu__button"
          v-for="option in options"
          :key="option.name"
          @click="option.action(), closeOnClick()"
        >
          <component :is="option.icon" :title="option.name" />
          <span>{{ option.name }}</span>
        </button>
      </template>
    </BaseDropdown>
  </Transition>
</template>

<style lang="scss" scoped>
.nav-item__options {
  width: 20px;
  height: 20px;
  justify-self: end;
  margin-right: 2px;

  &__icon {
    height: var(--nav-icon-size);
    width: var(--nav-icon-size);
  }
  &__menu__button {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    column-gap: 6px;
    padding: 6px 1.5rem 6px 6px;
    border-radius: 3px;
    background-color: var(--color-base-100);
    border: none;
    justify-self: stretch;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: var(--color-base-80);
      color: var(--color-base-10);
    }
  }
}
:deep(.base-dropdown__button) {
  justify-content: center;
  color: var(--color-base-30);
  border-radius: 3px;
  transition: all 0.2s ease-in;
  &:hover {
    color: var(--color-base-10);
    background-color: var(--color-base-60);
  }
  &.button--active {
    color: var(--color-base-10);
    background-color: var(--color-base-60);
  }
  &:active {
    transform: scale(0.95);
  }
}
:deep(.base-dropdown__menu) {
  position: fixed;
  width: fit-content;
  align-items: stretch;
  justify-items: stretch;
  padding: 6px;
  border-radius: 3px;
  background-color: var(--color-base-100);
  box-shadow: 0px 0px 22px -3px rgba(0, 0, 0, 0.2);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
