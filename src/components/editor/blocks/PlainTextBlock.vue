<script lang="ts" setup>
import type { Block } from "vnotes-types";
import { ref, type PropType } from "vue";
import ContentEditableComponent from "./ContentEditableComponent.vue";

defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const blockContentEditable = ref<typeof ContentEditableComponent | null>(null);
defineExpose({ blockContentEditable });
</script>

<template>
  <ContentEditableComponent
    :block="block"
    tag="p"
    ref="blockContentEditable"
    class="block__content--text note-editor__content-editable"
  ></ContentEditableComponent>
</template>
<style lang="scss"></style>
