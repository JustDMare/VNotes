<script lang="ts" setup>
import { i18n } from "@/i18n/i18n.plugin";
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { ref, toRef, watchEffect, type Ref } from "vue";
import { ScaleTransition } from "../animations";
import BaseInputDialog from "../base/BaseInputDialog.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

const dialogEvent = toRef(eventStore, "createItemDialogEvent");
const itemType: Ref<string> = ref("");

watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    dialogEvent.value.type === "create-folder"
      ? (itemType.value = t.value("itemType.folder"))
      : (itemType.value = t.value("itemType.note"));
  }
});

function closeDialog() {
  eventStore.closeCreateItemDialog();
}

function handlePressedMainButton(inputText: string) {
  switch (dialogEvent.value.type) {
    case "create-folder":
      userSpaceStore.createFolder(inputText, dialogEvent.value.parentFolderId);
      break;
    case "create-note":
      userSpaceStore.createNote(inputText, dialogEvent.value.parentFolderId);
      break;
  }
  closeDialog();
}
</script>

<template>
  <ScaleTransition>
    <BaseInputDialog
      :is-open="dialogEvent.isOpen"
      :title="$t('createItemDialog.title', { itemType })"
      :placeholder-text="$t('createItemDialog.placeholderText', { itemType })"
      :main-button-text="$t('createItemDialog.mainButtonText', { itemType })"
      @close="closeDialog"
      @pressed-main-button="handlePressedMainButton"
    ></BaseInputDialog>
  </ScaleTransition>
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
