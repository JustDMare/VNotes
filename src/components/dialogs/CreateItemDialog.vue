<script lang="ts">
/**
 * Dialog component used to create a new folder or note in the folder from which this
 * dialog was opened. Uses the BaseInputDialog component.
 *
 * @component CreateItemDialog
 * @see BaseInputDialog
 */
export default {
  name: "CreateItemDialog",
};
</script>

<script lang="ts" setup>
import { i18n } from "@/i18n/i18n.plugin";
import { useEventStore, type CreateItemDialogEvent } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { ref, toRef, watchEffect, type Ref } from "vue";
import { ScaleTransition } from "../animations";
import BaseInputDialog from "../base/BaseInputDialog.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

/**
 * Ref to the event that opens the dialog.
 *
 * @type {Ref<CreateItemDialogEvent>}
 * @reactive
 */
const dialogEvent: Ref<CreateItemDialogEvent> = toRef(eventStore, "createItemDialogEvent");

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
 * @watch dialogEvent.isOpen
 */
watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    dialogEvent.value.type === "create-folder"
      ? (itemType.value = t.value("itemType.folder"))
      : (itemType.value = t.value("itemType.note"));
  }
});

/**
 * Handles the `close` event emitted by the BaseDialog component.
 *
 * @function onDialogClose
 * @returns {void}
 * @listens close - The `close` event emitted by the BaseDialog component.
 */
function closeDialog(): void {
  eventStore.closeCreateItemDialog();
}

/**
 * Handles the `pressed-main-button` event emitted by the BaseDialog component.
 *
 * Creates the folder/note with its name/title being the contents of the input box.
 * Finally, the dialog is closed.
 *
 * @function handlePressedMainButton
 * @returns {void}
 * @listens pressed-main-button - The `pressed-main-button` event emitted by the
 * BaseInputDialog component.
 */
function handlePressedMainButton(inputText: string): void {
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

<style lang="scss" scoped></style>
