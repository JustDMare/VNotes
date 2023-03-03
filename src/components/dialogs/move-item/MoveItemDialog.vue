<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { ref, toRef, watchEffect, type Ref } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "../../base/BaseDialog.vue";
import MoveItemDialogTargetFolderList from "./MoveItemDialogTargetFolderList.vue";
import { useUserSpaceStore } from "@/stores/user-space";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();

const t = ref(i18n.global.t);

const dialogTitle = ref("");
const dialogMainButtonText = ref("");
const selectedNewParentFolderId: Ref<string | null> = ref(null);

const dialogEvent = toRef(eventStore, "moveItemDialogEvent");

watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    const itemType =
      dialogEvent.value.type === "move-folder"
        ? t.value("itemType.folder")
        : t.value("itemType.note");
    dialogTitle.value = t.value("moveItemDialog.title", { itemType });
    dialogMainButtonText.value = t.value("moveItemDialog.mainButtonText");
  } else {
    dialogTitle.value = "";
    dialogMainButtonText.value = "";
  }
});
function handlePressedConfirmButton() {
  if (selectedNewParentFolderId.value === userSpaceStore.userSpace._id) {
    selectedNewParentFolderId.value = null;
  }
  switch (dialogEvent.value.type) {
    case "move-folder":
      if (dialogEvent.value.movedItemId) {
        userSpaceStore.moveFolder(dialogEvent.value.movedItemId, selectedNewParentFolderId.value);
      }
      break;
    case "move-note":
      if (dialogEvent.value.movedItemId) {
        userSpaceStore.moveNote(dialogEvent.value.movedItemId, selectedNewParentFolderId.value);
      }
      break;
  }
  closeDialog();
}

function closeDialog() {
  selectedNewParentFolderId.value = null;
  eventStore.closeMoveItemDialog();
}
function handleFolderSelected(folderId: string | null) {
  if (folderId === selectedNewParentFolderId.value) {
    selectedNewParentFolderId.value = null;
    return;
  }
  selectedNewParentFolderId.value = folderId;
}
</script>

<template>
  <BaseDialog
    :open="dialogEvent.isOpen"
    v-show="dialogEvent.isOpen"
    :title="dialogTitle"
    :mainButtonText="dialogMainButtonText"
    :is-main-button-disabled="selectedNewParentFolderId === null"
    @pressed-main-button="handlePressedConfirmButton"
    @close="closeDialog"
    class="move-item-dialog"
  >
    <template #dialog-body>
      <p>
        <span>{{ $t("moveItemDialog.bodyTextStart") }}</span>
        <span class="item-name">"{{ dialogEvent.movedItemName }}"</span>
        <span>{{ $t("moveItemDialog.bodyTextEnd") }}</span>
      </p>
      <MoveItemDialogTargetFolderList
        :selected-new-parent-folder-id="selectedNewParentFolderId"
        @folder-selected="handleFolderSelected"
      />
    </template>
  </BaseDialog>
</template>

<style lang="scss" scoped>
.move-item-dialog {
  height: 80%;
}
:deep(.base-dialog__body) {
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}
:deep(.base-dialog__body) {
  gap: 0.5rem;
}
:deep(.item-name) {
  font-weight: 600;
}
</style>
