<script lang="ts" setup>
import type { Block } from "@/types";
import type { PropType } from "vue";
import BlockComponent from "./blocks/BlockComponent.vue";

defineProps({
  blockList: { type: Object as PropType<Block[]>, required: true },
});
</script>

<template>
  <BlockComponent
    v-for="block in blockList"
    :key="block.blockId"
    :block="block"
  ></BlockComponent>
</template>
