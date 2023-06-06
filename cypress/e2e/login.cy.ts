describe("First Test", () => {
  it("Visits the landing page", () => {
    // Login on Auth0.
    cy.loginWithAuth0(Cypress.env("auth0_username"), Cypress.env("auth0_password"));
  });
});
