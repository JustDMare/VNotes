<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import type { CrossIcon } from "../icons";

const props = defineProps({
  title: { type: String, required: true },
  mainButtonText: { type: String, required: true },
  open: { type: Boolean, required: true },
});
const emits = defineEmits(["close"]);

const baseDialog = ref<HTMLElement | null>(null);

function closeDialog(): void {
  emits("close");
}

function handleClickOutside(event: MouseEvent) {
  if (baseDialog.value && !baseDialog.value.contains(event.target as Node)) {
    closeDialog();
  }
}

watchEffect(() => {
  if (props.open) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }
});
function pressMainButton() {
  console.log("pressed main button");
}
</script>

<template>
  <dialog
    :open="open"
    @keydown.enter.prevent="pressMainButton"
    @keydown.esc.prevent="closeDialog"
    class="base-dialog"
    ref="baseDialog"
  >
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
      <button @click="pressMainButton" class="base-dialog__footer__main-btn">
        {{ mainButtonText }}
      </button>
    </footer>
  </dialog>
</template>

<style lang="scss" scoped>
.base-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
