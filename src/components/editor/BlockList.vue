<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import type { Block } from "vnotes-types";
import { computed } from "vue";
import { BlockComponent } from "./blocks";
const editorStore = useEditorStore();

const blockList = computed({
  get() {
    if (!editorStore.noteInEditor) {
      return [];
    }
    return editorStore.noteInEditor.content as Block[];
  },
  set(blockList: Block[]) {
    editorStore.updateNoteContent(blockList);
  },
});
</script>

<template>
  <BlockComponent
    v-for="block in blockList"
    :block="block"
    :key="block._id"
  ></BlockComponent>
</template>
