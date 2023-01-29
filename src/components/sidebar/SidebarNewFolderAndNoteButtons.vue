<script lang="ts" setup>
import { NewNoteIcon, NewFolderIcon } from "../icons";
import { useEventStore } from "@/stores/event";

const eventStore = useEventStore();

function createNewNote() {
  eventStore.openNameFolderOrNoteDialog("New Note", "Create Note", "inputNoteName", "note");
}
function createNewFolder() {
  eventStore.openNameFolderOrNoteDialog("New Folder", "Create Folder", "inputFolderName", "folder");
}
</script>

<template>
  <div class="sidebar__new-btns">
    <button @click="createNewFolder" class="sidebar__new-btns__btn btn--new-folder">
      <NewFolderIcon class="sidebar__new-btns__btn__icon" />
      <span class="sidebar__new-btns__btn__text">New Folder</span>
    </button>
    <button @click="createNewNote" class="sidebar__new-btns__btn btn--new-note">
      <NewNoteIcon class="sidebar__new-btns__btn__icon" />
      <span class="sidebar__new-btns__btn__text">New Note</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.sidebar__new-btns {
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  margin-top: 16px;
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
      color: var(--x=color-base-0);
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
