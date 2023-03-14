<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { computed, nextTick, ref, toRef, watchEffect } from "vue";
import BaseDialog from "../base/BaseDialog.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();

const inputBox = ref<HTMLInputElement | null>(null);
const inputText = ref("");

const dialogEvent = toRef(eventStore, "createAndRenameItemDialogEvent");
const isInputEmpty = computed(() => inputText.value.trim() === "");

watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    nextTick(() => inputBox.value?.focus());
  }
});

function closeDialog() {
  eventStore.closeCreateAndRenameItemDialog();
  inputText.value = "";
}

function handlePressedMainButton() {
  if (isInputEmpty.value) {
    return;
  }
  switch (dialogEvent.value.type) {
    case "create-folder":
      userSpaceStore.createFolder(inputText.value, dialogEvent.value.parentFolderId);
      break;
    case "create-note":
      userSpaceStore.createNote(inputText.value, dialogEvent.value.parentFolderId);
      break;
    case "rename-folder":
      if (dialogEvent.value.renamedItemId) {
        userSpaceStore.renameFolder(dialogEvent.value.renamedItemId, inputText.value);
      }
      break;
    case "rename-note":
      if (dialogEvent.value.renamedItemId) {
        userSpaceStore.renameNote(dialogEvent.value.renamedItemId, inputText.value);
      }
      break;
  }
  closeDialog();
}
</script>

<template>
  <BaseDialog
    :open="dialogEvent.isOpen"
    :title="$t(`createAndRenameItemDialog.${dialogEvent.type}.title`)"
    :main-button-text="$t(`createAndRenameItemDialog.${dialogEvent.type}.mainButtonText`)"
    @close="closeDialog"
    @pressed-main-button="handlePressedMainButton"
    :is-main-button-disabled="isInputEmpty"
    v-show="dialogEvent.isOpen"
  >
    <template #dialog-body>
      <label for="nameFolderOrNoteInput">
        <input
          v-model="inputText"
          id="nameFolderOrNoteInput"
          :placeholder="$t(`createAndRenameItemDialog.${dialogEvent.type}.inputPlaceholder`)"
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
