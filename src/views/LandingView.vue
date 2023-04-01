<script lang="ts" setup>
import { useAuth0 } from "@auth0/auth0-vue";
import { LogInIcon } from "@/components/icons";
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
  <article>
    <header>
      <h1>VNotes</h1>
      <button @click="login">
        <LogInIcon /> <span>{{ $t("auth.login") }}</span>
      </button>
    </header>
    <main>
      <section>
        <p>
          VNotes is an intuitive and minimalistic writing app that draws inspiration from
          widely-used productivity tools like Notion, Craft, and Obsidian. The primary goal of
          VNotes is to provide users with a streamlined UI/UX, and focusing on simplicity and
          user-friendliness.
        </p>
        <p>
          VNotes was developed by Daniel Adrian Mare as part of his Final Degree Project at the
          University of Oviedo under the guidance of tutor José Manuel Redondo López.
        </p>
        <img src="@/assets/landing-image.png" alt="screenshot of the application" />
        <h2>Technologies</h2>
        <p>
          <span>
            The application has been divided into a traditional frontend-backend architecture using
            the technologies listed below. For a more comprehesive list on all the third party
            packages and their licensing, visit the
          </span>
          <a href="https://github.com/JustDMare/VNotes/blob/main/NOTICE">frontend Notice file </a>
          <span> and the </span>
          <a href="https://github.com/JustDMare/VNotes-Server/blob/main/NOTICE"
            >backend Notice file</a
          >
        </p>
        <h3>Frontend</h3>
        <ul>
          <li>Vuejs 3: Component library used to build the front of the application</li>
          <li>
            Typescript: Used for type checking across the application and across both the backend
            and frontend
          </li>
          <li>Vue-router: Vue's solution for routing</li>
          <li>Vue-i18n: Internationalization library for Vue applications</li>
          <li>Pinia: State management library created by the Vue team</li>
          <li>
            Sortablejs-vue: Library to easily implement drag n' drop sorting. Derived from
            Sortablejs and made for Vue 3 apps.
          </li>
          <li>Match-sorter: Enables search and sort functionality at a frontend level.</li>
        </ul>
        <p>Icons obtained via the Lucide icon set</p>
        <h3>Backend</h3>
        <p>
          The application uses auth0 for authentication and authorization, and MongoDB Atlas for the
          database
        </p>
        <ul>
          <li>Node v16</li>
          <li>Express</li>
          <li>Mongoose</li>
          <li>Typescript</li>
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
