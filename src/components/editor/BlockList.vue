<script lang="ts" setup>
import type { Block } from "@/types";
import { ref, type PropType } from "vue";
import BlockComponent from "./blocks/BlockComponent.vue";

const props = defineProps({
  blockList: { type: Object as PropType<Block[]>, required: true },
});
const blocks = ref(props.blockList);
</script>

<template>
  <BlockComponent
    v-for="block in blocks"
    :key="block.blockID"
    :block="block"
  ></BlockComponent>
</template>
