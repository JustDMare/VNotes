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
        <p>{{ $t("landingPage.appDescription") }}</p>
        <p>{{ $t("landingPage.developedBy") }}</p>
        <img src="@/assets/landing-image.png" :alt="$t('landingPage.appScreenshotAlt')" />
        <h2 class="landing__body__title2">{{ $t("landingPage.technologies.title") }}</h2>
        <p>
          <span> {{ $t("landingPage.technologies.notice.part1") }}</span>
          <a class="link" href="https://github.com/JustDMare/VNotes/blob/main/NOTICE">
            {{ $t("landingPage.technologies.notice.part2") }}
          </a>
          <span>{{ $t("landingPage.technologies.notice.part3") }}</span>
          <a class="link" href="https://github.com/JustDMare/VNotes-Server/blob/main/NOTICE">
            {{ $t("landingPage.technologies.notice.part4") }}
          </a>
          <span>{{ $t("landingPage.technologies.notice.part5") }}</span>
        </p>
        <h3>{{ $t("landingPage.technologies.frontend.title") }}</h3>
        <ul class="technology-list">
          <li v-for="(item, index) in $tm('landingPage.technologies.frontend.list')" :key="index">
            <span class="list-item--bold">{{ item.name }}: </span>{{ item.description }}
          </li>
        </ul>
        <p>{{ $t("landingPage.technologies.frontend.iconSet") }}</p>
        <h3>
          {{ $t("landingPage.technologies.backend.title") }}
        </h3>
        <ul class="technology-list">
          <li v-for="(item, index) in $tm('landingPage.technologies.backend.list')" :key="index">
            <span class="list-item--bold">{{ item.name }}: </span>{{ item.description }}
          </li>
        </ul>
      </section>
    </main>
  </article>
</template>

<style lang="scss" scoped>
.landing {
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 100%;
  overflow-y: auto;
  &__header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-items: end; /* Aligns grid items to the start (left) */
    align-items: center;
    box-shadow: -8px 13px 43px 0px rgba(0, 0, 0, 0.03);
    background-color: var(--color-base-100);
    padding: 1rem 2rem;
    &__lang-selector {
      grid-column: 1/1;
      justify-self: start;
    }
    h1 {
      grid-column: 2/2;
      justify-self: center;
    }
    button {
      grid-column: 3/3;
      font-size: 16px;
      justify-self: end;
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
    .landing__body {
      display: flex;
      flex-direction: column;
      padding: 2rem 1rem 1rem;
      max-width: 800px;
      margin: auto;
      gap: 12px;
      img {
        max-width: inherit;
        padding: 1rem;
        align-self: center;
      }
      .link {
        color: var(--color-link);
        text-decoration: underline;

        &:visited {
          color: var(--color-base-40);
        }
        &:hover {
          text-decoration: underline;
        }
      }
      .technology-list {
        display: flex;
        flex-direction: column;
        row-gap: 6px;
        .list-item--bold {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
