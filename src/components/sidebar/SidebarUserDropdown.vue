<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { computed, ref } from "vue";

const auth0 = useAuth0();
const showDropdown = ref(false);
const dropdownMenu = ref<HTMLElement | null>(null);
const dropdownButton = ref<HTMLElement | null>(null);

function handleLogout(): void {
  auth0.logout();
}

const authUser = computed(() => auth0.user.value);

function toggleDropdown(): void {
  showDropdown.value = !showDropdown.value;
  if (showDropdown.value) {
    document.addEventListener("mousedown", handleClickOutside);
  } else {
    document.removeEventListener("mousedown", handleClickOutside);
  }
}
function handleClickOutside(event: MouseEvent) {
  if (
    dropdownMenu.value &&
    !dropdownMenu.value.contains(event.target as Node) &&
    dropdownButton.value &&
    !dropdownButton.value.contains(event.target as Node)
  ) {
    toggleDropdown();
  }
}
</script>

<template>
  <div class="user-dropdown" v-if="authUser">
    <button
      class="user-dropdown__button"
      ref="dropdownButton"
      :title="$t('tooltips.userDropdownButton')"
      v-show="authUser.name"
      @click="toggleDropdown"
    >
      <img
        v-show="authUser.picture"
        :src="authUser.picture"
        referrerpolicy="no-referrer"
        :alt="$t('altText.userDropdownProfilePicture')"
        class="user-dropdown__button__image"
      />
      <span class="user-dropdown__button__name">{{ authUser.name }}</span>
    </button>
    <div class="user-dropdown__menu" ref="dropdownMenu" v-show="showDropdown">
      <button class="user-dropdown__menu__option" @click="handleLogout">
        {{ $t("auth.logout") }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-dropdown {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: transparent;
  height: 3.5rem;

  &__button {
    display: flex;
    align-items: center;
    align-self: flex-start;
    background-color: transparent;
    border: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
    background-color: var(--color-base-100);
    gap: 12px;
    transition: background-color 0.2s ease-in;
    &:hover {
      background-color: var(--color-base-80);
    }

    &__image {
      width: 28px;
      height: 28px;
      border-radius: 3px;
    }
    &__name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-base-30);
    }
  }
  &__menu {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: calc(100%);
    right: 0;
    background-color: var(--color-base-100);
    z-index: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--color-base-80);
    box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.2);

    &__option {
      display: flex;
      background-color: var(--color-base-100);
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 8px 16px;
      border: none;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--color-base-30);
      cursor: pointer;
      transition: all 0.2s ease-in;
      transition: background-color 0.2s ease-in;
      &:hover {
        background-color: var(--color-base-80);
        color: var(--color-base-10);
      }
    }
  }
}
</style>
