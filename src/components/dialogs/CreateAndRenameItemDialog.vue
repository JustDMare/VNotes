<script lang="ts" setup>
import { i18n } from "@/i18n/i18n.plugin";
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { computed, nextTick, ref, toRef, watchEffect, type Ref } from "vue";
import { ScaleTransition } from "../animations";
import BaseDialog from "../base/BaseDialog.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

const inputBox = ref<HTMLInputElement | null>(null);
const inputText = ref("");

const dialogEvent = toRef(eventStore, "createAndRenameItemDialogEvent");
const dialogEventType = toRef(dialogEvent.value, "type");
const isInputEmpty = computed(() => inputText.value.trim() === "");
const itemType: Ref<string> = ref("");
const actionType: Ref<"rename" | "create" | null> = ref(null);

watchEffect(() => {
  if (dialogEvent.value.isOpen) {
    nextTick(() => inputBox.value?.focus());
    dialogEventType.value === "create-folder" || dialogEventType.value === "rename-folder"
      ? (itemType.value = t.value("itemType.folder"))
      : (itemType.value = t.value("itemType.note"));
  }
  if (dialogEventType.value === "rename-folder" || dialogEventType.value === "rename-note") {
    actionType.value = "rename";
  } else if (dialogEventType.value === "create-folder" || dialogEventType.value === "create-note") {
    actionType.value = "create";
  }
});

function closeDialog() {
  eventStore.closeCreateAndRenameItemDialog();
  inputText.value = "";
}

function handlePressedMainButton() {
  if (isInputEmpty.value) {
    return;
  }
  switch (dialogEventType.value) {
    case "create-folder":
      userSpaceStore.createFolder(inputText.value, dialogEvent.value.parentFolderId);
      break;
    case "create-note":
      userSpaceStore.createNote(inputText.value, dialogEvent.value.parentFolderId);
      break;
    case "rename-folder":
      if (dialogEvent.value.renamedItemId) {
        userSpaceStore.renameFolder(dialogEvent.value.renamedItemId, inputText.value);
      }
      break;
    case "rename-note":
      if (dialogEvent.value.renamedItemId) {
        userSpaceStore.renameNote(dialogEvent.value.renamedItemId, inputText.value);
      }
      break;
  }
  closeDialog();
}
</script>

<template>
  <ScaleTransition>
    <BaseDialog
      :open="dialogEvent.isOpen"
      :title="$t(`createAndRenameItemDialog.${actionType}.title`, { itemType })"
      :main-button-text="$t(`createAndRenameItemDialog.${actionType}.mainButtonText`, { itemType })"
      @close="closeDialog"
      @pressed-main-button="handlePressedMainButton"
      :is-main-button-disabled="isInputEmpty"
      v-show="dialogEvent.isOpen"
    >
      <template #dialog-body>
        <label for="nameFolderOrNoteInput">
          <input
            v-model="inputText"
            id="nameFolderOrNoteInput"
            :placeholder="
              $t(`createAndRenameItemDialog.${actionType}.inputPlaceholder`, { itemType })
            "
            type="text"
            ref="inputBox"
            autocomplete="off"
            class="dialog__input"
          />
        </label>
      </template>
    </BaseDialog>
  </ScaleTransition>
</template>

<style lang="scss" scoped>
.dialog__input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-base-70);
  border-radius: 4px;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: none;
  }
}
</style>
