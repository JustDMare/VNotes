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

const dialogEventParams = computed(() => eventStore.nameFolderOrNoteDialog);
const isInputEmpty = computed(() => inputText.value.trim() === "");

watchEffect(() => {
  if (eventStore.nameFolderOrNoteDialog.isOpen) {
    isDialogOpen.value = true;
    nextTick(() => inputBox.value?.focus());
  } else {
    isDialogOpen.value = false;
  }
});

function closeDialog() {
  console.log("closeDialog");
  eventStore.closeNameFolderOrNoteDialog();
  inputText.value = "";
}

function handlePressedMainButton() {
  if (dialogEventParams.value.type === "folder" && !isInputEmpty.value) {
    userSpaceStore.createFolder(inputText.value, null);
  } else if (dialogEventParams.value.type === "note" && !isInputEmpty.value) {
    userSpaceStore.createNote(inputText.value, null);
  }
  closeDialog();
}
</script>

<template>
  <BaseDialog
    :open="isDialogOpen"
    :title="dialogEventParams.title"
    :main-button-text="dialogEventParams.title"
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
          :placeholder="dialogEventParams.title"
          type="text"
          ref="inputBox"
        />
      </label>
    </template>
  </BaseDialog>
</template>

<style lang="scss" scoped></style>
