<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { ref, toRef, watchEffect, type Ref } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "../../base/BaseDialog.vue";
import MoveItemDialogTargetFolderList from "./MoveItemDialogTargetFolderList.vue";

const eventStore = useEventStore();

const t = ref(i18n.global.t);

const dialogTitle = ref("");
const dialogMainButtonText = ref("");
const selectedNewParentFolderId: Ref<string | null> = ref("");

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
  switch (dialogEvent.value.type) {
    case "move-folder":
      break;
    case "move-note":
      break;
  }
  closeDialog();
}

function closeDialog() {
  selectedNewParentFolderId.value = null;
  eventStore.closeMoveItemDialog();
}
function handleFolderSelected(folderId: string | null) {
  console.log("handleFolderSelected", folderId);
  selectedNewParentFolderId.value = folderId;
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
:deep(.item-name) {
  font-weight: 600;
}
</style>
