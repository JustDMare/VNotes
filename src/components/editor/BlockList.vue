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
    editorStore.moveBlockInNote(event.oldIndex, event.newIndex);
  }
}
</script>

<template>
  <SortableComponent
    :list="blockList"
    item-key="_id"
    tag="div"
    group="blocks"
    :key="editorStore.noteInEditor?._id"
    :options="options"
    @end="onEnd"
  >
    <template #item="{ element }">
      <BlockComponent :block="element" :key="element._id"></BlockComponent>
    </template>
  </SortableComponent>
</template>

<style scoped lang="scss">
.sortable-chosen {
  background-color: var(--color-base-90);
  border-radius: 3px;
  padding-top: 2px;
  padding-bottom: 2px;
  opacity: 0.7;
  transition: all 0.2s ease;
}

.sortable-ghost {
  background-color: var(--color-base-70);
  opacity: 0.5;
  border: 1px solid var(--color-base-40);
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 3px;
}
</style>
