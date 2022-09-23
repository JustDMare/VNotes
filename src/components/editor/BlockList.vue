<script lang="ts" setup>
import type { Block } from "@/types";
import { onMounted, ref, type PropType } from "vue";
import BlockComponent from "./blocks/BlockComponent.vue";

const props = defineProps({
  blockList: { type: Object as PropType<Block[]>, required: true },
});
const blocks = ref(props.blockList);
const itemRefs = ref([]);
onMounted(() => {
  console.log(itemRefs.value[1] );
});
</script>

<template>
  <BlockComponent
    v-for="(block, index) in blocks"
    :key="block.blockId"
    :block="block"
    ref="itemRefs"
    :index="index"
  ></BlockComponent>
</template>
