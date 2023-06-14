<script lang="ts">
/**
 * Represents a folder in the MoveItemDialog component. If the folder is the same one as the
 * one that the item is being moved from, it will not be shown in the listing, along with
 * its subfolders.
 *
 * It contains a button that shows the name of the folder and a chevron icon that shows
 * the subfolders of the folder. When the button is clicked, the folder is selected
 * (represented by a checkmark icon) as the target folder for the moved item.
 *
 * @component MoveItemDialogTargetFolder
 * @see MoveItemDialog
 * @see MoveItemDialogTargetFolderList
 */
export default {
  name: "MoveItemDialogTargetFolder",
};
</script>

<script lang="ts" setup>
import type { Folder } from "vnotes-types";
import { ref, toRef, watchEffect, type Ref } from "vue";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";
import ChevronRightIcon from "@/components/icons/ChevronRightIcon.vue";
import { useEventStore, type MoveItemDialogEvent } from "@/stores/event";

const eventStore = useEventStore();

const props = defineProps<{
  /**
   * The folder to show.
   * @type {Folder}
   * @required
   */
  folder: Folder;
  /**
   * The `_id` of the folder that is selected as the new parent folder.
   * @type {String | null}
   * @required
   */
  selectedNewParentFolderId: string | null;
}>();

/**
 * Ref to the event that opens the dialog.
 *
 * @type {Ref<MoveItemDialogEvent>}
 * @reactive
 */
const dialogEvent: Ref<MoveItemDialogEvent> = toRef(eventStore, "moveItemDialogEvent");

/**
 * Whether the subfolders of the folder are shown or not.
 *
 * @type {Ref<Boolean>}
 * @reactive
 */
const showSubfolders: Ref<boolean> = ref(false);

/**
 * Whether the folder is selected or not. By default, the folder is selected if the
 * `selectedNewParentFolderId` prop is equal to the folder's `_id`.
 *
 * @type {Ref<Boolean>}
 * @reactive
 */
const isFolderSelected: Ref<boolean> = ref(props.selectedNewParentFolderId === props.folder._id);

const emits = defineEmits<{
  /**
   * Emitted when the folder is selected.
   *
   * @event folder-selected
   * @param {string} folderId - The `_id` of the folder that was selected.
   */
  (e: "folder-selected", folderId: string): void;
}>();

/**
 * WatchEffect that does two things:
 * 1. Sets the `isFolderSelected` value when a new folder is selected, based on whether
 *    the `selectedNewParentFolderId` prop is equal to this folder's `_id`.
 * 2. Closes the subfolders when the dialog is closed.
 *
 * @watch props.selectedNewParentFolderId
 * @watch dialogEvent.isOpen
 */
watchEffect(() => {
  isFolderSelected.value = props.selectedNewParentFolderId === props.folder._id;
  if (!dialogEvent.value.isOpen) {
    showSubfolders.value = false;
  }
});

/**
 * Handles the `click` and `keydown.space` events on the folder button. Emits the
 * `folder-selected` event with the folder's `_id` as the payload.
 *
 * @function handleFolderSelected
 * @listens click - The `click` event on the folder button.
 * @listens keydown.space - The `keydown.space` event when the the folder button is focused.
 * @emits folder-selected
 */
function handleFolderSelected(folderId: string) {
  emits("folder-selected", folderId);
}

/**
 * Handles the `click` event on the chevron's button. Toggles the `showSubfolders` value.
 *
 * @function toggleSubfolderVisibility
 * @param {MouseEvent} event - The `click` event.
 * @listens click - The `click` event on the chevron's button.
 */
function toggleSubfolderVisibility(event: MouseEvent) {
  event.stopImmediatePropagation();
  showSubfolders.value = !showSubfolders.value;
}
</script>

<template>
  <li
    class="move-item__target-list__target-item"
    v-if="dialogEvent.movedItemId !== folder._id"
    data-test="move-item-target-folder"
  >
    <div
      class="move-item__target-list__target"
      :class="{ 'move-item__target-list__target--selected': isFolderSelected }"
      @click="handleFolderSelected(folder._id)"
      @keydown.space="handleFolderSelected(folder._id)"
      tabindex="0"
    >
      <div class="move-item__target-list__target__dropdown-btn">
        <button
          v-if="folder.content.folders.length > 0"
          @click="toggleSubfolderVisibility"
          class="move-item__target-list__target__dropdown-btn"
        >
          <ChevronRightIcon
            class="target__icon target__icon--chevron"
            :rotate-down="showSubfolders"
          />
        </button>
      </div>

      <MoveItemDialogTargetFolderButton
        :folder-name="folder.name"
        :folder-id="folder._id"
        :selected-new-parent-folder-id="selectedNewParentFolderId"
        @folder-selected="handleFolderSelected"
      />
    </div>
    <ul v-if="showSubfolders" class="move-item__target-list">
      <MoveItemDialogTargetFolder
        v-for="childFolder in folder.content.folders"
        :key="childFolder._id"
        :folder="childFolder"
        :selected-new-parent-folder-id="selectedNewParentFolderId"
        @folder-selected="handleFolderSelected"
      />
    </ul>
  </li>
</template>

<style lang="scss" scoped>
.move-item__target-list__target {
  list-style-type: none;
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: center;
  justify-content: stretch;
  gap: 4px;
  padding: 4px 6px 4px 6px;
  border-radius: 3px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: all 0.25s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: var(--color-base-80);
  }
  &--selected {
    background-color: var(--color-base-70);

    &:hover {
      background-color: var(--color-base-70);
    }
  }

  &__dropdown-btn {
    display: inline-flex;
    background: none;
    border: none;
    padding: 0;
    align-self: center;
    align-content: center;
    justify-content: center;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    &:hover {
      background-color: var(--color-base-60);
    }
  }
}

.target__icon {
  width: 20px;
  height: 20px;
  align-self: center;

  &--chevron {
    grid-column: 1;
  }
}
</style>
