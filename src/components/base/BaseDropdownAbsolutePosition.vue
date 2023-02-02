<script lang="ts" setup>
import { nextTick, ref } from "vue";

const MENU_MARGIN_FROM_BUTTON = 8;
const MENU_LEFT_DISPLACEMENT = 1 / 4;

const showDropdown = ref(false);
const dropdownMenu = ref<HTMLElement | null>(null);
const dropdownButton = ref<HTMLElement | null>(null);

const emit = defineEmits(["dropdownOpened", "dropdownClosed"]);

function toggleDropdown(): void {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    nextTick(() => {
      calculateDropdownPosition();
    });
    emit("dropdownOpened");
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
    emit("dropdownClosed");
  }
}

function calculateDropdownPosition(): void {
  if (!dropdownButton.value || !dropdownMenu.value) {
    return;
  }
  const buttonRect = dropdownButton.value.getBoundingClientRect();
  const menuRect = dropdownMenu.value.getBoundingClientRect();
  const dropdownMenuStyle = dropdownMenu.value.style;

  if (menuRect.height + buttonRect.bottom > window.innerHeight) {
    dropdownMenuStyle.top = `${buttonRect.top - menuRect.height - MENU_MARGIN_FROM_BUTTON}px`;
  } else {
    dropdownMenuStyle.top = `${buttonRect.bottom + MENU_MARGIN_FROM_BUTTON}px`;
  }
  dropdownMenuStyle.left = `${buttonRect.right - menuRect.width * MENU_LEFT_DISPLACEMENT}px`;
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
  <div class="base-dropdown--absolute">
    <button
      class="base-dropdown--absolute__button"
      :class="{ 'button--active': showDropdown }"
      ref="dropdownButton"
      @click="toggleDropdown"
    >
      <slot name="button-content"></slot>
    </button>
    <div class="base-dropdown--absolute__menu" ref="dropdownMenu" v-if="showDropdown">
      <slot name="menu"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.base-dropdown--absolute {
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
