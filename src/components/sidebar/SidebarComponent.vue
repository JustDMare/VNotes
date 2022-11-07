<script setup lang="ts">
import { ref, type Ref } from "vue";
import SidebarNavigation from "./navigation/SidebarNavigation.vue";

const sidebar: Ref<HTMLDivElement | null> = ref(null);
defineExpose({ sidebar });
</script>

<template>
  <aside ref="sidebar" id="sidebar">
    <SidebarNavigation />
  </aside>
</template>

<style scoped lang="scss">
#sidebar {
  background-color: var(--color-base-90);
  box-shadow: -1px 0px 2px rgba(0, 0, 0, 0.08) inset;
}
</style>
