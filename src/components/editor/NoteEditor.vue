<script setup lang="ts">
import BlockList from "./BlockList.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const note = mainStore.noteInEditor;
function parseSpecialKeys(event: KeyboardEvent) {
  if (event.code === "Enter" && !event.shiftKey) {
    event.preventDefault();
    mainStore.createBlockInEditor();
  }
}
function processInput(event: Event) {
  const input = event.target as HTMLElement;
  mainStore.updateNoteInEditorTitle(input.innerText);
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
          id="note-title"
          @keydown="parseSpecialKeys"
          @input="processInput"
        >
          {{ note.title }}
        </h1>
      </header>
      <BlockList :block-list="note.content" />
    </article>
  </main>
</template>

<style lang="scss">
#note {
  width: 100%;
  max-width: 900px;
  padding: 0 6rem;
  overflow-y: scroll;
}
#note-title {
  font-size: 32px;
  font-weight: 700;
  padding: 2px;
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
