import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter } from "./router";
import { i18n } from "./i18n/i18n.plugin";
import { createAuth0 } from "@auth0/auth0-vue";
import type { Router } from "vue-router";

const app = createApp(App);

const router = createRouter(app);
const pinia = createPinia();

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router;
  }
}
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(pinia);
app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_AUTH0_REDIRECT_URI,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  })
);

app.use(i18n);

app.mount("#app");
