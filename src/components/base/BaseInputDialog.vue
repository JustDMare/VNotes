<script lang="ts">
/**
 * Base input dialog component with default styling and functionality. Built on top of the
 * BaseDialog component to offer a generic input dialog with a text input box.
 *
 * @component BaseInputDialog
 */
export default {
  name: "BaseInputDialog",
};
</script>
<script lang="ts" setup>
import { computed, nextTick, ref, watchEffect, type Ref, type ComputedRef } from "vue";
import BaseDialog from "../base/BaseDialog.vue";

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
  mainButtonText: { type: String, required: true },
  /**
   * Whether the dialog is open or not.
   *
   * @type {Boolean}
   * @required
   */
  isOpen: { type: Boolean, required: true },
  /**
   * The text of the placeholder of the input box.
   *
   * @type {String}
   * @required
   */
  placeholderText: { type: String, required: true },
  /**
   * The text to be shown in the input box when the dialog is opened.
   *
   * @type {String}
   * @default ""
   */
  initialInputText: { type: String, required: false, default: "" },
});

/**
 * The ref of the input box.
 *
 * @type {Ref<HTMLInputElement | null>}
 */
const inputBox: Ref<HTMLInputElement | null> = ref(null);
/**
 * The text of the input box.
 *
 * @type {Ref<string>}
 * @reactive
 */
const inputText: Ref<string> = ref("");

const emit = defineEmits<{
  /**
   * Emitted when the dialog is closed.
   *
   * @event close
   */
  (e: "close"): void;
  /**
   * Emitted when the main button is pressed.
   *
   * @event pressed-main-button
   * @param {string} inputText - The text of the input box at the moment this event is emitted.
   */
  (e: "pressed-main-button", inputText: string): void;
}>();

/**
 * Computed property that returns whether the input box is empty or not post trimming.
 * This is used to disable the main button when the input box is empty.
 *
 * @type {ComputedRef<boolean>}
 * @computed
 */
const isInputEmpty: ComputedRef<boolean> = computed(() => inputText.value.trim() === "");

/**
 * WatchEffect that focuses the input box when the dialog is opened. If
 * `initialInputText` is not empty, it fills the input box with its value and
 * then selects the text. When the dialog is closed, it resets the input box to an empty state.
 *
 * @watchEffect {props.isOpen}
 */
watchEffect(() => {
  if (props.isOpen) {
    if (!props.initialInputText) {
      nextTick(() => inputBox.value?.focus());
    } else {
      inputText.value = props.initialInputText;
      nextTick(() => inputBox.value?.select());
    }
  } else {
    inputText.value = "";
  }
});

/**
 * Emits the close event.
 *
 * @function closeDialog
 * @returns {void}
 * @listens close - The close event emitted by the BaseDialog component.
 * @emits close
 */
function closeDialog(): void {
  emit("close");
}

/**
 * Emits the pressed-main-button event if the input box is not empty.
 *
 * @function handlePressedMainButton
 * @returns {void}
 * @listens pressed-main-button - The pressed-main-button event emitted by the BaseDialog component.
 * @emits pressed-main-button
 */
function handlePressedMainButton(): void {
  if (isInputEmpty.value) {
    return;
  }
  emit("pressed-main-button", inputText.value);
}
</script>

<template>
  <BaseDialog
    :open="isOpen"
    :title="title"
    :main-button-text="mainButtonText"
    @close="closeDialog"
    @pressed-main-button="handlePressedMainButton"
    :is-main-button-disabled="isInputEmpty"
    v-show="isOpen"
  >
    <template #dialog-body>
      <label for="nameFolderOrNoteInput">
        <input
          v-model="inputText"
          id="nameFolderOrNoteInput"
          :placeholder="placeholderText"
          type="text"
          ref="inputBox"
          autocomplete="off"
          class="dialog__input"
        />
      </label>
    </template>
  </BaseDialog>
</template>

<style lang="scss" scoped>
.dialog__input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-base-70);
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: none;
  }
}
</style>
