/* eslint-disable max-len */
import { noteRenamingWithinEditorSubSuite } from "./sub-suites/note-edition/note-rename-within-editor";

/* eslint-disable max-len */
describe("Note Edition Tests", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
    cy.loginWithAuth0(Cypress.env("auth0_username"), Cypress.env("auth0_password"));
  });
  noteRenamingWithinEditorSubSuite();
});
