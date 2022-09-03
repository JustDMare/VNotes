<script lang="ts" setup>
import type { Block } from "@/types";

import type { PropType } from "vue";

defineProps({
  block: { type: Object as PropType<Block>, required: true },
});
</script>

<template>
  <h2 contenteditable>{{ block.content }}</h2>
</template>
