<script lang="ts">
/**
 * Dialog component containing all the settings of the UserSpace. Uses the BaseDialog
 * component.
 *
 * @component UserSettingsDialog
 * @see BaseInputDialog
 */
export default {
  name: "UserSettingsDialog",
};
</script>

<script lang="ts" setup>
import { useDialogEventStore, type UserSettingsDialogEvent } from "@/stores/dialog-event";
import { toRef, type Ref } from "vue";
import { ScaleTransition } from "../animations";
import BaseDialog from "../base/BaseDialog.vue";
import LanguageSelector from "../LanguageSelector.vue";

const dialogEventStore = useDialogEventStore();

/**
 * Ref to the event that opens the dialog.
 *
 * @type {Ref<UserSettingsDialogEvent>}
 * @reactive
 */
const dialogEvent: Ref<UserSettingsDialogEvent> = toRef(
  dialogEventStore,
  "userSettingsDialogEvent"
);

/**
 * Handles the `close` event emitted by the BaseDialog component, closing the dialog.
 *
 * @function closeDialog
 * @returns {void}
 * @listens close - The `close` event emitted by the BaseDialog component.
 */
function closeDialog(): void {
  dialogEventStore.closeUserSettingsDialog();
}
</script>

<template>
  <ScaleTransition>
    <section v-show="dialogEvent.isOpen" class="user-settings-dialog">
      <BaseDialog
        :title="$t('userSettings.dialogTitle')"
        :open="dialogEvent.isOpen"
        :show-footer="false"
        @close="closeDialog"
        data-test="user-settings-dialog"
      >
        <template #dialog-body>
          <div class="language-section">
            <p class="language-section__label">{{ $t("userSettings.languageSelector") }}</p>
            <LanguageSelector />
          </div>
        </template>
      </BaseDialog>
    </section>
  </ScaleTransition>
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
  .language-section {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 1rem;
  }
}
</style>
