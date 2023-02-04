<script setup lang="ts">
import { getNoteOptions } from "@/commands/navigation-item-options/note";
import { NoteIcon } from "@/components/icons";
import { useEditorStore } from "@/stores/editor";
import type { NavigationNoteReference } from "vnotes-types";
import { ref, type PropType } from "vue";
import { RouterLink } from "vue-router";
import NavigationItemOptionsDropdown from "./NavigationItemOptionsDropdown.vue";

const props = defineProps({
  noteReference: {
    type: Object as PropType<NavigationNoteReference>,
    required: true,
  },
});
const editorStore = useEditorStore();
const noteOptions = getNoteOptions(props.noteReference._id);
let optionsDropdownIsOpen = ref(false);
let showOptionsButton = ref(false);

//TODO: Could be refactored into a composable
function setShowOptionsButton(newShowOptionsButtonValue: boolean) {
  showOptionsButton.value = newShowOptionsButtonValue;
}
</script>

<template>
  <li class="nav__note">
    <div
      @mouseover="setShowOptionsButton(true)"
      @mouseleave="setShowOptionsButton(false)"
      @focusin="setShowOptionsButton(true)"
      @focusout="setShowOptionsButton(false)"
      class="sidebar__item"
      :class="[
        { 'is-note-in-editor': noteReference._id === editorStore.noteInEditor?._id },
        { 'sidebar__item--highlight': optionsDropdownIsOpen },
      ]"
    >
      <router-link :to="`/workspace/${noteReference._id}`" class="nav__item">
        <NoteIcon class="nav__icon nav__icon--note" />
        <span class="nav__item__text">{{ noteReference.title }}</span>
      </router-link>
      <NavigationItemOptionsDropdown
        v-show="showOptionsButton || optionsDropdownIsOpen"
        :options="noteOptions"
        @options-dropdown-opened="optionsDropdownIsOpen = true"
        @options-dropdown-closed="optionsDropdownIsOpen = false"
      />
    </div>
  </li>
</template>

<style scoped lang="scss">
.sidebar__item.is-note-in-editor:not(.sidebar__item--highlight) {
  background-color: var(--color-base-70);
  color: var(--color-base-20);
}
</style>
