<script setup lang="ts">
import { formatLongDateAndTime } from "@/common";
import { useEditorStore } from "@/stores/editor";
import { computed } from "vue";
import { SaveIcon } from "../icons";
const editorStore = useEditorStore();

const noteLastUpdatedTime = computed(() => {
  if (!editorStore.noteInEditor) {
    return null;
  }
  const timestamp = Number(editorStore.noteInEditor.lastUpdatedTime);
  const timeDifference = Date.now() - timestamp;
  const timePassed = new Date(timeDifference).getHours();
  console.log(timePassed);
  return formatLongDateAndTime(editorStore.noteInEditor.lastUpdatedTime);
});
</script>

<template>
  <menu id="ws__header">
    <div class="ws__header__save-section">
      <span class="ws__header__save-section__text" v-if="noteLastUpdatedTime">
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
</style>
