<script lang="ts" setup>
import type Block from "@/types/blocks/block";
import type { PropType } from "vue";

defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
</script>

<template>
  <p contenteditable>{{ block.content }}</p>
</template>
