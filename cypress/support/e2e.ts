/* eslint-disable @typescript-eslint/no-namespace */
import { loginWithAuth0Command } from "./commands/index";

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from "cypress/vue";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      loginWithAuth0: typeof loginWithAuth0Command;
    }
  }
}

Cypress.Commands.add("mount", mount);
Cypress.Commands.add("loginWithAuth0", loginWithAuth0Command);

before(() => {
  cy.loginWithAuth0(Cypress.env("auth0_username"), Cypress.env("auth0_password"));
});
