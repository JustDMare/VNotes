<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { LogInIcon } from "@/components/icons";
import LanguageSelector from "@/components/LanguageSelector.vue";
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
  <article class="landing">
    <header class="landing__header">
      <LanguageSelector class="landing__header__lang-selector" />
      <h1 class="landing__header__title">VNotes</h1>
      <button class="landing__header__login-btn" @click="login">
        <LogInIcon class="login-btn__icon" />
        <span class="login-btn__text">{{ $t("auth.login") }}</span>
      </button>
    </header>
    <main>
      <section class="landing__body">
        <p class="landing__body__paragraph">
          VNotes is an intuitive and minimalistic writing app that draws inspiration from
          widely-used productivity tools like Notion, Craft, and Obsidian. The primary goal of
          VNotes is to provide users with a streamlined UI/UX, and focusing on simplicity and
          user-friendliness.
        </p>
        <p class="landing__body__paragraph">
          VNotes was developed by Daniel Adrian Mare as part of his Final Degree Project at the
          University of Oviedo under the guidance of tutor José Manuel Redondo López.
        </p>
        <img src="@/assets/landing-image.png" alt="screenshot of the application" />
        <h2 class="landing__body__title2">Technologies</h2>
        <p class="landing__body__paragraph">
          <span>
            The application has been divided into a traditional frontend-backend architecture using
            the technologies listed below. For a more comprehesive list on all the third party
            packages and their licensing, visit the
          </span>
          <a href="https://github.com/JustDMare/VNotes/blob/main/NOTICE">frontend NOTICE file </a>
          <span> and the </span>
          <a href="https://github.com/JustDMare/VNotes-Server/blob/main/NOTICE"
            >backend NOTICE file</a
          >
        </p>
        <h3 class="landing__body__title3">Frontend</h3>
        <ul>
          <li>Vue.js 3: Component library used to build the front of the application.</li>
          <li>
            Typescript: Used for type checking across the front and for backend-frontend
            communication.
          </li>
          <li>Vue-router: Vue's solution for routing</li>
          <li>Vue-i18n: Internationalization library for Vue applications.</li>
          <li>Pinia: State management library created by the Vue team.</li>
          <li>
            Sortablejs-vue: Library to easily implement drag n' drop sorting. Derived from
            Sortablejs and made for Vue 3 apps.
          </li>
          <li>Match-sorter: Enables simple search and sort functionalities.</li>
        </ul>
        <p>Icons obtained via the Lucide icon set</p>
        <h3 class="landing__body__title3">Backend</h3>
        <p class="landing__body__paragraph">
          The application uses Auth0 for authentication and authorization, and MongoDB Atlas for the
          database
        </p>
        <ul>
          <li>Node.js v16: Runtime that allows the use of Javascript for backend development.</li>
          <li>Express.js: Lightweight framework used for the creation of the backend API</li>
          <li>Mongoose: ODM library used to interact with MongoDB from the server</li>
          <li>
            Typescript: Used mainly to typecheck the Mongoose models and make sure they are
            compatible with the frontend
          </li>
        </ul>
      </section>
    </main>
  </article>
</template>

<style lang="scss" scoped>
article {
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 100%;
  overflow-y: auto;
}
header {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  justify-items: end; /* Aligns grid items to the start (left) */
  align-items: center; /* Aligns grid items to the center (vertically) */
  box-shadow: -8px 13px 43px 0px rgba(0, 0, 0, 0.03);

  background-color: var(--color-base-100);
  padding: 12px;
  h1 {
    grid-column: 2/2;
    justify-self: center;
  }
  button {
    grid-column: 3/3;
    font-size: 16px;
    align-self: center;
    //Could be turned into a button--primary class
    justify-content: center;
    display: flex;
    align-items: center;
    background: var(--color-base-100);
    color: var(--color-text);
    border: 1px solid var(--color-base-80);
    border-radius: 4px;
    gap: 6px;
    padding: 6px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: var(--color-base-80);
      color: var(--x=color-base-0);
    }
    &:active {
      transform: scale(0.95);
    }
    span {
      font-size: inherit;
    }
    svg {
      width: 16px;
      height: 16px;
      align-self: center;
    }
  }
}

main {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  section {
    display: flex;
    flex-direction: column;
    padding: 12px;
    max-width: 900px;
    margin: auto;
    gap: 12px;
  }
  img {
    max-width: 900px;
    align-self: center;
  }
}
</style>
