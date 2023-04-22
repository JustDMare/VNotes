<script lang="ts">
/**
 * Dialog that serves as a confirmation for deleting an item (folder or note).
 * Uses the BaseDialog component.
 *
 * @component DeleteItemDialog
 * @see BaseDialog
 */
export default {
  name: "DeleteItemDialog",
};
</script>

<script lang="ts" setup>
import { useEventStore, type DeleteItemDialogEvent } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { ref, toRef, watchEffect, type Ref } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "../base/BaseDialog.vue";
import { ScaleTransition } from "../animations";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

/**
 * Ref to the event that opens the dialog.
 *
 * @type {Ref<DeleteItemDialogEvent>}
 * @reactive
 */
const dialogEvent: Ref<DeleteItemDialogEvent> = toRef(eventStore, "deleteItemDialogEvent");

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
  if (!dialogEvent.value.isOpen) {
    return;
  }
  dialogEvent.value.type === "delete-folder"
    ? (itemType.value = t.value("itemType.folder"))
    : (itemType.value = t.value("itemType.note"));
});

/**
 * Handles the `pressed-main-button` event emitted by the BaseDialog component.
 *
 * Deletes the item from the user space store and closes the dialog.
 *
 * @function handlePressedMainButton
 * @returns {void}
 * @listens pressed-main-button - The `pressed-main-button` event emitted by the
 * BaseDialog component.
 */
function handlePressedMainButton(): void {
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

/**
 * Handles the `close` event emitted by the BaseDialog component.
 *
 * @function closeDialog
 * @returns {void}
 * @listens close - The `close` event emitted by the BaseDialog component.
 */
function closeDialog(): void {
  eventStore.closeDeleteItemDialog();
}
</script>

<template>
  <ScaleTransition>
    <BaseDialog
      :open="dialogEvent.isOpen"
      v-show="dialogEvent.isOpen"
      :title="$t('deleteItemDialog.title', { itemType })"
      :mainButtonText="$t('deleteItemDialog.mainButtonText')"
      @pressed-main-button="handlePressedMainButton"
      @close="closeDialog"
    >
      <template #dialog-body>
        <p>
          <span>{{ $t("deleteItemDialog.bodyTextStart") }}</span>
          <span class="item-name">"{{ dialogEvent.deletedItemName }}"</span>
          <span>{{ $t("deleteItemDialog.bodyTextEnd") }}</span>
          <span v-if="dialogEvent.type === 'delete-folder'">
            <br />
            {{ $t("deleteItemDialog.bodyTextEndFolder") }}</span
          >
        </p>
      </template>
    </BaseDialog>
  </ScaleTransition>
</template>

<style lang="scss" scoped>
:deep(.item-name) {
  font-weight: 600;
}
</style>
