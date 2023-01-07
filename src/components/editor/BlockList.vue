<script lang="ts" setup>
import type { Block } from "vnotes-types";
import type { PropType } from "vue";
import BlockComponent from "./blocks/BlockComponent.vue";

defineProps({
  blockList: { type: Object as PropType<Block[]>, required: true },
});
</script>

<template>
  <BlockComponent
    v-for="block in blockList"
    :key="block._id"
    :block="block"
  ></BlockComponent>
</template>
