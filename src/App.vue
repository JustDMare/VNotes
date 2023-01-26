<script setup lang="ts">
import { RouterView } from "vue-router";
import { useEditorStore } from "./stores/editor";
import { useUserSpaceStore } from "./stores/user-space";

useUserSpaceStore(); //Needed so the store is initialized\
useEditorStore(); //Needed so the store is initialized
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "@/design/base.scss";
@import "@/design/tokens.scss";

#app {
  height: 100%;
}
</style>
