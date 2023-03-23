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
    <ChevronRightIcon class="icon" v-if="showIcon" />
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
}
</style>
