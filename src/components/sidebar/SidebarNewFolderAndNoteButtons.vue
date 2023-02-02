<script lang="ts" setup>
import { NewNoteIcon, NewFolderIcon } from "../icons";
import { useEventStore } from "@/stores/event";

const eventStore = useEventStore();

function createNewNote() {
  eventStore.openCreateItemDialog("create-note");
}
function createNewFolder() {
  eventStore.openCreateItemDialog("create-folder");
}
</script>

<template>
  <div class="sidebar__new-btns">
    <button
      @click="createNewFolder"
      :title="$t('tooltips.newFolderButton')"
      class="sidebar__new-btns__btn btn--new-folder"
    >
      <NewFolderIcon class="sidebar__new-btns__btn__icon" />
      <span class="sidebar__new-btns__btn__text">{{ $t("sidebar.newFolderButton") }}</span>
    </button>
    <button
      :title="$t('tooltips.newNoteButton')"
      @click="createNewNote"
      class="sidebar__new-btns__btn btn--new-note"
    >
      <NewNoteIcon class="sidebar__new-btns__btn__icon" />
      <span class="sidebar__new-btns__btn__text">{{ $t("sidebar.newNoteButton") }}</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.sidebar__new-btns {
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  margin: 16px 0 8px;
  padding: 4px 8px;
  justify-content: stretch;
  &__btn {
    width: 100%;
    //Below could be turned into a btn--primary class
    justify-content: center;
    display: flex;
    align-items: center;
    background: var(--color-base-100);
    color: var(--color-text);
    border: 1px solid var(--color-base-80);
    border-radius: 4px;
    gap: 6px;
    padding: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: var(--color-base-80);
      color: var(--color-base-0);
    }
    &:active {
      transform: scale(0.95);
    }
    &__text {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-text);
    }
  }
}
</style>
