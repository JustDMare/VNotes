<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { ref } from "vue";

const { user, logout } = useAuth0();
const showDropdown = ref(false);

function handleLogout(): void {
  logout();
}
function toggleDropdown(): void {
  showDropdown.value = !showDropdown.value;
}
</script>

<template>
  <div class="user-dropdown">
    <button class="user-dropdown__button" v-show="user.name" @click="toggleDropdown">
      <img
        v-show="user.picture"
        :src="user.picture"
        alt="Profile image
    of the user"
        class="user-dropdown__button__image"
      />
      <span class="user-dropdown__button__name">{{ user.name }}</span>
    </button>
    <div class="user-dropdown__menu" v-show="showDropdown">
      <button class="user-dropdown__menu__option" @click="handleLogout">Logout</button>
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
    border-bottom: 1px solid var(--color-base-70);
    &:hover {
      background-color: var(--color-base-80);
    }
    &__image {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 8px;
    }
    &__name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-base-30);
    }
  }
  &__menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--color-base-100);
    z-index: 1;
    width: 100%;
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
      border-bottom: 1px solid var(--color-base-70);
      &:hover {
        background-color: var(--color-base-80);
        color: var(--color-base-10);
      }
    }
  }
}
</style>
