describe("First Test", () => {
  it("Visits the workspace", () => {
    cy.visit("http://localhost:3000/workspace");

    cy.get(".empty-ws__title").contains("No note selected").should("exist");
    cy.get(".user-dropdown__profile-name").contains(Cypress.env("auth0_username")).should("exist");
  });
});
