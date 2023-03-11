<script lang="ts" setup>
import { i18n } from "@/i18n/i18n.plugin";
import { localeValues, LOCALES, type Locale } from "@/i18n/i18n.types";
import { ref, toRef } from "vue";
import BaseDropdown from "./base/BaseDropdown.vue";

const i18nLocale = toRef(i18n.global, "locale");

const selectedLocaleCaption = ref(localeValues[i18nLocale.value].caption);
const MENU_MARGIN_FROM_BUTTON = 8;
const MENU_LEFT_DISPLACEMENT = 0.25;

function handleLocaleChange(locale: Locale) {
  i18nLocale.value = locale;
  selectedLocaleCaption.value = localeValues[locale].caption;
}
/*
<select v-model="$i18n.locale">
      <option v-for="locale in LOCALES" :key="locale" :value="locale">
        {{ localeValues[locale].caption }}
      </option>
    </select>
*/
</script>

<template>
  <div>
    <BaseDropdown
      :menu-margin-from-button-in-px="MENU_MARGIN_FROM_BUTTON"
      :menu-percentage-left-alignment="MENU_LEFT_DISPLACEMENT"
    >
      <template #button-content>
        <span>{{ selectedLocaleCaption }}</span>
      </template>
      <template #menu>
        <div v-for="locale in LOCALES" :key="locale">
          <button @click="handleLocaleChange(locale)">
            {{ localeValues[locale].caption }}
          </button>
        </div>
      </template>
    </BaseDropdown>
  </div>
</template>

<style lang="scss" scoped></style>
