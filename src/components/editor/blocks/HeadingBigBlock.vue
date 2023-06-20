<script lang="ts" setup>
import type { HeadingBigBlock } from "vnotes-types";
import { ref, type PropType } from "vue";
import ContentEditableComponent from "./ContentEditableComponent.vue";

defineProps({
  block: { type: Object as PropType<HeadingBigBlock>, required: true },
});

const blockContentEditable = ref<HTMLElement | null>(null);
defineExpose({ blockContentEditable });
</script>

<template>
  <ContentEditableComponent
    :block="block"
    tag="h1"
    ref="blockContentEditable"
    class="block__content--heading__big"
  />
</template>

<style lang="scss"></style>
