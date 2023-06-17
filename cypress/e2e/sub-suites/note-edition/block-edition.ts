/* eslint-disable max-len */
/**
 * This suite tests text edition of blocks within a note
 * The tests will cover the following scenarios:
 * - Showing the placeholder text when the block is empty:
 *    - Newly created
 *    - Content was deleted
 * - Writing text on a block and being properly displayed.
 * - Writing multi-line text on a block and being properly displayed.
 * @returns {void}
 */
export function blockEditionSubSuite(): void {
  describe("Block edition in a note. Creates a new block at the end of the list for these tests", () => {
    before(() => {
      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("exist").click();
      cy.get("[data-test='block-wrapper']").last().trigger("mouseover");
      cy.get("[data-test='block-wrapper']").last().find("[data-test='add-block-btn']").click();
    });

    beforeEach(() => {
      cy.get("[data-test='block-wrapper']")
        .last()
        .find("[data-test='block-content']")
        .as("newBlock")
        .focus();
    });

    it("Verifies that the newly created block is showing the placeholder, as it is empty", () => {
      cy.get("@newBlock").then(($el) => {
        const beforeStyle = window.getComputedStyle($el[0], "::before");
        const content = beforeStyle.getPropertyValue("content");
        expect(content).to.contain("Type '/' for commands");
      });
    });
    it("Writes text in the block, which makes the placeholder disappear", () => {
      cy.get("@newBlock").type("Content for the block");
      cy.get("@newBlock").then(($el) => {
        const beforeStyle = window.getComputedStyle($el[0], "::before");
        const content = beforeStyle.getPropertyValue("content");
        expect(content).to.equal("none");
      });
    });
    it("Clears the text from the block, which makes the placeholder to show up again", () => {
      cy.get("@newBlock").clear();
      cy.get("@newBlock").then(($el) => {
        const beforeStyle = window.getComputedStyle($el[0], "::before");
        const content = beforeStyle.getPropertyValue("content");
        expect(content).to.contain("Type '/' for commands");
      });
    });
    it("Allows the insertion of new lines to the block with 'Shift + Enter' as long as the block is not empty", () => {
      cy.get("@newBlock").type("{shift}{enter}");
      cy.get("@newBlock").then(($el) => {
        const beforeStyle = window.getComputedStyle($el[0], "::before");
        const content = beforeStyle.getPropertyValue("content");
        expect(content).to.contain("Type '/' for commands");
      });
      cy.get("@newBlock").should(($el) => {
        const text = $el.text();
        expect(text.split("\n")).to.have.lengthOf(1);
      });

      cy.get("@newBlock").type("First line");
      cy.get("@newBlock").should(($el) => {
        const text = $el.text();
        expect(text.split("\n")).to.have.lengthOf(1);
      });

      cy.get("@newBlock").type("{shift}{enter}Second line");
      cy.get("@newBlock").should(($el) => {
        const text = $el.text();
        expect(text.split("\n")).to.have.lengthOf(2);
      });

      cy.get("@newBlock").type("{shift}{enter}Third line");
      cy.get("@newBlock").should(($el) => {
        const text = $el.text();
        expect(text.split("\n")).to.have.lengthOf(3);
      });
    });
  });
}
