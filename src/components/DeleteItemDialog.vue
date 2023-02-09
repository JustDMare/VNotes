<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { ref, toRef, watchEffect } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "./base/BaseDialog.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

const dialogEvent = toRef(eventStore, "deleteItemDialogEvent");

watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    console.log(dialogEvent.value);
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
}

function closeDialog() {
  eventStore.closeDeleteItemDialog();
}
</script>

<template>
  <BaseDialog
    :open="dialogEvent.isOpen"
    v-show="dialogEvent.isOpen"
    title="Delete folder"
    mainButtonText="Delete"
    :isMainButtonDisabled="false"
    @pressed-main-button="handlePressedConfirmButton"
    @close="closeDialog"
  >
    <template #dialog-body>
      <p class="delete-item-dialog__body__text">Do you want to delete this?</p>
    </template>
  </BaseDialog>
</template>

<style lang="scss" scoped></style>
