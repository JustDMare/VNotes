<script setup lang="ts">
import BlockList from "./BlockList.vue";
import { useEditorStore } from "@/stores/editor";

const editorStore = useEditorStore();
const note = editorStore.noteInEditor;
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
</script>
<template>
  <main id="note">
    <article>
      <header>
        <h1
          v-once
          contenteditable
          :placeholder="$t('note.titlePlaceholder')"
          id="note__title"
          @keydown="parseSpecialKeys"
          @input="processInput"
        >
          {{ note.title }}
        </h1>
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
