<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";
const { loginWithRedirect } = useAuth0();
function login() {
  loginWithRedirect({
    appState: {
      target: "/workspace",
    },
  });
}
</script>

<template>
  <div>
    <button @click="login">Login</button>
  </div>
</template>

<style lang="scss" scoped></style>
