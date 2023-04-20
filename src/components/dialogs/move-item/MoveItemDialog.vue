<script lang="ts">
/**
 * Dialog component used to move an item (folder or note) to a different folder (in the
 * case of folders, it cannot be moved to a child folder) or to the Root folder.
 *
 * @component MoveItemDialog
 */
export default {
  name: "MoveItemDialog",
};
</script>

<script lang="ts" setup>
import { useEventStore, type MoveItemDialogEvent } from "@/stores/event";
import { ref, toRef, watchEffect, type Ref } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "../../base/BaseDialog.vue";
import MoveItemDialogTargetFolderList from "./MoveItemDialogTargetFolderList.vue";
import { useUserSpaceStore } from "@/stores/user-space";
import { ScaleTransition } from "@/components/animations";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

/**
 * Ref to the event that opens the dialog.
 *
 * @type {Ref<MoveItemDialogEvent>}
 * @reactive
 */
const dialogEvent: Ref<MoveItemDialogEvent> = toRef(eventStore, "moveItemDialogEvent");

/**
 * The `_id` of the folder that the item will be moved to.
 *
 * @type {Ref<string | null>}
 * @reactive
 */
const selectedNewParentFolderId: Ref<string | null> = ref(null);

/**
 * The type of the item that is being moved.
 *
 * @type {Ref<string>}
 * @reactive
 */
const itemType: Ref<string> = ref("");

/**
 * WatchEffect that sets the `itemType` value when the dialog is opened based on whether
 * the moved item is a folder or a note.
 *
 * @watchEffect {dialogEvent.isOpen}
 */
watchEffect(() => {
  if (!dialogEvent.value.isOpen) {
    return;
  }
  dialogEvent.value.type === "move-folder"
    ? (itemType.value = t.value("itemType.folder"))
    : (itemType.value = t.value("itemType.note"));
});

/**
 * Resets the value of `selectedNewParentFolderId` and calls the EventStore to close the
 * dialog.
 *
 * Serves as a handler for the `close` event emitted by the BaseDialog component.
 *
 * @function onDialogClose
 * @returns {void}
 */
function closeDialog(): void {
  selectedNewParentFolderId.value = null;
  eventStore.closeMoveItemDialog();
}

/**
 * Handles the `pressed-main-button` event emitted by the BaseDialog component.
 *
 * If the selected folder is the Root folder, the `selectedNewParentFolderId` is set to
 * `null`.
 *
 * Then, depending on the type of the item that is being moved, either the `moveFolder`
 * function or the `moveNote` function from the UserSpaceStore is called to set its new parent.
 *
 * Finally, the dialog is closed.
 *
 * @function handlePressedConfirmButton
 * @returns {void}
 */
function handlePressedConfirmButton(): void {
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

/**
 * Handles the `folder-selected` event emitted by the MoveItemDialogTargetFolderList
 * component.
 *
 * If the selected folder is the same as the one that is already selected, the
 * `selectedNewParentFolderId` is set to `null`.
 *
 * Otherwise, the `selectedNewParentFolderId` is set to the `_id` of the selected folder.
 *
 * @function handleFolderSelected
 * @param {string | null} folderId - The `_id` of the selected folder.
 * @returns {void}
 */
function handleFolderSelected(folderId: string | null): void {
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
