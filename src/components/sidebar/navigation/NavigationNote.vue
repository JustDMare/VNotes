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
    <div
      class="sidebar__item"
      :class="{ 'is-note-in-editor': noteReference._id === editorStore.noteInEditor?._id }"
    >
      <router-link :to="`/workspace/${noteReference._id}`" class="nav__item">
        <NoteIcon class="nav__icon nav__icon--note" />
        <span class="nav__item__text">{{ noteReference.title }}</span>
      </router-link>
    </div>
  </li>
</template>

<style scoped lang="scss">
.sidebar__item.is-note-in-editor {
  background-color: var(--color-base-70);
  color: var(--color-base-20);
}
</style>
