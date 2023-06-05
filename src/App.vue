<script setup lang="ts">
import { RouterView } from "vue-router";
import { useEditorStore } from "./stores/editor";
import { useUserSpaceStore } from "./stores/user-space";
import { useEventStore } from "./stores/event";

useUserSpaceStore(); //Needed so the store is initialized\
useEditorStore(); //Needed so the store is initialized
useEventStore(); //Needed so the store is initialized
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
