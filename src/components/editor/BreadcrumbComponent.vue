<script lang="ts" setup>
import { ChevronRightIcon } from "../icons";

defineProps({
  name: {
    type: String,
    required: true,
  },
  showIcon: {
    type: Boolean,
    default: true,
    required: false,
  },
});
</script>

<template>
  <div class="breadcrumb">
    <span class="breadcrumb__text">{{ name }}</span>
    <ChevronRightIcon class="breadcrumb__icon" v-if="showIcon" />
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  flex-direction: row;
  align-items: center;
  &__text {
    font-size: 14px;
  }
  &__icon {
    color: var(--color-base-40);
  }
}
</style>
