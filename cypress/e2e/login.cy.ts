describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});

describe("First Test", () => {
  it("Visits the landing page", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Sign in");
    cy.get(".landing__header__login-btn").click();
    cy.url().should("include", "/commands/actions");
  });
});
