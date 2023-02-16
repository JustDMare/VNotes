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
    const itemType =
      dialogEvent.value.type === "delete-folder"
        ? t.value("itemType.folder")
        : t.value("itemType.note");

    dialogTitle.value = t.value("deleteItemDialog.title", { itemType });
    dialogMainButtonText.value = t.value("deleteItemDialog.mainButtonText");
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
    :isMainButtonDisabled="false"
    @pressed-main-button="handlePressedConfirmButton"
    @close="closeDialog"
  >
    <template #dialog-body>
      <p>
        <span>{{ $t("deleteItemDialog.bodyTextStart") }}</span>
        <span class="item-name">{{ dialogEvent.deletedItemName }}</span>
        <span>{{ $t("deleteItemDialog.bodyTextEnd") }}</span>
        <span v-if="dialogEvent.type === 'delete-folder'">
          <br />
          {{ $t("deleteItemDialog.bodyTextEndFolder") }}</span
        >
      </p>
    </template>
  </BaseDialog>
</template>

<style lang="scss" scoped>
:deep(.item-name) {
  font-weight: 600;
}
</style>
