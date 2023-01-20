<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import type { Block } from "vnotes-types";
import { computed } from "vue";
import { BlockComponent } from "./blocks";
import { Sortable } from "sortablejs-vue3";

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
const options = { handle: ".handle" };
</script>

<template>
  <Sortable class="a" :list="blockList" item-key="_id" tag="div" :options="options">
    <template #item="{ element }">
      <BlockComponent :block="element" :key="element._id"></BlockComponent>
    </template>
  </Sortable>
</template>
