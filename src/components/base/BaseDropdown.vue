<script lang="ts" setup>
import { nextTick, ref } from "vue";

const showDropdown = ref(false);
const dropdownMenu = ref<HTMLElement | null>(null);
const dropdownButton = ref<HTMLElement | null>(null);

const emit = defineEmits(["dropdownOpened", "dropdownClosed"]);
const props = defineProps({
  menuMarginFromButtonInPx: {
    type: Number,
    default: 0,
  },
  menuPercentageLeftAlignment: {
    type: Number,
    default: 1,
  },
  tooltip: {
    type: String,
    default: "",
  },
});

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
  console.log(buttonRect, menuRect);

  if (menuRect.height + buttonRect.bottom > window.innerHeight) {
    dropdownMenuStyle.top = `${
      buttonRect.top - menuRect.height - props.menuMarginFromButtonInPx
    }px`;
  } else {
    dropdownMenuStyle.top = `${buttonRect.bottom + props.menuMarginFromButtonInPx}px`;
  }
  //TODO: Document that this is done like this because if its done by using the
  //buttonRect.left, the menu will be slightly off the button and will overlap the sidebar
  //resizer for the SidebarUserDropdown. This way, by taking the button's rightmost
  //position (just out of the resizer) and then displacing the menu a percentage of its
  //width, the menu will be perfectly aligned and not overlap the resizer.
  dropdownMenuStyle.left = `${
    buttonRect.right - menuRect.width * props.menuPercentageLeftAlignment
  }px`;
  console.log(dropdownMenuStyle.top, dropdownMenuStyle.left);
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
    <button
      class="base-dropdown__button"
      :title="tooltip"
      :class="{ 'button--active': showDropdown }"
      ref="dropdownButton"
      @click="toggleDropdown"
    >
      <slot name="button-content"></slot>
    </button>
    <div class="base-dropdown__menu" ref="dropdownMenu" v-if="showDropdown">
      <slot name="menu" :closeOnClick="toggleDropdown"></slot>
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
