<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import { formatLongDateAndTime } from "@/utils";
import { SaveIcon } from "../icons";
import { computed } from "vue";

const editorStore = useEditorStore();

const noteLastUpdatedTime = computed(() => {
  if (!editorStore.noteInEditor) {
    return null;
  }
  return formatLongDateAndTime(editorStore.noteInEditor.lastUpdatedTime);
});
const isSavingNote = computed(() => editorStore.isSavingNote);
//TODO: Refactor Save button to clean code
</script>

<template>
  <div class="ws__header__save-section">
    <div
      v-if="isSavingNote"
      class="ws__header__save_section__saving-animation donut-animation"
    ></div>
    <span v-else-if="noteLastUpdatedTime" class="ws__header__save-section__text">
      {{ $t("header.lastSaved", { date: noteLastUpdatedTime }) }}
    </span>

    <button
      :title="$t('tooltips.saveButton')"
      class="ws__header__btn ws__header__save-section__button"
      @click="editorStore.saveNoteChanges()"
    >
      <SaveIcon />
      <span>{{ $t("header.saveChanges") }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.ws__header__save-section {
  display: flex;
  gap: 8px;
  align-items: center;
  &__text {
    font-size: 12px;
    font-weight: 500;
    color: var(--color-base-40);
  }
}
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.donut-animation {
  display: inline-block;
  border: 3px solid var(--color-base-70);
  border-left-color: var(--color-base-30);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: donut-spin 1s linear infinite;
}
</style>
