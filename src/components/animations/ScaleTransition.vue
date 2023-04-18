<script lang="ts">
/**
 * Wrapper component that adds a scale transition to its children.
 * @component ScaleTransition
 */
export default {
  name: "ScaleTransition",
};
</script>

<template>
  <Transition name="scale">
    <slot></slot>
  </Transition>
</template>

<style lang="scss" scoped>
.scale-enter-active,
.scale-leave-active {
  transition: scale 0.05s ease-in-out;
}

.scale-enter-from,
.scale-leave-to {
  scale: 0.75;
}
</style>
