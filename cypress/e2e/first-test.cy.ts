describe("First Test", () => {
  it("Visits the workspace", () => {
    cy.visit("http://localhost:3000/workspace");
    cy.get(".empty-ws__title").should("exist");
  });
});
