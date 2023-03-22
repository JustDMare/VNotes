<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { ref, toRef, watchEffect, type Ref } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "../../base/BaseDialog.vue";
import MoveItemDialogTargetFolderList from "./MoveItemDialogTargetFolderList.vue";
import { useUserSpaceStore } from "@/stores/user-space";
import { ScaleTransition } from "@/components/animations";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();

const t = ref(i18n.global.t);
const dialogEvent = toRef(eventStore, "moveItemDialogEvent");

const selectedNewParentFolderId: Ref<string | null> = ref(null);
const itemType: Ref<string> = ref("");

watchEffect(() => {
  if (!dialogEvent.value.isOpen) {
    return;
  }
  dialogEvent.value.type === "move-folder"
    ? (itemType.value = t.value("itemType.folder"))
    : (itemType.value = t.value("itemType.note"));
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
  <ScaleTransition>
    <BaseDialog
      :open="dialogEvent.isOpen"
      v-show="dialogEvent.isOpen"
      :title="$t('moveItemDialog.title', { itemType })"
      :mainButtonText="$t('moveItemDialog.mainButtonText')"
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
  </ScaleTransition>
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
