<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { computed } from "vue";
import BaseDropdownRelativePosition from "../base/BaseDropdownRelativePosition.vue";

const auth0 = useAuth0();

function handleLogout(): void {
  auth0.logout();
}

const authUser = computed(() => auth0.user.value);
</script>

<template>
  <BaseDropdownRelativePosition class="user-dropdown" v-if="authUser">
    <template #button-content>
      <img
        v-show="authUser.picture"
        :src="authUser.picture"
        referrerpolicy="no-referrer"
        :alt="$t('altText.userDropdownProfilePicture')"
        class="user-dropdown__profile-picture"
      />
      <span class="user-dropdown__profile-name">{{ authUser.name }}</span>
    </template>
    <template #menu>
      <button class="user-dropdown__option" @click="handleLogout">
        {{ $t("auth.logout") }}
      </button>
    </template>
  </BaseDropdownRelativePosition>
</template>

<style lang="scss" scoped>
.user-dropdown {
  &__profile-picture {
    width: 28px;
    height: 28px;
    border-radius: 3px;
  }
  &__profile-name {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-base-20);
  }
  &__option {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
    border: none;
    font-size: 12px;
    font-weight: 500;
    background-color: var(--color-base-100);
    color: var(--color-base-20);
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: var(--color-base-80);
      color: var(--color-base-10);
    }
  }

  :deep(.base-dropdown__button) {
    height: 3.5rem;
    padding: 8px 16px;
    gap: 12px;
    transition: background-color 0.2s ease-in;
    background-color: var(--color-base-100);
    &:hover {
      background-color: var(--color-base-80);
    }
  }

  :deep(.base-dropdown__menu) {
    width: 100%;
    border-bottom: 1px solid var(--color-base-80);
    box-shadow: 0px 12px 12px 0px rgba(0, 0, 0, 0.2);
  }
}
</style>
