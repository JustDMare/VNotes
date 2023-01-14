<script lang="ts" setup>
import { useFocusBlockOnCreation } from "@/composables/focus-block-on-creation";
import { useTextBasedBlock } from "@/composables/text-based-block";
import type { Block } from "vnotes-types";
import { onMounted, type PropType } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});

const {
  initialBlockContent,
  blockHTMLContent,
  parseSpecialKeys,
  processInput,
} = useTextBasedBlock(props.block);
const { focusBlockOnCreation } = useFocusBlockOnCreation(blockHTMLContent);

onMounted(() => {
  focusBlockOnCreation();
});
</script>

<template>
  <p
    class="block__content--text"
    ref="blockHTMLContent"
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
    :placeholder="$t('note.blockPlaceholder')"
  >
    {{ initialBlockContent }}
  </p>
</template>
<style lang="scss"></style>
