<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { computed, nextTick, ref, watchEffect } from "vue";
import BaseDialog from "./base/BaseDialog.vue";
import { i18n } from "@/i18n/i18n.plugin";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

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
    dialogTitle.value = t.value(`createAndRenameItemDialog.${dialogEventParams.value.type}.title`);
    dialogMainButtonText.value = t.value(
      `createAndRenameItemDialog.${dialogEventParams.value.type}.mainButtonText`
    );
    dialogInputPlaceholder.value = t.value(
      `createAndRenameItemDialog.${dialogEventParams.value.type}.inputPlaceholder`
    );

    nextTick(() => inputBox.value?.focus());
  } else {
    isDialogOpen.value = false;
    dialogTitle.value = "";
    dialogMainButtonText.value = "";
    dialogInputPlaceholder.value = "";
  }
});

function closeDialog() {
  eventStore.closeCreateAndRenameItemDialog();
  inputText.value = "";
}
//TODO: Add title to the buttons and input and translations for the userDropdown
//TODO: Check stylings
// Add the possibility to rename folders and notes
//Add the possibility to create folders and notes under a note

function handlePressedMainButton() {
  if (isInputEmpty.value) {
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
