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
  if (mainStore.blockCreated && content.value) {
    content.value.innerHTML = "<span>&nbsp;</span>";
    content.value.focus();
    mainStore.setBlockCreated(false);
    content.value.innerHTML = "";
  }
});
</script>

<template>
  <div class="block__content--checkbox">
    <input
      type="checkbox"
      class="block__content--checkbox__checkbox"
      name="checkbox"
      value="yes"
    />
    <p
      v-once
      class="block__content--checkbox__text"
      ref="content"
      contenteditable
      @keydown="parseSpecialKeys"
      @input="processInput"
    >
      {{ block.content }}
    </p>
  </div>
</template>
<style lang="scss"></style>
