<script lang="ts" setup>
import { useMainStore } from "@/stores/main";
import { useTextBasedBlock } from "@/composables/textBasedBlock";
import type { Block } from "@/types/blocks";
import { onMounted, reactive, ref, type PropType, type Ref } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
  index: { type: Number, required: true },
});
const mainStore = useMainStore();
const block = reactive(props.block);
const { parseSpecialKeys, processInput, vFocusOnCreation } =
  useTextBasedBlock(block);

const content: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
  if (mainStore.blockCreated) {
    content.value?.focus();
  }
});
</script>

<template>
  <p
    v-once
    ref="content"
    v-focus-on-creation
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
    v-text="block.content"
  />
</template>
