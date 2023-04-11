<script lang="ts" setup>
import { computed, nextTick, ref, watchEffect } from "vue";
import BaseDialog from "../base/BaseDialog.vue";

const props = defineProps({
  title: { type: String, required: true },
  mainButtonText: { type: String, required: true },
  isOpen: { type: Boolean, required: true },
  placeholderText: { type: String, required: true },
});
const emit = defineEmits<{
  (e: "close"): void;
  (e: "pressed-main-button", inputText: string): void;
}>();

const inputBox = ref<HTMLInputElement | null>(null);
const inputText = ref("");

const isInputEmpty = computed(() => inputText.value.trim() === "");

watchEffect(() => {
  if (props.isOpen) {
    nextTick(() => inputBox.value?.focus());
  } else {
    inputText.value = "";
  }
});

function closeDialog(): void {
  emit("close");
}
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
