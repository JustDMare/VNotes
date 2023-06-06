describe("First Test", () => {
  it("Visits the landing page", () => {
    cy.visit("http://localhost:3000/workspace");
    cy.url().should("include", "localhost:3000/workspace");
  });
});
