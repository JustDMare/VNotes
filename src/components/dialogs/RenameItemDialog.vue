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

const dialogEvent = toRef(eventStore, "renameItemDialogEvent");
const itemType: Ref<string> = ref("");

watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    dialogEvent.value.type === "rename-folder"
      ? (itemType.value = t.value("itemType.folder"))
      : (itemType.value = t.value("itemType.note"));
  }
});

function closeDialog() {
  eventStore.closeRenameItemDialog();
}

function handlePressedMainButton(inputText: string) {
  switch (dialogEvent.value.type) {
    case "rename-folder":
      if (dialogEvent.value.renamedItemId) {
        userSpaceStore.renameFolder(dialogEvent.value.renamedItemId, inputText);
      }
      break;
    case "rename-note":
      if (dialogEvent.value.renamedItemId) {
        userSpaceStore.renameNote(dialogEvent.value.renamedItemId, inputText);
      }
      break;
  }
  closeDialog();
}
</script>

<template>
  <ScaleTransition>
    <BaseInputDialog
      :is-open="dialogEvent.isOpen"
      :title="$t('renameItemDialog.title', { itemType })"
      :placeholder-text="$t('renameItemDialog.placeholderText', { itemType })"
      :main-button-text="$t('renameItemDialog.mainButtonText', { itemType })"
      @close="closeDialog"
      @pressed-main-button="handlePressedMainButton"
    ></BaseInputDialog>
  </ScaleTransition>
</template>

<style lang="scss" scoped></style>
