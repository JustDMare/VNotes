describe("First Test", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
    cy.loginWithAuth0(Cypress.env("auth0_username"), Cypress.env("auth0_password"));
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000/workspace");
  });
  it("Visits the workspace", () => {
    cy.get(".empty-ws__title").contains("No note selected").should("exist");
    cy.get(".user-dropdown__profile-name").contains(Cypress.env("auth0_username")).should("exist");
    cy.contains("NoteA").click();
    cy.get("#note-editor__content__title").contains("NoteA").should("exist");
  });
  it("Creates a new note", () => {
    cy.get(".empty-ws__title").contains("No note selected").should("exist");
    cy.get(".user-dropdown__profile-name").contains(Cypress.env("auth0_username")).should("exist");
  });
});
