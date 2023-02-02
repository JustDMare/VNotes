<script lang="ts" setup>
import { ref } from "vue";

const showDropdown = ref(false);
const dropdownMenu = ref<HTMLElement | null>(null);
const dropdownButton = ref<HTMLElement | null>(null);

function toggleDropdown(): void {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }
}
function handleClickOutside(event: MouseEvent) {
  if (
    dropdownMenu.value &&
    !dropdownMenu.value.contains(event.target as Node) &&
    dropdownButton.value &&
    !dropdownButton.value.contains(event.target as Node)
  ) {
    toggleDropdown();
  }
}
</script>

<template>
  <div class="base-dropdown--relative">
    <button class="base-dropdown--relative__button" ref="dropdownButton" @click="toggleDropdown">
      <slot name="button-content"></slot>
    </button>
    <div class="base-dropdown--relative__menu" ref="dropdownMenu" v-if="showDropdown">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-dropdown--relative {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: transparent;

  &__button {
    width: 100%;
    height: 100%;
    border: none;
    display: flex;
    padding: 0;
    align-items: center;
    align-self: flex-start;
    background-color: transparent;
    cursor: pointer;
  }
  &__menu {
    position: absolute;
    top: 100%;
    right: 0;
    display: flex;
    flex-direction: column;
    z-index: 6;
    justify-content: center;
    align-items: center;
    background-color: var(--color-base-100);
    & > * {
      width: 100%;
      cursor: pointer;
    }
  }
}
</style>
