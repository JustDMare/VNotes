<script lang="ts">
/**
 * Dialog component used to rename a folder or note. The input is autofilled with the
 * current name of the item and then selected for ease of use. Uses the BaseInputDialog
 * component.
 *
 * @component RenameItemDialog
 * @see BaseInputDialog
 */
export default {
  name: "RenameItemDialog",
};
</script>

<script lang="ts" setup>
import { i18n } from "@/i18n/i18n.plugin";
import { useDialogEventStore, type RenameItemDialogEvent } from "@/stores/dialog-event";
import { useUserSpaceStore } from "@/stores/user-space";
import { ref, toRef, watchEffect, type Ref } from "vue";
import { ScaleTransition } from "../animations";
import BaseInputDialog from "../base/BaseInputDialog.vue";

const dialogEventStore = useDialogEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

/**
 * Ref to the event that opens the dialog.
 *
 * @type {Ref<RenameItemDialogEvent>}
 * @reactive
 */
const dialogEvent: Ref<RenameItemDialogEvent> = toRef(dialogEventStore, "renameItemDialogEvent");

/**
 * The type of the item that is being renamed.
 *
 * @type {Ref<string>}
 * @reactive
 */
const itemType: Ref<string> = ref("");

/**
 * WatchEffect that sets the `itemType` value when the dialog is opened based on whether
 * the renamed item is a folder or a note.
 *
 * @watch dialogEvent.isOpen
 */
watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    dialogEvent.value.type === "rename-folder"
      ? (itemType.value = t.value("itemType.folder"))
      : (itemType.value = t.value("itemType.note"));
  }
});

/**
 * Handles the `close` event emitted by the BaseInputDialog component, closing the dialog.
 *
 * @function closeDialog
 * @returns {void}
 * @listens close - The `close` event emitted by the BaseInputDialog component.
 */
function closeDialog(): void {
  dialogEventStore.closeRenameItemDialog();
}

/**
 * Handles the `pressed-main-button` event emitted by the BaseInputDialog component.
 *
 * Renames the folder/note with its name/title being the contents of the input box.
 * Finally, the dialog is closed.
 *
 * @function handlePressedMainButton
 * @returns {void}
 * @listens pressed-main-button - The `pressed-main-button` event emitted by the
 * BaseInputDialog component.
 */
function handlePressedMainButton(inputText: string): void {
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
      :initial-input-text="dialogEvent.renamedItemName!"
      @close="closeDialog"
      @pressed-main-button="handlePressedMainButton"
      :data-test="`rename-${itemType}-dialog`"
    ></BaseInputDialog>
  </ScaleTransition>
</template>

<style lang="scss" scoped></style>
