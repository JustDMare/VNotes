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
  <header>
    <h1>VNotes</h1>
    <button @click="login">{{ $t("auth.login") }}</button>
  </header>
  <main>
    <p>
      VNotes is an intuitive and minimalistic writing app that draws inspiration from widely-used
      productivity tools like Notion, Craft, and Obsidian. The primary goal of VNotes is to provide
      users with a streamlined UI/UX, and focusing on simplicity and user-friendliness.
    </p>
    <p>
      VNotes was developed by Daniel Adrian Mare as part of his Final Degree Project at the
      University of Oviedo under the guidance of tutor José Manuel Redondo López.
    </p>
    <img src="@/assets/landing-image.png" alt="screenshot of the application" />
    <h2>Licenses</h2>
  </main>
</template>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  box-shadow: -8px 13px 43px 0px rgba(0, 0, 0, 0.03);
  background-color: var(--color-base-100);
  padding: 12px;
  h1 {
    grid-column: 2/2;
    justify-self: center;
  }
  button {
    grid-column: 3/3;
  }
}

main {
  display: flex;
  flex-direction: column;
  padding: 12px;
  max-width: 900px;
  margin: auto;
  gap: 12px;

  img {
    max-width: 900px;
    align-self: center;
  }
}
</style>
