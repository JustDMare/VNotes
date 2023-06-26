/* eslint-disable max-len */
/**
 * This suite tests the deletion of blocks.
 * The tests  will cover the following scenarios:
 * - Deletion via keyboard shortcut (Ctrl+Backspace / Cmd + Backspace)
 * - Deletion with the command palette -> Delete block command
 * - Deletion via pressing backspace when the block is empty, like deleting a paragraph.
 *
 * @returns {void}
 */
export function blockDeletionSubSuite(): void {
  describe("Block deletion in a note", () => {
    before(() => {
      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("exist").click();
      cy.get("[data-test='block-content']").eq(-2).click();
    });
    beforeEach(() => {
      cy.get(":focus").as("focusedBlock");
      cy.get("[data-test='block-content']")
        .its("length")
        .then((length) => {
          cy.wrap(length).as("blockCount");
        });
      cy.get("@focusedBlock")
        .invoke("text")
        .then((text) => {
          cy.wrap(text).as("previousBlockText");
        });
    });
    afterEach(() => {
      // Check that the list of blocks has one less block than before
      cy.get<number>("@blockCount").then((blockCount) => {
        cy.get("[data-test='block-content']")
          .its("length")
          .should("eq", blockCount - 1);
      });

      // Check that the block that was focused before the deletion is not the same as the one that is focused after the deletion
      cy.get<string>("@previousBlockText").then((previousBlockText) => {
        cy.get("@focusedBlock").invoke("text").should("not.equal", previousBlockText);
      });
    });

    it("Allows the deletion of a block via keyboard shortcut", () => {
      cy.get("@focusedBlock").should("not.have.text", "");
      if (Cypress.platform === "darwin") {
        cy.get("@focusedBlock").type("{meta}{backspace}");
      } else if (Cypress.platform === "win32" || Cypress.platform === "linux") {
        cy.get("@focusedBlock").type("{ctrl}{backspace}");
      }
    });

    it("Allows the deletion of a block via the command palette's 'Delete block' command", () => {
      cy.get("@focusedBlock").should("not.have.text", "");
      cy.get("@focusedBlock").type("/Delete{enter}");
    });

    it("Allows the deletion of a block by pressing 'backspace' when the block is empty", () => {
      cy.get("@focusedBlock").should("not.have.text", "");
      cy.get("@focusedBlock").type("{backspace}");

      cy.get<number>("@blockCount").then((blockCount) => {
        cy.get("[data-test='block-content']").its("length").should("eq", blockCount);
      });
      cy.get("@focusedBlock").clear();
      cy.get("@focusedBlock").type("{backspace}");
    });
  });
}
