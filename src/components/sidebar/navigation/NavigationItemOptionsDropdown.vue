<script lang="ts" setup>
import BaseDropdown from "@/components/base/BaseDropdown.vue";
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
  <BaseDropdown class="nav-item__options">
    <template #button-content>
      <OptionsButtonIcon
        :title="$t('tooltips.navigationItemOptionsButton')"
        class="nav-item__options__icon"
      />
    </template>
    <template #menu>
      <button
        class="nav-item__options__menu-button"
        v-for="option in options"
        :key="option.name"
        @click="option.action"
      >
        <component :is="option.icon" :title="option.name" />
        <span>{{ option.name }}</span>
      </button>
    </template>
  </BaseDropdown>
</template>

<style lang="scss" scoped>
.nav-item__options {
  &__icon {
    height: var(--nav-icon-size);
    width: var(--nav-icon-size);
  }
  &__menu-button {
  }
  :deep(.base-dropdown__button) {
    justify-content: center;
    border-radius: 2px;
  }
  :deep(.base-dropdown__menu) {
    width: 200px;
  }
}
</style>
