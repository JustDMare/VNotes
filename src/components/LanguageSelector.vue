<script lang="ts" setup>
import { localeValues, LOCALES } from "@/i18n/i18n.types";
</script>

<template>
  <div class="language-selector">
    <select tabindex="0" v-model="$i18n.locale">
      <option v-for="locale in LOCALES" :key="locale" :value="locale">
        {{ localeValues[locale].caption }}
      </option>
    </select>
  </div>
</template>

<style lang="scss" scoped></style>
