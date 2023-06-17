/* eslint-disable max-len */
/**
 * This suite tests text edition of blocks within a note The test will cover the scenario
 * of rearranging a block by drag-and-dropping with the grip button assignated to each block.
 */
export function blockRearrangementSubSuite(): void {
  describe("Block edition in a note. Creates a new block at the end of the list for these tests", () => {
    before(() => {
      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("exist").click();
    });

    beforeEach(() => {
      cy.get("[data-test='block-wrapper']").last().as("blockToMove").trigger("mouseover");
    });

    it("Verifies that the newly created block is showing the placeholder, as it is empty", () => {
      cy.get("@blockToMove").invoke("position").as("initialPosition");
      cy.get("@blockToMove")
        .find("[data-test='move-block-btn']")
        .trigger("mousedown", { button: 0 });
      cy.wait(500); // Wait for half a second
      cy.get("@blockToMove")
        .find("[data-test='move-block-btn']")
        .trigger("mousemove", { clientX: 0, clientY: -200, force: true });

      // Simulate a mouse up event to drop the block
      cy.get("@blockToMove").trigger("mouseup", { force: true });
      cy.get("@blockToMove").invoke("position").as("newPosition");

      // Assert that the block has been dragged to a new position
      cy.get("@newPosition").should("not.equal", "@initialPosition");
    });
  });
}
