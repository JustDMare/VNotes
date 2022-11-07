<script setup lang="ts">
import type { NavigationNoteReference } from "@/types";
import type { PropType } from "vue";

defineProps({
  noteReference: {
    type: Object as PropType<NavigationNoteReference>,
    required: true,
  },
});
</script>

<template>
  <p>{{ noteReference.title }}</p>
</template>

<style scoped lang="scss"></style>
