<script setup lang="ts">
import { formatLongDateAndTime } from "@/utils";
import { useEditorStore } from "@/stores/editor";
import { computed } from "vue";
import { SaveIcon } from "../icons";
const editorStore = useEditorStore();

const noteLastUpdatedTime = computed(() => {
  if (!editorStore.noteInEditor) {
    return null;
  }
  return formatLongDateAndTime(editorStore.noteInEditor.lastUpdatedTime);
});
const isSavingNote = computed(() => editorStore.isSavingNote);
</script>

<template>
  <menu id="ws__header">
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
  </menu>
</template>

<style scoped lang="scss">
#ws__header {
  display: flex;
  background-color: var(--color-base-100);
  padding: 12px;
  justify-content: end;
  box-shadow: -8px 13px 43px 0px rgba(0, 0, 0, 0.03);
  align-items: center;
}
.ws__header__save-section {
  display: flex;
  gap: 8px;
  align-items: center;
  &__text {
    font-size: 0.875rem;
    color: var(--color-base-40);
  }
}
.ws__header__btn {
  background: var(--color-base-100);
  color: var(--color-text);
  border: 0;
  border: 1px solid var(--color-base-80);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: var(--color-base-80);
    color: var(--x=color-base-0);
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
