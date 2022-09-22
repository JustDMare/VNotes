<script setup lang="ts">
import BlockList from "./BlockList.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const note = mainStore.noteInEditor;
</script>
<template>
  <article id="note">
    <header>
      <h1
        contenteditable
        :placeholder="$t('note.titlePlaceholder')"
        id="note-title"
      >
        {{ note.title }}
      </h1>
    </header>
    <BlockList :block-list="note.content"></BlockList>
  </article>
</template>

<style scoped lang="scss">
#note {
  width: 100%;
  max-width: 700px;

  &-title {
    font-size: 32px;
    font-weight: 700;
  }
}

[contenteditable]:empty:before {
  content: attr(placeholder);
  pointer-events: none;
  display: block; /* For Firefox */
  opacity: 0.5;
}

[contenteditable] {
  word-wrap: break-word;
  outline-style: none;
}
</style>
