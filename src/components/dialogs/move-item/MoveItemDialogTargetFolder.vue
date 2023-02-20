<script lang="ts" setup>
import type { Folder } from "vnotes-types";
import type { PropType } from "vue";
import MoveItemDialogTargetFolderButton from "./MoveItemDialogTargetFolderButton.vue";

const props = defineProps({
  folder: {
    type: Object as PropType<Folder>,
    required: true,
  },
});
</script>

<template>
  <li>
    <MoveItemDialogTargetFolderButton :folder-name="folder.name" :folder-id="folder._id" />
    <ul>
      <MoveItemDialogTargetFolder
        v-for="childFolder in folder.content.folders"
        :key="childFolder._id"
        :folder="childFolder"
      />
    </ul>
  </li>
</template>

<style lang="scss" scoped></style>
