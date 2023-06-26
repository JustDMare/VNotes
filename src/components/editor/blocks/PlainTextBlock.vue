<script lang="ts" setup>
import type { PlainTextBlock } from "vnotes-types";
import { ref, type PropType } from "vue";
import ContentEditableComponent from "./ContentEditableComponent.vue";

defineProps({
  block: { type: Object as PropType<PlainTextBlock>, required: true },
});
const blockContentEditable = ref<typeof ContentEditableComponent | null>(null);
defineExpose({ blockContentEditable });
</script>

<template>
  <ContentEditableComponent
    :block="block"
    tag="p"
    ref="blockContentEditable"
    class="block__content--text"
  ></ContentEditableComponent>
</template>
<style lang="scss"></style>
