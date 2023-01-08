<script setup lang="ts">
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useUserSpaceStore } from "./stores/user-space";

const userSpaceStore = useUserSpaceStore();

onMounted(() => {
  userSpaceStore.fetchAllUserSpaceContent();
});
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
