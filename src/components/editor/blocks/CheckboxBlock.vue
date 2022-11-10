<script lang="ts" setup>
import { useTextBasedBlock } from "@/composables/textBasedBlock";
import { useMainStore } from "@/stores/main";
import type { CheckboxBlock } from "@/types/blocks";
import { computed, onMounted, ref, type PropType, type Ref } from "vue";

const props = defineProps({
  //TODO: Change all blocks to use their own block data and cast it to their type
  block: { type: Object as PropType<CheckboxBlock>, required: true },
});
const checkboxSelected = computed(() => props.block.uniqueProperties.selected);

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
      v-model="checkboxSelected"
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
