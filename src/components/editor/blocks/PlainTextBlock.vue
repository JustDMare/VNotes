<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block";
import { useEditorStore } from "@/stores/editor";
import type { Block } from "@/types/blocks";
import { onMounted, ref, toRef, type PropType, type Ref } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const editorStore = useEditorStore();

const {
  initialBlockContent,
  blockHTMLContent,
  parseSpecialKeys,
  processInput,
} = useTextBasedBlock(props.block);

onMounted(() => {
  if (editorStore.blockCreated && blockHTMLContent.value) {
    blockHTMLContent.value.innerHTML = "<span>&nbsp;</span>";
    blockHTMLContent.value.focus();
    editorStore.setBlockCreated(false);
    blockHTMLContent.value.innerHTML = "";
  }
});
</script>

<template>
  <p
    class="block__content--text"
    ref="blockHTMLContent"
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ initialBlockContent }}
  </p>
</template>
<style lang="scss"></style>
