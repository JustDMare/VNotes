<script lang="ts" setup></script>

<template>
  <article class="empty-ws">
    <h1 class="empty-ws__title">{{ $t("emptyWorkspace.title") }}</h1>
    <p class="empty-ws__text">{{ $t("emptyWorkspace.subtitle") }}</p>
  </article>
</template>

<style lang="scss" scoped>
.empty-ws {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: var(--color-base-90);
  &__title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-base-20);
  }
  &__text {
    font-size: 1rem;
    font-weight: 400;
    color: var(--color-base-30);
  }
}
</style>
