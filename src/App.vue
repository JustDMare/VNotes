<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
:root {
  --font-sans: Roboto, sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  position: relative;
  font-weight: normal;
}

html {
  height: 100vh;
}

body {
  line-height: 1.6;
  background-color: var(--color-background);
  font-family: var(--font-sans);
  font-size: 16px;
  height: 100%;

  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  height: 100%;
}
</style>
