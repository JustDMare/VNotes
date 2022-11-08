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
  <button class="nav__note">
    <NoteIcon class="nav__icon" />{{ noteReference.title }}
  </button>
</template>

<style scoped lang="scss">
.nav__note {
  padding-left: 16px;
  background-color: transparent;
  border: 0;
  text-align: start;
  display: grid;
  grid-template-columns: var(--nav-icon-size) 1fr;
}
</style>
