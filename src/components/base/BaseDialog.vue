<script lang="ts">
/**
 * Base dialog component with default styling and functionality. Contains a slot for the
 * dialog's body to allow any component implementing it to add its own content.
 *
 * @component BaseDialog
 */
export default {
  name: "BaseDialog",
};
</script>

<script lang="ts" setup>
import { watchEffect, type Ref, ref } from "vue";
import { CrossIcon } from "../icons";

const props = defineProps({
  /**
   * The title of the dialog.
   *
   * @type {String}
   * @required
   */
  title: { type: String, required: true },
  /**
   * The text of the main button.
   *
   * @type {String}
   * @default ""
   */
  mainButtonText: { type: String, required: false, default: "" },
  /**
   * Whether the dialog is open or not.
   *
   * @type {Boolean}
   * @required
   */
  open: { type: Boolean, required: true },
  /**
   * Whether the main button is disabled or not.
   *
   * @type {Boolean}
   * @default false
   */
  isMainButtonDisabled: { type: Boolean, required: false, default: false },
  /**
   * Whether the footer is shown or not.
   *
   * @type {Boolean}
   * @default true
   */
  showFooter: { type: Boolean, required: false, default: true },
});

/**
 * The ref of the base dialog.
 * @type {Ref<HTMLElement | null>}
 */
const baseDialog: Ref<HTMLElement | null> = ref(null);

const emits = defineEmits<{
  /**
   * Emitted when the dialog is closed.
   * @event close
   */
  (e: "close"): void;
  /**
   * Emitted when the main button is pressed.
   * @event pressed-main-button
   */
  (e: "pressed-main-button"): void;
}>();

/**
 * Emits the close event.
 *
 * @function closeDialog
 * @returns {void}
 * @listens click - The close button.
 * @emits close
 */
function closeDialog(): void {
  emits("close");
}

/**
 * Handles the `click` event on the main button, emitting the `pressed-main-button` event.
 *
 * @function pressMainButton
 * @returns {void}
 * @listens click - The main button.
 * @emits pressed-main-button
 */
function pressMainButton(): void {
  emits("pressed-main-button");
}

/**
 * Handles the `mousedown` event, so that if the `baseDialog` element is not the target of
 * the event, the `closeDialog` function is called.
 *
 * @function handleClickOutside
 * @param {MouseEvent} event - The mouse event.
 * @returns {void}
 * @listens mousedown
 */
function handleClickOutside(event: MouseEvent): void {
  if (baseDialog.value && !baseDialog.value.contains(event.target as Node)) {
    closeDialog();
  }
}

/**
 * Handles the `keydown` events for `Escape` and `Enter`. If the `Escape` key is pressed,
 * the `closeDialog` function is called. If the `Enter` key is pressed and the main button
 * is not disabled, the `pressMainButton` function is called.
 *
 * @function handleDialogKeydown
 * @param {KeyboardEvent} event - The keyboard event.
 * @returns {void}
 * @listens keydown.Escape - The `Escape` key.
 * @listens keydown.Enter - The `Enter` key.
 *
 */
function handleDialogKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopImmediatePropagation();
    closeDialog();
  }
  if (event.key === "Enter" && !props.isMainButtonDisabled && props.showFooter) {
    event.preventDefault();
    event.stopImmediatePropagation();
    pressMainButton();
  }
}

/**
 * WatchEffect that adds the event handlers `handleClickOutside` and `handleDialogKeydown`
 * for the `mousedown` and `keydown` events respectively if the `props.open` is `true`.
 * Otherwise, it removes those event handlers.
 *
 * @watch props.open
 * @returns {void}
 */
watchEffect(() => {
  if (props.open) {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleDialogKeydown);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleDialogKeydown);
  }
});
</script>

<template>
  <dialog :open="open" class="base-dialog" ref="baseDialog">
    <header class="base-dialog__header">
      <h1 class="base-dialog__header__title">{{ title }}</h1>
      <button
        @click="closeDialog"
        class="base-dialog__header__close-btn"
        data-test="base-dialog-close-button"
      >
        <CrossIcon class="base-dialog__header__close-btn__icon" />
      </button>
    </header>
    <main class="base-dialog__body">
      <slot name="dialog-body"></slot>
    </main>
    <footer v-if="showFooter" class="base-dialog__footer">
      <button
        :disabled="isMainButtonDisabled"
        @click="pressMainButton"
        class="base-dialog__footer__main-btn"
        data-test="base-dialog-main-button"
      >
        {{ mainButtonText }}
      </button>
    </footer>
  </dialog>
</template>

<style lang="scss" scoped>
.base-dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  align-self: center;
  margin: auto;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  row-gap: 1rem;
  width: 50%;
  max-width: 500px;
  min-width: 350px;
  padding: 8px 8px;
  background-color: var(--color-base-100);
  border-radius: 4px;
  border: 1px solid var(--color-base-80);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
    border-bottom: 1px solid var(--color-base-80);
    &__title {
      font-size: 1.125rem;
      font-weight: 500;
    }
    &__close-btn {
      background-color: transparent;
      border: none;
      cursor: pointer;
      &__icon {
        width: 1.5rem;
        height: 1.5rem;
      }
    }
  }
  &__body {
    padding: 6px;
    display: flex;
    flex-direction: column;
  }
  &__footer {
    display: flex;
    justify-content: center;
    padding: 6px;
    &__main-btn {
      width: 100%;
      //Below could be turned into a btn--primary class
      justify-content: center;
      display: flex;
      align-items: center;
      background: var(--color-base-100);
      color: var(--color-text);
      border: 1px solid var(--color-base-80);
      border-radius: 4px;
      gap: 6px;
      padding: 6px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        background: var(--color-base-80);
        color: var(--x=color-base-0);
      }
      &:active {
        transform: scale(0.95);
      }
      &:disabled {
        background-color: var(--color-base-70);
        color: var(--color-base-90);
        cursor: not-allowed;
      }
    }
  }
}
</style>
