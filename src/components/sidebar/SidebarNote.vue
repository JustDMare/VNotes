<script setup lang="ts">
import { useMainStore } from "@/stores/main";
import type { SidebarNoteReference } from "@/types";
import type { PropType } from "vue";

const mainStore = useMainStore();
defineProps({
  noteReference: {
    type: Object as PropType<SidebarNoteReference>,
    required: true,
  },
});
</script>

<template>
  <p>{{ noteReference.title }}</p>
</template>

<style scoped lang="scss"></style>
