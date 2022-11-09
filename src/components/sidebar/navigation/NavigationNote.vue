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
  <li class="nav__note">
    <button class="sidebar__item nav__item">
      <NoteIcon class="nav__icon nav__icon--note" />
      <span class="nav__item__text">{{ noteReference.title }}</span>
    </button>
  </li>
</template>

<style scoped lang="scss"></style>
