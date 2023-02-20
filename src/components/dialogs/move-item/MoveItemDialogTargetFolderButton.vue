<script lang="ts" setup>
const props = defineProps({
  folderName: {
    type: String,
    required: true,
  },
  folderId: {
    type: String,
    required: false,
    default: null,
  },
});
</script>

<template>
  <div>{{ folderName }}</div>
</template>

<style lang="scss" scoped></style>
