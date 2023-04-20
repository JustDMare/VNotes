<script lang="ts">
/**
 * Base dropdown component with default styling and functionality. Contains a slot for the
 * dropdown's button and another one for the dropdown's menu to allow any component implementing
 * it to add its own content.
 *
 * @component BaseDropdown
 */
export default {
  name: "BaseDropdown",
};
</script>

<script lang="ts" setup>
import { nextTick, ref, type Ref } from "vue";

const props = defineProps({
  /**
   * The margin between the dropdown menu and the button in pixels.
   *
   * @property menuMarginFromButtonInPx
   * @type {Number}
   * @default 0
   */
  menuMarginFromButtonInPx: {
    type: Number,
    default: 0,
  },

  /**
   * The fraction of the dropdown menu's width that will be used to align it with respect to the
   * left side of the button, where 1 means that the menu will be aligned to the leftmost side of
   * the button and 0 means that the menu will be aligned to the rightmost side of the button.
   *
   * @type {Number}
   * @default 1
   */
  menuPercentageLeftAlignment: {
    type: Number,
    default: 1,
  },

  /**
   * The tooltip to be shown when hovering over the dropdown button.
   *
   * @type {String}
   * @default ""
   */
  tooltip: {
    type: String,
    default: "",
  },
});

/**
 * Whether the dropdown is open or not.
 *
 * @type {Ref<Boolean>}
 * @default false
 * @reactive
 */
const showDropdown: Ref<boolean> = ref(false);

/**
 * The ref of the dropdown menu.
 *
 * @type {Ref<HTMLElement | null>}
 */
const dropdownMenu: Ref<HTMLElement | null> = ref(null);

/**
 * The ref of the dropdown button.
 *
 * @type {Ref<HTMLElement | null>}
 */
const dropdownButton: Ref<HTMLElement | null> = ref(null);

const emit = defineEmits<{
  /**
   * Emitted when the dropdown is opened.
   *
   * @event dropdownOpened
   */
  (e: "dropdownOpened"): void;

  /**
   * Emitted when the dropdown is closed.
   *
   * @event dropdownClosed
   */
  (e: "dropdownClosed"): void;
}>();

/**
 * Toggles the dropdown's visibility. When the dropdown is opened, it calls the
 * `calculateDropdownPosition` to calculate its position. Then adds the `handleClickOutside`
 * listener to the `mousedown` event.
 *
 * @function toggleDropdown
 * @returns {void}
 * @emits dropdownOpened
 * @emits dropdownClosed
 *
 * @see calculateDropdownPosition
 */
function toggleDropdown(): void {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    nextTick(() => {
      calculateDropdownPosition();
      document.addEventListener("mousedown", handleClickOutside);
    });
    emit("dropdownOpened");
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
    emit("dropdownClosed");
  }
}

/**
 * Calculates the dropdown menu's position with respect to the button, using the
 * `menuMarginFromButtonInPx` prop to set the margin between the menu and the button.
 * Also, if the menu would overflow the window's height, it will be positioned above the
 * button instead. Then it uses the `menuPercentageLeftAlignment` prop to set the
 * alignment of the menu with respect to its left side.
 *
 *
 * @function calculateDropdownPosition
 * @description
 * @returns {void}
 * @see menuPercentageLeftAlignment
 * @remarks
 * The left alignment is done by subtracting the width of the menu multiplied by the
 * `menuPercentageLeftAlignment` (thus 1 = leftmost position, 0 = rightmost position) prop from
 * the button's right side coordinates.
 */
function calculateDropdownPosition(): void {
  if (!dropdownButton.value || !dropdownMenu.value) {
    return;
  }
  const buttonRect = dropdownButton.value.getBoundingClientRect();
  const menuRect = dropdownMenu.value.getBoundingClientRect();
  const dropdownMenuStyle = dropdownMenu.value.style;

  if (menuRect.height + buttonRect.bottom > window.innerHeight) {
    dropdownMenuStyle.top = `${
      buttonRect.top - menuRect.height - props.menuMarginFromButtonInPx
    }px`;
  } else {
    dropdownMenuStyle.top = `${buttonRect.bottom + props.menuMarginFromButtonInPx}px`;
  }
  dropdownMenuStyle.left = `${
    buttonRect.right - menuRect.width * props.menuPercentageLeftAlignment
  }px`;
}

/**
 * Handles the `mousedown` event, so that if the `dropdownMenu` element is not the target of
 * the event, the `closeDialog` function is called.
 *
 * @function handleClickOutside
 * @param {MouseEvent} event - The event object.
 * @returns {void}
 * @see closeDialog
 */
function handleClickOutside(event: MouseEvent): void {
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
