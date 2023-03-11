<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { useUserSpaceStore } from "@/stores/user-space";
import { ref, toRef } from "vue";
import { i18n } from "@/i18n/i18n.plugin";
import BaseDialog from "../base/BaseDialog.vue";
import LanguageSelector from "../LanguageSelector.vue";

const eventStore = useEventStore();
const userSpaceStore = useUserSpaceStore();
const t = ref(i18n.global.t);

const dialogTitle = ref("");
const dialogMainButtonText = ref("");

const dialogEvent = toRef(eventStore, "userSpaceSettingsDialogEvent");

function closeDialog() {
  eventStore.closeUserSpaceSettingsDialog();
}
</script>

<template>
  <section v-show="dialogEvent.isOpen" class="user-space-settings-dialog">
    <BaseDialog
      :title="dialogTitle"
      :main-button-text="dialogMainButtonText"
      :open="dialogEvent.isOpen"
      :show-footer="false"
      @close="closeDialog"
    >
      <template #dialog-body>
        <LanguageSelector />
      </template>
    </BaseDialog>
  </section>
</template>

<style lang="scss" scoped>
.user-space-settings-dialog {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 11;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
