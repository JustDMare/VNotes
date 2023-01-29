<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { CrossIcon } from "../icons";

const props = defineProps({
  title: { type: String, required: true },
  mainButtonText: { type: String, required: true },
  open: { type: Boolean, required: true },
  isMainButtonDisabled: { type: Boolean, required: false, default: false },
});
const emits = defineEmits(["close", "pressed-main-button"]);

const baseDialog = ref<HTMLElement | null>(null);

function closeDialog(): void {
  emits("close");
}

function handleClickOutside(event: MouseEvent) {
  if (baseDialog.value && !baseDialog.value.contains(event.target as Node)) {
    closeDialog();
  }
}
function handleDialogKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    event.stopImmediatePropagation();
    closeDialog();
  }
  if (event.key === "Enter" && !props.isMainButtonDisabled) {
    event.preventDefault();
    event.stopImmediatePropagation();
    pressMainButton();
  }
}

watchEffect(() => {
  if (props.open) {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleDialogKeydown);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("keydown", handleDialogKeydown);
  }
});
function pressMainButton() {
  emits("pressed-main-button");
}
</script>

<template>
  <dialog :open="open" class="base-dialog" ref="baseDialog">
    <header class="base-dialog__header">
      <h1 class="base-dialog__header__title">{{ title }}</h1>
      <button @click="closeDialog" class="base-dialog__header__close-btn">
        <CrossIcon class="base-dialog__header__close-btn__icon" />
      </button>
    </header>
    <main class="base-dialog__body">
      <slot name="dialog-body"></slot>
    </main>
    <footer class="base-dialog__footer">
      <button @click="closeDialog" class="base-dialog__footer__cancel-btn">Cancel</button>
      <button
        :disabled="isMainButtonDisabled"
        @click="pressMainButton"
        class="base-dialog__footer__main-btn"
      >
        {{ mainButtonText }}
      </button>
    </footer>
  </dialog>
</template>

<style lang="scss" scoped>
.base-dialog {
  position: absolute;
  z-index: 5;
  align-self: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  min-width: 200px;
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
      font-size: 1.25rem;
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
}
</style>
