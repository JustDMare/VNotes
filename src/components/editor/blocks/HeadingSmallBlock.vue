<script lang="ts" setup>
import type { HeadingSmallBlock } from "vnotes-types";
import { ref, type PropType } from "vue";
import ContentEditableComponent from "./ContentEditableComponent.vue";

defineProps({
  block: { type: Object as PropType<HeadingSmallBlock>, required: true },
});
const blockContentEditable = ref<HTMLElement | null>(null);
defineExpose({ blockContentEditable });
</script>

<template>
  <ContentEditableComponent
    :block="block"
    tag="h3"
    ref="blockContentEditable"
    class="block__content--heading__small"
  />
</template>
<style lang="scss"></style>
