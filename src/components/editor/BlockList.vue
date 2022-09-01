<script lang="ts" setup>
import { noteBlocks } from "@/mock-data/note-mock";
import BlockComponent from "./blocks/BlockComponent.vue";
</script>

<template>
  <BlockComponent
    v-for="block in noteBlocks.content"
    :key="block.blockId"
    :block="block"
  ></BlockComponent>
</template>
