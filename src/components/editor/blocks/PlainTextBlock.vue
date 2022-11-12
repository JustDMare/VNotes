<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/text-based-block";
import { useEditorStore } from "@/stores/editor";
import type { Block } from "@/types/blocks";
import { onMounted, ref, toRef, type PropType, type Ref } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const editorStore = useEditorStore();

const { parseSpecialKeys, processInput } = useTextBasedBlock(
  toRef(props.block, "blockID")
);

const content: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
  if (editorStore.blockCreated && content.value) {
    content.value.innerHTML = "<span>&nbsp;</span>";
    content.value.focus();
    editorStore.setBlockCreated(false);
    content.value.innerHTML = "";
  }
});
</script>

<template>
  <p
    class="block__content--text"
    v-once
    ref="content"
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ block.content }}
  </p>
</template>
<style lang="scss"></style>
