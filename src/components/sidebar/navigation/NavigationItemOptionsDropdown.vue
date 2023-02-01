<script lang="ts" setup>
import BaseDropdownAbsolutePosition from "@/components/base/BaseDropdownAbsolutePosition.vue";
import { OptionsButtonIcon } from "@/components/icons";
import type { NavigationItemOption } from "@/types";
import type { PropType } from "vue";

defineProps({
  options: {
    type: Array as PropType<NavigationItemOption[]>,
    required: true,
  },
});
</script>

<template>
  <BaseDropdownAbsolutePosition class="nav-item__options">
    <template #button-content>
      <OptionsButtonIcon
        :title="$t('tooltips.navigationItemOptionsButton')"
        class="nav-item__options__icon"
      />
    </template>
    <template #menu>
      <button
        class="nav-item__options__menu__button"
        v-for="option in options"
        :key="option.name"
        @click="option.action"
      >
        <component :is="option.icon" :title="option.name" />
        <span>{{ option.name }}</span>
      </button>
    </template>
  </BaseDropdownAbsolutePosition>
</template>

<style lang="scss" scoped>
.nav-item__options {
  width: 20px;
  height: 20px;

  &__icon {
    height: var(--nav-icon-size);
    width: var(--nav-icon-size);
  }
  &__menu__button {
    display: flex;
    flex-direction: row;
    justify-content: start;
    column-gap: 6px;
    align-items: center;
    padding: 4px;
    background-color: var(--color-base-100);
    border: none;
    justify-self: stretch;
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
    &:active {
      transform: scale(0.95);
    }
  }
  :deep(.base-dropdown__menu) {
    position: fixed;
    width: fit-content;
    align-items: stretch;
    justify-items: stretch;
    padding: 8px 3rem 8px 6px;
    row-gap: 6px;
    border-radius: 3px;
    background-color: var(--color-base-100);
    box-shadow: 0px 0px 22px -3px rgba(0, 0, 0, 0.2);
  }
}
</style>
