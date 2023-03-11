<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { ref, toRef } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "../base/BaseDialog.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

const dialogTitle = ref("");
const dialogMainButtonText = ref("");
const dialogBodyText = ref("");

const dialogEvent = toRef(eventStore, "userSpaceSettingsDialogEvent");

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
    @close="closeDialog"
  >
    <template #dialog-body> </template>
  </BaseDialog>
</template>

<style lang="scss" scoped>
:deep(.item-name) {
  font-weight: 600;
}
</style>
