<script lang="ts">
/**
 * Wrapper component that adds a fade transition to its children.
 * @component FadeTransition
 */
export default {
  name: "FadeTransition",
};
</script>

<template>
  <Transition name="fade">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
