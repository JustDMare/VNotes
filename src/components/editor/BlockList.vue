<script lang="ts" setup>
import { useEditorStore } from "@/stores/editor";
import type { Block } from "vnotes-types";
import { computed, ref } from "vue";
import { BlockComponent } from "./blocks";
import { Sortable } from "sortablejs-vue3";
import type { SortableOptions, SortableEvent } from "sortablejs";

const editorStore = useEditorStore();
const dragging = ref(false);
const sortableOptions: SortableOptions = {
  handle: ".grip-btn",
  animation: 250,
  easing: "ease-in-out",
};

const blockList = computed(() => {
  if (!editorStore.noteInEditor) {
    return [];
  }
  return editorStore.noteInEditor.content as Block[];
});

function onEnd(event: SortableEvent) {
  dragging.value = false;
  if (event.oldIndex !== undefined && event.newIndex !== undefined) {
    editorStore.moveBlockInNote(event.oldIndex, event.newIndex);
  }
}
</script>

<template>
  <Sortable
    :list="blockList"
    item-key="_id"
    tag="div"
    group="blocks"
    :key="editorStore.noteInEditor?._id"
    :options="sortableOptions"
    @end="onEnd"
    @start="dragging = true"
    :class="{ 'is-dragging': dragging }"
  >
    <template #item="{ element }">
      <BlockComponent :block="element" :key="element._id"></BlockComponent>
    </template>
  </Sortable>
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
.is-dragging :deep(.grip-btn) {
  cursor: grabbing !important;
  cursor: -webkit-grabbing !important;
}
</style>
