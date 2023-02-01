<script lang="ts" setup>
import { nextTick, ref } from "vue";

const showDropdown = ref(false);
const renderDropdown = ref(false);
const dropdownMenu = ref<HTMLElement | null>(null);
const dropdownButton = ref<HTMLElement | null>(null);

function toggleDropdown(): void {
  renderDropdown.value = !renderDropdown.value;
  if (renderDropdown.value) {
    nextTick(() => {
      calculateDropdownPosition();
    });
  } else {
    showDropdown.value = false;
    document.removeEventListener("mousedown", handleClickOutside);
  }
}

function calculateDropdownPosition(): void {
  if (!dropdownButton.value || !dropdownMenu.value) {
    return;
  }
  const buttonRect = dropdownButton.value.getBoundingClientRect();
  const menuRect = dropdownMenu.value.getBoundingClientRect();
  const dropdownMenuStyle = dropdownMenu.value.style;
  dropdownMenuStyle.top = `${buttonRect.bottom + 4}px`;
  dropdownMenuStyle.left = `${buttonRect.right - menuRect.width / 2}px`;

  showDropdown.value = true;
  document.addEventListener("mousedown", handleClickOutside);
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
  <div class="base-dropdown">
    <button class="base-dropdown__button" ref="dropdownButton" @click="toggleDropdown">
      <slot name="button-content"></slot>
    </button>
    <div class="base-dropdown__menu" ref="dropdownMenu" v-if="renderDropdown">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-dropdown {
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
    z-index: 10;
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
