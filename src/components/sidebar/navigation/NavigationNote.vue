<script setup lang="ts">
import { NoteIcon } from "@/components/icons";
import type { NavigationNoteReference } from "vnotes-types";
import type { PropType } from "vue";

//TODO: Remember to change the button for a RouterLink

defineProps({
  noteReference: {
    type: Object as PropType<NavigationNoteReference>,
    required: true,
  },
});
</script>

<template>
  <li class="nav__note">
    <router-link
      class="sidebar__item nav__item"
      :to="`/editor/${noteReference._id}`"
    >
      <NoteIcon class="nav__icon nav__icon--note" />
      <span class="nav__item__text">{{ noteReference.title }}</span>
    </router-link>
  </li>
</template>

<style scoped lang="scss"></style>
