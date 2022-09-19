<script lang="ts" setup>
import type { Block } from "@/types";
import type { PropType } from "vue";

defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
</script>

<template>
  <h1 contenteditable>{{ block.content }}</h1>
</template>
