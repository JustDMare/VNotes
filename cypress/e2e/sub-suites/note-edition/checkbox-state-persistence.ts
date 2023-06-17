/* eslint-disable max-len */
/**
 * This sub-suite tests if the state of a checkbox is preserved after changing the block to a
 * different type.
 *
 * @returns {void}
 */
export function checkboxStatePersistenceSubsuite(): void {
  describe("Tests to verify if the state of the checkbox is preserved after changing the block to a different type", () => {
    beforeEach(() => {
      cy.get("[data-test='block-content']").first().as("block");
      cy.get("[data-test='block-wrapper']").first().as("blockWrapper");
    });
    it("Checks the checkbox", () => {
      cy.get("@block").should("have.class", "block__content--text");
      cy.get("@block").should("not.have.class", "block__content--checkbox__text");
      cy.get("@block").type("/checkbox{enter}");
      cy.get("@block").should("not.have.class", "block__content--text");
      cy.get("@block").should("have.class", "block__content--checkbox__text");
      cy.get("@block").should("not.have.class", "block__content--checkbox__text--checked");

      cy.get("@blockWrapper").find("[data-test='block-checkbox']").click();
      cy.get("@block").should("have.class", "block__content--checkbox__text--checked");
    });
  });
}
