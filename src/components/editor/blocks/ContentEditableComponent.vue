<script setup lang="ts">
import { useFocusBlockOnCreation } from "@/composables/focus-block-on-creation";
import { useTextBasedBlock } from "@/composables/text-based-block/text-based-block";
import type { Block } from "vnotes-types";
import type { PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
  tag: { type: String, default: "p", required: true },
});

const { blockHTMLContent, parseSpecialKeys, processInput, isBlockEmpty } =
  useTextBasedBlock(props.block);
useFocusBlockOnCreation(blockHTMLContent);

defineExpose({ blockHTMLContent });
</script>

<template>
  <component
    :is="tag"
    contenteditable="true"
    :placeholder="$t('note.blockPlaceholder')"
    ref="blockHTMLContent"
    @keydown="parseSpecialKeys"
    @input="processInput"
    :class="{ 'block__show-placeholder': isBlockEmpty }"
  />
</template>
