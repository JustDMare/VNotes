import { folderCreationSubSuite, folderDeletionSubSuite } from "./sub-suites/file-management";
import { folderRelocationSubSuite } from "./sub-suites/file-management/folder-relocation";

/* eslint-disable max-len */
describe("File Management Tests", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
    cy.loginWithAuth0(Cypress.env("auth0_username"), Cypress.env("auth0_password"));
  });
  folderCreationSubSuite();
  folderDeletionSubSuite();
  folderRelocationSubSuite();
});
