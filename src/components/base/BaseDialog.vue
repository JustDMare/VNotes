<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import { CrossIcon } from "../icons";

const props = defineProps({
  title: { type: String, required: true },
  mainButtonText: { type: String, required: true },
  open: { type: Boolean, required: true },
  isMainButtonDisabled: { type: Boolean, required: false, default: false },
  showFooter: { type: Boolean, required: false, default: true },
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
    <footer v-if="showFooter" class="base-dialog__footer">
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
