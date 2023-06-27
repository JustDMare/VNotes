import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  env: {
    auth0_username: process.env.CYPRESS_AUTH0_USERNAME,
    auth0_password: process.env.CYPRESS_AUTH0_PASSWORD,
    auth0_domain: process.env.VITE_AUTH0_DOMAIN,
    auth0_audience: process.env.VITE_AUTH0_AUDIENCE,

    auth0_client_id: process.env.VITE_AUTH0_CLIENT_ID,
    auth0_client_secret: process.env.VITE_AUTH0_CLIENT_SECRET,
    auth0_scope: process.env.VITE_AUTH0_SCOPE,
  },
  e2e: {
    testIsolation: false,
    experimentalStudio: true,
    defaultCommandTimeout: 7500,
  },
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
