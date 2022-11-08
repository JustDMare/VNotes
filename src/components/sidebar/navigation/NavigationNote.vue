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
  <button class="sidebar__item nav__item nav__note">
    <NoteIcon class="nav__icon nav__icon--note" />
    <span class="nav__item__text">{{ noteReference.title }}</span>
  </button>
</template>

<style scoped lang="scss">
.nav__note {
  background-color: transparent;
  border: 0;
  text-align: start;
}
</style>
