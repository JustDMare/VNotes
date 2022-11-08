<script setup lang="ts">
import { NoteIcon } from "@/components/icons";
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
  <button class="nav__note nav__item">
    <NoteIcon class="nav__icon nav__icon--note" />
    <span class="nav__item__text">{{ noteReference.title }}</span>
  </button>
</template>

<style scoped lang="scss">
.nav__note {
  padding-left: 16px;
  background-color: transparent;
  border: 0;
  text-align: start;
}
</style>
