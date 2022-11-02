<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/textBasedBlock";
import { useMainStore } from "@/stores/main";
import type { Block } from "@/types/blocks";
import { onMounted, ref, type PropType, type Ref } from "vue";

const props = defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const mainStore = useMainStore();

const { parseSpecialKeys, processInput } = useTextBasedBlock(props.block);

const content: Ref<HTMLElement | null> = ref(null);
onMounted(() => {
  if (mainStore.blockCreated) {
    content.value?.focus();
    mainStore.setBlockCreated(false);
  }
});
</script>

<template>
  <p
    class="block--text"
    v-once
    ref="content"
    contenteditable
    @keydown="parseSpecialKeys"
    @input="processInput"
  >
    {{ block.content }}
  </p>
</template>
<style lang="scss">
.block--text + .block--button__create {
  left: -20px;
}
</style>
