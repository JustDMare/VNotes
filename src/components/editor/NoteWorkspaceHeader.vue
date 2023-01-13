<script setup lang="ts">
import { useEditorStore } from "@/stores/editor";
import { SaveIcon } from "../icons";
const editorStore = useEditorStore();
</script>

<template>
  <menu id="ws__header">
    <button
      :title="$t('tooltips.saveButton')"
      class="ws__header__btn"
      @click="editorStore.saveNoteChanges()"
    >
      <SaveIcon />
      <span>{{ $t("header.saveChanges") }}</span>
    </button>
  </menu>
</template>

<style scoped lang="scss">
#ws__header {
  display: flex;
  // border-bottom: solid 1px black;
  background-color: var(--color-base-100);
  padding: 12px;
  justify-content: end;
  box-shadow: -8px 13px 43px 0px rgba(0, 0, 0, 0.03);
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
  &:hover {
    background: var(--color-base-80);
    color: var(--x=color-base-0);
  }
}
</style>
