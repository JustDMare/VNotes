<script lang="ts" setup>
import { NewNoteIcon, NewFolderIcon } from "../icons";
</script>

<template>
  <div class="sidebar__new-buttons">
    <button class="sidebar__new-buttons__button button--new-folder">
      <NewFolderIcon class="sidebar__new-buttons__button__icon" />
      <span class="sidebar__new-buttons__button__text">New Folder</span>
    </button>
    <button class="sidebar__new-buttons__button button--new-note">
      <NewNoteIcon class="sidebar__new-buttons__button__icon" />
      <span class="sidebar__new-buttons__button__text">New Note</span>
    </button>
  </div>
</template>

<style lang="scss" scoped>
.sidebar__new-buttons {
  display: flex;
  flex-direction: row;
  row-gap: 8px;
  padding: 1rem 0.5rem;
  justify-content: stretch;
  &__button {
    display: flex;
    align-items: center;
    
    &___icon {
      width: 24px;
      height: 24px;
      margin-right: 8px;
    }
    &___text {
      font-size: 14px;
      font-weight: 500;
      color: var(--color-base-60);
    }
  }
}
</style>
