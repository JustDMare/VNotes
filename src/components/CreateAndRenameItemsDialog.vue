<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { computed, nextTick, ref, watchEffect } from "vue";
import BaseDialog from "./base/BaseDialog.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();

const inputBox = ref<HTMLInputElement | null>(null);
const isDialogOpen = ref(false);
const inputText = ref("");
const dialogTitle = ref("");
const dialogMainButtonText = ref("");
const dialogInputPlaceholder = ref("");

const dialogEventParams = computed(() => eventStore.createAndRenameItemDialogEvent);
const isInputEmpty = computed(() => inputText.value.trim() === "");

watchEffect(() => {
  if (dialogEventParams.value.isOpen) {
    isDialogOpen.value = true;
    dialogTitle.value = "";
    dialogMainButtonText.value = "";
    dialogInputPlaceholder.value = "";

    nextTick(() => inputBox.value?.focus());
  } else {
    isDialogOpen.value = false;
    dialogTitle.value = "";
    dialogMainButtonText.value = "";
    dialogInputPlaceholder.value = "";
  }
});

function closeDialog() {
  console.log("closeDialog");
  eventStore.closeCreateAndRenameItemDialog();
  inputText.value = "";
}

function handlePressedMainButton() {
  if (!isInputEmpty.value) {
    return;
  }
  if (dialogEventParams.value.type === "create-folder") {
    userSpaceStore.createFolder(inputText.value, dialogEventParams.value.parentFolderId);
  } else if (dialogEventParams.value.type === "create-note") {
    userSpaceStore.createNote(inputText.value, dialogEventParams.value.parentFolderId);
  }
  //  else if (dialogEventParams.value.type === "rename-folder") {
  //   userSpaceStore.renameFolder(dialogEventParams.value.folderId, inputText.value);
  // } else if (dialogEventParams.value.type === "rename-note") {
  //   userSpaceStore.renameNote(dialogEventParams.value.noteId, inputText.value);
  // }
  closeDialog();
}
</script>

<template>
  <BaseDialog
    :open="isDialogOpen"
    :title="dialogTitle"
    :main-button-text="dialogMainButtonText"
    @close="closeDialog"
    @pressed-main-button="handlePressedMainButton"
    :is-main-button-disabled="isInputEmpty"
    v-show="isDialogOpen"
  >
    <template #dialog-body>
      <label for="nameFolderOrNoteInput">
        <input
          v-model="inputText"
          id="nameFolderOrNoteInput"
          :placeholder="dialogInputPlaceholder"
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
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: none;
  }
}
</style>
