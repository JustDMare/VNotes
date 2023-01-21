<script lang="ts" setup>
import { useFocusBlockOnCreation } from "@/composables/focus-block-on-creation";
import { useTextBasedBlock } from "@/composables/text-based-block";
import type { Block } from "vnotes-types";
import { onMounted, type PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});

const { initialBlockContent, blockHTMLContent, parseSpecialKeys, processInput } =
  useTextBasedBlock(props.block);
const { focusBlockOnCreation } = useFocusBlockOnCreation(blockHTMLContent);
defineExpose({ blockHTMLContent });

function parseBlockContent() {
  const contentForTextNodes = initialBlockContent.value.split("\n");
  contentForTextNodes.forEach((nodeContent) => {
    if (blockHTMLContent.value === null) {
      return;
    }
    const textNode = document.createTextNode(nodeContent + "\n");
    blockHTMLContent.value.appendChild(textNode);
  });
}
onMounted(() => {
  console.log(initialBlockContent);
  parseBlockContent();
  focusBlockOnCreation();
});
</script>

<template>
  <p
    class="block__content--text note-editor__content-editable"
    ref="blockHTMLContent"
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
    :placeholder="$t('note.blockPlaceholder')"
  ></p>
</template>
<style lang="scss"></style>
