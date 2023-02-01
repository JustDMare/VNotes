<script lang="ts" setup>
// eslint-disable-next-line max-len
import BaseAbsolutelyPositionedDropdown from "@/components/base/BaseAbsolutelyPositionedDropdown.vue";
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
  <BaseAbsolutelyPositionedDropdown class="nav-item__options">
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
  </BaseAbsolutelyPositionedDropdown>
</template>

<style lang="scss" scoped>
.nav-item__options {
  &__icon {
    height: var(--nav-icon-size);
    width: var(--nav-icon-size);
    z-index: 1;
  }
  &__menu__button {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px;
    background-color: var(--color-base-100);
    z-index: 6;
    justify-self: stretch;
  }
  :deep(.base-dropdown__button) {
    justify-content: center;
    border-radius: 2px;
  }
  :deep(.base-dropdown__menu) {
    position: fixed;
    z-index: 6;
    width: fit-content;
    align-items: stretch;
    justify-items: stretch;
    background-color: var(--color-base-100);
  }
}
</style>
