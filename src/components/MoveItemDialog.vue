<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { ref, toRef, watchEffect } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "./base/BaseDialog.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

const dialogTitle = ref("");
const dialogMainButtonText = ref("");
const dialogBodyText = ref("");

const dialogEvent = toRef(eventStore, "deleteItemDialogEvent");

watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    dialogTitle.value = "";
    dialogBodyText.value = "";
    dialogMainButtonText.value = "";
  } else {
    dialogTitle.value = "";
    dialogBodyText.value = "";
    dialogMainButtonText.value = "";
  }
});
function handlePressedConfirmButton() {
  switch (dialogEvent.value.type) {
    case "delete-folder":
      if (dialogEvent.value.deletedItemId) {
        userSpaceStore.deleteFolder(dialogEvent.value.deletedItemId);
      }
      break;
    case "delete-note":
      if (dialogEvent.value.deletedItemId) {
        userSpaceStore.deleteNote(dialogEvent.value.deletedItemId);
      }
      break;
  }
  closeDialog();
}

function closeDialog() {
  eventStore.closeDeleteItemDialog();
}
</script>

<template>
  <BaseDialog
    :open="dialogEvent.isOpen"
    v-show="dialogEvent.isOpen"
    :title="dialogTitle"
    :mainButtonText="dialogMainButtonText"
    @pressed-main-button="handlePressedConfirmButton"
    @close="closeDialog"
  >
    <template #dialog-body> </template>
  </BaseDialog>
</template>

<style lang="scss" scoped></style>
