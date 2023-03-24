<script lang="ts">
/**
 * Chevron Right icon belonging to Lucide icon set ({@link https://lucide.dev}).
 * Obtained via Iconify ({@link https://icon-sets.iconify.design/lucide/chevron-right/})
 */
export default {};
</script>

<script setup lang="ts">
defineProps({ rotateDown: { type: Boolean, required: false, default: false } });
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
    class="icon__chevron"
    :class="{ 'icon__chevron--down': rotateDown }"
  >
    <path
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m9 18l6-6l-6-6"
    />
  </svg>
</template>
<style lang="scss">
.icon__chevron {
  transition: transform 0.2s ease-in-out;
  &--down {
    transform: rotate(90deg);
  }
}
</style>
