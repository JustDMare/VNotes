<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  folderName: string;
  folderId: string | null;
  selectedNewParentFolderId: string | null;
}>();
const isSelected = computed(() => {
  return props.selectedNewParentFolderId === props.folderId;
});
const checkboxId = computed(() => {
  if (props.folderId === null) {
    return "folder-root";
  }
  return `folder-${props.folderId}`;
});
</script>

<template>
  <label :for="checkboxId"
    >{{ folderName }}
    <input :id="checkboxId" v-model="isSelected" type="checkbox" />
  </label>
</template>

<style lang="scss" scoped></style>
