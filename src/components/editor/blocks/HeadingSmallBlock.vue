<script lang="ts" setup>
import type { Block } from "vnotes-types";
import { ref, type PropType } from "vue";
import ContentEditableComponent from "./ContentEditableComponent.vue";

defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
const blockContentEditable = ref<HTMLElement | null>(null);
defineExpose({ blockContentEditable });
</script>

<template>
  <ContentEditableComponent
    :block="block"
    tag="h3"
    ref="blockContentEditable"
    class="block__content--heading__small note-editor__content-editable"
  />
</template>
<style lang="scss"></style>
