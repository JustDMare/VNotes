<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { ref, watchEffect } from "vue";
import type BaseDialog from "./base/BaseDialog.vue";

defineProps({
  title: { type: String, required: true },
  mainButtonText: { type: String, required: true },
});
const eventStore = useEventStore();
const isDialogOpen = ref(false);

watchEffect(() => {
  if (eventStore.nameFolderOrNoteDialog.isOpen) {
    isDialogOpen.value = true;
  } else {
    isDialogOpen.value = false;
  }
});

function closeDialog() {
  eventStore.nameFolderOrNoteDialog.setNameFolderOrNoteDialogOpen(false);
}
</script>

<template>
  <BaseDialog
    :open="isDialogOpen"
    :title="title"
    :main-button-text="mainButtonText"
    @close="closeDialog"
  >
    <template #dialog-body> <p>Hello there</p> </template>
  </BaseDialog>
</template>

<style lang="scss" scoped></style>
