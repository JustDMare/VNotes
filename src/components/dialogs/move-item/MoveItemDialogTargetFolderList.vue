<script lang="ts">
/**
 * Contains the list of folders to which the item can be moved to. The list contains the
 * Root folder and all the folders in the user's space.
 *
 * @component MoveItemDialogTargetFolderList
 * @see MoveItemDialogTargetFolder
 */
export default {
  name: "MoveItemDialogTargetFolderList",
};
</script>

<script lang="ts" setup>
import { i18n } from "@/i18n/i18n.plugin";
import { useUserSpaceStore } from "@/stores/user-space";
import type { Folder } from "vnotes-types";
import { toRef, type Ref } from "vue";
import MoveItemDialogTargetFolder from "./MoveItemDialogTargetFolder.vue";

const userSpaceStore = useUserSpaceStore();
const t = i18n.global.t;

defineProps<{
  /**
   * The `_id` of the folder that the item will be moved to.
   * @type {string | null}
   * @required
   */
  selectedNewParentFolderId: string | null;
}>();

/**
 * Content of the Root folder of the user's space, containing all the folders and notes.
 *
 * @type {Ref<Folder['content']>}
 * @reactive
 */
const sidebarContent: Ref<Folder["content"]> = toRef(userSpaceStore.$state.userSpace, "content");

/**
 * Representation of the Root folder of the user's space. Required for listing it as a
 * folder in the MoveItemDialogTargetFolderList.
 *
 * @type {Folder}
 * @remarks The `_id` is set as the same one as the UserSpace as a workaround to be able
 * to distinguish between the Root folder and other folders in the
 * MoveItemDialogTargetFolder, since the Root folder is not a real folder, but rather a
 * lack of having a parent folder.
 */
const rootFolder: Folder = {
  _id: userSpaceStore.userSpace._id,
  name: t("moveItemDialog.rootFolder"),
  content: {
    folders: [],
    notes: [],
  },
  numberOfItems: 0,
  createdTime: "",
  lastUpdatedTime: "",
};

const emits = defineEmits<{
  /**
   * Emitted when a folder is selected as the new parent folder for the item.
   *
   * @event folder-selected
   * @param {string} folderId - The `_id` of the folder that was selected.
   */
  (e: "folder-selected", folderId: string): void;
}>();

/**
 * Handles the `folder-selected` event emitted by the MoveItemDialogTargetFolder
 * component.
 *
 * @param {string} folderId - The `_id` of the folder that was selected.
 * @listens folder-selected - Emitted by the MoveItemDialogTargetFolder component.
 * @emits folder-selected
 */
function handleFolderSelected(folderId: string) {
  emits("folder-selected", folderId);
}
</script>

<template>
  <ul class="move-item__target-list">
    <MoveItemDialogTargetFolder
      :selected-new-parent-folder-id="selectedNewParentFolderId"
      @folder-selected="handleFolderSelected"
      :folder="rootFolder"
    />

    <MoveItemDialogTargetFolder
      v-for="folder in sidebarContent.folders"
      :key="folder._id"
      :folder="folder"
      :selected-new-parent-folder-id="selectedNewParentFolderId"
      @folder-selected="handleFolderSelected"
    />
  </ul>
</template>

<style lang="scss" scoped>
.move-item__target-list,
:deep(.move-item__target-list) {
  padding-inline-start: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.move-item__target-list {
  overflow-y: auto;
  height: 100%;
  border: solid 1px var(--color-base-70);
  border-radius: 4px;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
}

:deep(.move-item__target-list) {
  padding-left: 0.5rem;
  margin-left: calc(1rem - 0.5px);
  border-left: 1px solid var(--color-base-50);
}
:deep(.move-item__target-list__target-item) {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
