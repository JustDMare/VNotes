<script setup lang="ts">
import { ref, type Ref } from "@vue/reactivity";

const noteTitle: Ref<string> = ref("");
</script>
<template>
  <article id="note">
    <header>
      <h1
        contenteditable
        :placeholder="$t('note.titlePlaceholder')"
        id="note-title"
      >
        {{ noteTitle }}
      </h1>
    </header>
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
