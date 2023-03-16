<script lang="ts" setup></script>

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
