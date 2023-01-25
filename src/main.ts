import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import { createRouter } from "./router";
import { i18n } from "./i18n/i18n.plugin";
import { createAuth0 } from "@auth0/auth0-vue";

const app = createApp(App);
app.use(createPinia());
const router = createRouter(app);
app.use(router);
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    },
  })
);
app.use(i18n);

app.mount("#app");
