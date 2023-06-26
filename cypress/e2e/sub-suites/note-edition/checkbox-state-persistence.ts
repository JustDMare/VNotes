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
    it("Checks the checkbox. Checkbox are unchecked by default", () => {
      // Converts the plain text block into a checkbox block
      cy.get("@block").should("have.class", "block__content--text");
      cy.get("@block").should("not.have.class", "block__content--checkbox__text");
      cy.get("@block").type("/checkbox{enter}");
      cy.get("@block").should("not.have.class", "block__content--text");
      cy.get("@block").should("have.class", "block__content--checkbox__text");

      // The checkbox should be unchecked by default
      cy.get("@blockWrapper").find("[data-test='block-checkbox']").should("not.be.checked");
      cy.get("@block").should("not.have.class", "block__content--checkbox__text--checked");

      // Check the checkbox
      cy.get("@blockWrapper").find("[data-test='block-checkbox']").click();

      // The checkbox should be checked
      cy.get("@block").should("have.class", "block__content--checkbox__text--checked");
      cy.get("@blockWrapper").find("[data-test='block-checkbox']").should("be.checked");
    });
    it("Transforms the checkbox into a different block, then back again into a checkbox and verifies that the state of the checkbox has not changed (checked)", () => {
      // The checkbox should be checked
      cy.get("@block").should("have.class", "block__content--checkbox__text--checked");
      cy.get("@blockWrapper").find("[data-test='block-checkbox']").should("be.checked");

      // Converts the checked checkbox block into a plain text block
      cy.get("@block").type("/{enter}");
      cy.get("@block").should("have.class", "block__content--text");
      cy.get("@block").should("not.have.class", "block__content--checkbox__text");
      cy.get("@block").should("not.have.class", "block__content--checkbox__text--checked");

      // Converts the plain text block back into a checkbox block
      cy.get("@block").type("/checkbox{enter}");
      cy.get("@block").should("not.have.class", "block__content--text");
      cy.get("@block").should("have.class", "block__content--checkbox__text");

      // The checkbox should be checked once again, without having to click it
      cy.get("@block").should("have.class", "block__content--checkbox__text--checked");
      cy.get("@blockWrapper").find("[data-test='block-checkbox']").should("be.checked");
    });
  });
}
