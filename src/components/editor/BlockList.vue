<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import type { Block } from "vnotes-types";
import { computed } from "vue";
import { BlockComponent } from "./blocks";
import { Sortable as SortableComponent } from "sortablejs-vue3";
import type Sortable from "sortablejs";

const editorStore = useEditorStore();

const blockList = computed(() => {
  if (!editorStore.noteInEditor) {
    return [];
  }
  return editorStore.noteInEditor.content as Block[];
});

const options = { handle: ".handle" };

function onEnd(event: Sortable.SortableEvent) {
  if (event.oldIndex !== undefined && event.newIndex !== undefined) {
    console.log("Hi");
    console.log(event.oldIndex, event.newIndex);
    editorStore.moveBlockInNote(event.oldIndex, event.newIndex);
  }
}
</script>

<template>
  <SortableComponent
    class="a"
    :list="blockList"
    item-key="_id"
    tag="div"
    :key="editorStore.noteInEditor?._id"
    :options="options"
    @end="onEnd"
  >
    <template #item="{ element }">
      <BlockComponent :block="element" :key="element._id"></BlockComponent>
    </template>
  </SortableComponent>
</template>
