/* eslint-disable max-len */
/**
 * This suite tests creation of blocks within a note
 * The tests will cover the following scenarios:
 * - Creating a new block with the "Enter" key:
 *    - Below the title
 *    - With the cursor placed at the end of a block
 *    - With the cursor placed anywhere on a block
 * - With the dedicated button.
 *   These scenarios will also be designed to verify that the blocks are actually created
 *   below the originally focused block, instead of just at the end of the list.
 * @returns {void}
 */
export function blockCreationSubSuite(): void {
  describe("Block creation in a note", () => {
    before(() => {
      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("exist").click();
    });
    it("Creates a block below the title, and at the start of the block list, when pressing Enter while the title is focused", () => {
      cy.get("[data-test='block-wrapper']").first().should("contain", "Block 2");
      cy.get("[data-test='note-title']").type("{enter}");
      cy.get(":focus").type("Block 1");
      cy.get("[data-test='block-wrapper']")
        .first()
        .should("contain", "Block 1")
        .next()
        .should("contain", "Block 2");
    });
    it("Places the focus at the end of a block. Then creates a new block right below with the 'Enter' key.", () => {
      cy.contains("[data-test='block-content']", "Block 2").click();
      cy.get(":focus").type("{enter}Block 6");
      cy.get("[data-test='block-wrapper']")
        .eq(1)
        .should("contain", "Block 2")
        .next()
        .should("contain", "Block 6");
    });
    it("Places the focus at the start of a block. Then creates a new block right below with the 'Enter' key.", () => {
      cy.contains("[data-test='block-content']", "Block 2").click();
      cy.get(":focus").type("{home}{enter}Block 5");
      cy.get("[data-test='block-wrapper']")
        .eq(1)
        .should("contain", "Block 2")
        .next()
        .should("not.contain", "Block 6")
        .should("contain", "Block 5")
        .next()
        .should("contain", "Block 6");
    });
    it("Places the focus in the middle of a block. Then creates a new block right below with the 'Enter' key.", () => {
      cy.contains("[data-test='block-content']", "Block 2").click();
      cy.get(":focus").type("{leftarrow}{leftarrow}{leftarrow}{enter}Block 4");
      cy.get("[data-test='block-wrapper']")
        .eq(1)
        .should("contain", "Block 2")
        .next()
        .should("not.contain", "Block 5")
        .should("contain", "Block 4")
        .next()
        .should("contain", "Block 5");
    });
    it("Uses the 'Create new block' button, which creates a new block below the one whose button was pressed", () => {
      cy.contains("[data-test='block-wrapper']", "Block 2")
        .find("[data-test='add-block-btn']")
        .click();
      cy.get(":focus").type("Block 3");
      cy.get("[data-test='block-wrapper']")
        .eq(1)
        .should("contain", "Block 2")
        .next()
        .should("not.contain", "Block 4")
        .should("contain", "Block 3")
        .next()
        .should("contain", "Block 4");
    });
  });
}
