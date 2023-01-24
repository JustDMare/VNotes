<script setup lang="ts">
import BlockList from "./BlockList.vue";
import { useEditorStore } from "@/stores/editor";
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  toRef,
  watch,
  type ComputedRef,
  type PropType,
  type Ref,
} from "vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useHandleArrowKeys } from "@/composables/handle-arrow-keys";
import { useIsContentEmpty } from "@/composables/is-content-empty";
import type { Note } from "vnotes-types";

const editorStore = useEditorStore();
const props = defineProps({ note: { type: Object as PropType<Note>, required: true } });

const noteTitle: Ref<HTMLHeadingElement | null> = ref(null);
const initialNoteTitle = props.note.title;
const { handleArrowDownKey } = useHandleArrowKeys(noteTitle);
const isContentEmpty = useIsContentEmpty(toRef(props.note, "title"));
onMounted(() => {
  addEventListener("keydown", handleEditorShortcuts);
});

onUnmounted(() => {
  removeEventListener("keydown", handleEditorShortcuts);
});

function handleSpecialKeys(event: KeyboardEvent) {
  if (event.key === "ArrowDown" && !editorStore.commandPaletteOpen) {
    event.preventDefault();
    handleArrowDownKey(event);
  }
  if (event.code === "Enter") {
    event.preventDefault();
    editorStore.createBlockBelowTitle();
  }
  if (event.code === "Enter" && event.shiftKey) {
    event.preventDefault();
  }
}

function handleEditorShortcuts(event: KeyboardEvent) {
  if (event.key === "s" && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    editorStore.saveNoteChanges();
  }
}
function processInput(event: Event) {
  const input = event.target as HTMLElement;
  editorStore.updateNoteTitle(input.innerText);
}

onBeforeRouteUpdate((to, from) => {
  if (to.params.id !== from.params.id) {
    const noteId = to.params.id as string;
    editorStore.fetchNote(noteId);
  }
});

//TODO: Document
watch(
  () => props.note.title,
  (storeNoteTitle) => {
    if (noteTitle.value && noteTitle.value.innerText !== storeNoteTitle) {
      console.log("innerText", noteTitle.value.innerText);
      console.log("store", storeNoteTitle);
      noteTitle.value.innerText = storeNoteTitle;
    }
  }
);
</script>
<template>
  <main id="note-editor">
    <article id="note-editor__content" v-if="note">
      <header>
        <h1
          contenteditable
          :placeholder="$t('note.titlePlaceholder')"
          id="note-editor__content__title"
          class="note-editor__content-editable"
          :class="{ 'show-placeholder': isContentEmpty }"
          ref="noteTitle"
          @keydown="handleSpecialKeys"
          @input="processInput"
          v-text="initialNoteTitle"
        />
      </header>
      <div id="note-editor__content__list">
        <BlockList />
      </div>
    </article>
  </main>
</template>

<style lang="scss">
#note-editor {
  width: 100%;

  &__content {
    width: 100%;
    max-width: 900px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    &__title {
      font-size: 32px;
      font-weight: 700;
      padding: 2px 6rem;
    }

    &__list {
      display: flex;
      flex-direction: column;
    }
  }
}

[contenteditable] {
  word-break: break-word;
  white-space: pre-wrap;
  outline-style: none;
  &:focus {
    outline: 0px solid transparent;
  }
  &:not(:focus):empty::before {
    content: "\A0";
    color: rgba(0, 0, 0, 1);
  }
  &:empty::before {
    content: attr(placeholder);
    pointer-events: none;
    display: block; /* For Firefox */
    opacity: 0.5;
  }
}

.show-placeholder:focus::before {
  content: attr(placeholder);
  color: rgba(0, 0, 0, 0.5);
}
</style>
