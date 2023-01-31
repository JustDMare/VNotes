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
/*TODO: To fix this shit 
  - Make the menu non relative (either with fixed or some other way)
  - Have 2 layers of activation:
    - First layer will use the v-if to render the menu.
    - Second layer will use the v-show to actually show the menu.
  - The flow will be as follows:
    - the v-if will be triggered when the user clicks the button.
    - once the v-if is activated, wait for the NextTick so the component is rendered.
    - Calculate the position at which the component should be placed based on the button's
      location.
    - Set the position of the menu.
    - Activate the v-show to show the menu.
I think this should work. Albeit a bit complicated, it should be the best option right now
*/
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
        class="nav-item__options__menu__button"
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
  &__menu__button {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 4px;
    background-color: transparent;
    z-index: 6;
  }
  :deep(.base-dropdown__button) {
    justify-content: center;
    border-radius: 2px;
  }
  :deep(.base-dropdown__menu) {
    z-index: 6;
    width: 200px;
    background-color: var(--color-base-10);
  }
}
</style>
