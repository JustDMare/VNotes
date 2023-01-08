<script setup lang="ts">
import BlockList from "./BlockList.vue";
import { useEditorStore } from "@/stores/editor";
import { computed, ref, watch, type Ref } from "vue";
import { onBeforeRouteUpdate } from "vue-router";

const editorStore = useEditorStore();
const note = computed(() => {
  return editorStore.noteInEditor;
});

const noteTitle: Ref<HTMLHeadingElement | null> = ref(null);

function parseSpecialKeys(event: KeyboardEvent) {
  if (event.code === "Enter" && !event.shiftKey) {
    event.preventDefault();
    editorStore.createBlockBelowTitle();
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
  () => note.value,
  (note, oldNote) => {
    if (noteTitle.value && note && note.title !== oldNote?.title) {
      noteTitle.value.innerHTML = note.title;
    }
  }
);
</script>
<template>
  <main id="note">
    <article v-if="note">
      <header>
        <h1
          v-once
          contenteditable
          :placeholder="$t('note.titlePlaceholder')"
          id="note__title"
          ref="noteTitle"
          @keydown="parseSpecialKeys"
          @input="processInput"
          v-html="note.title"
        ></h1>
      </header>
      <div id="note__list">
        <BlockList :block-list="note.content" />
      </div>
    </article>
  </main>
</template>

<style lang="scss">
#note {
  width: 100%;
  max-width: 900px;
  padding: 0 6rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}
#note__title {
  font-size: 32px;
  font-weight: 700;
  padding: 2px;
}

#note__list {
  display: flex;
  flex-direction: column;
}

[contenteditable] {
  word-wrap: break-word;
  white-space: pre-line;
  outline-style: none;
  &:focus {
    outline: 0px solid transparent;
  }
  &:empty::before {
    content: attr(placeholder);
    pointer-events: none;
    display: block; /* For Firefox */
    opacity: 0.5;
  }
}
</style>
