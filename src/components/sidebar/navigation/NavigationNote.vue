<script setup lang="ts">
import { NoteIcon } from "@/components/icons";
import { useEditorStore } from "@/stores/editor";
import type { NavigationNoteReference } from "vnotes-types";
import type { PropType } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  noteReference: {
    type: Object as PropType<NavigationNoteReference>,
    required: true,
  },
});
const editorStore = useEditorStore();
</script>

<template>
  <li class="nav__note">
    <router-link
      :to="`/${noteReference._id}`"
      class="sidebar__item nav__item"
      :class="{ 'is-note-in-editor': noteReference._id === editorStore.noteInEditor?._id }"
    >
      <NoteIcon class="nav__icon nav__icon--note" />
      <span class="nav__item__text">{{ noteReference.title }}</span>
    </router-link>
  </li>
</template>

<style scoped lang="scss">
.sidebar__item.nav__item.is-note-in-editor {
  background-color: var(--color-base-70);
  color: var(--color-base-20);
}
</style>
