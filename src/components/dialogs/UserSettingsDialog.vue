<script lang="ts" setup>
import { useEventStore } from "@/stores/event";
import { toRef } from "vue";
import { FadeTransition } from "../animations";
import BaseDialog from "../base/BaseDialog.vue";
import LanguageSelector from "../LanguageSelector.vue";

const eventStore = useEventStore();

const dialogEvent = toRef(eventStore, "userSettingsDialogEvent");

function closeDialog() {
  eventStore.closeUserSettingsDialog();
}
</script>

<template>
  <FadeTransition>
    <section v-if="dialogEvent.isOpen" class="user-settings-dialog">
      <BaseDialog
        :title="$t('userSettings.dialogTitle')"
        :open="dialogEvent.isOpen"
        :show-footer="false"
        @close="closeDialog"
      >
        <template #dialog-body>
          <div class="language-section">
            <p class="language-section__label">{{ $t("userSettings.languageSelector") }}</p>
            <LanguageSelector />
          </div>
        </template>
      </BaseDialog>
    </section>
  </FadeTransition>
</template>

<style lang="scss" scoped>
.user-settings-dialog {
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

  .language-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
  }
}
</style>
