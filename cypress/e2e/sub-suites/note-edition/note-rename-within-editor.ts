/* eslint-disable max-len */
/**
 * This suite tests the renaming of the note from within the note.
 * The tests will cover the following scenarios:
 * - Note renamed
 * - Note renamed to empty title (should be defaulted to "Untitled")
 * @returns {void}
 */
export function noteRenamingWithinEditorSubSuite(): void {
  describe("Note Renaming Within Editor", () => {
    before(() => {
      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("exist").click();
    });
    it("Allows the renaming of the note by writing on the title and then saving the note's contents", () => {
      cy.get("[data-test='nav-item-list']")
        .children(":contains('NoteRenamed')")
        .should("not.exist");
      cy.get("[data-test='note-title']")
        .should("contain.text", "NoteA")
        .clear()
        .type("NoteRenamed");
      cy.saveNoteChanges();
      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("not.exist");
      cy.get("[data-test='nav-item-list']").children(":contains('NoteRenamed')").should("exist");
    });
    it("Allows to assign an empty name to the title, which is then set as 'Untitled' by the system", () => {
      cy.get("[data-test='nav-item-list']").children(":contains('Untitled')").should("not.exist");
      cy.get("[data-test='note-title']").should("contain.text", "NoteRenamed").clear();
      cy.saveNoteChanges();
      cy.get("[data-test='nav-item-list']")
        .children(":contains('NoteRenamed')")
        .should("not.exist");
      cy.get("[data-test='nav-item-list']").children(":contains('Untitled')").should("exist");
    });
    it("Assigns the title of the note back to its original one. Saves the note with the keyboard shortcut instead", () => {
      cy.get("[data-test='note-last-saved']")
        .invoke("text")
        .then((text) => {
          cy.wrap(text).as("noteLastSavedTime");
        });

      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("not.exist");
      cy.get("[data-test='note-title']").should("contain.text", "Untitled").clear().type("NoteA");

      // The last saved date should be showing at all times, but not the saving animation
      cy.get("[data-test='note-saving-animation']").should("not.exist");
      cy.get("[data-test='note-last-saved']").should("exist");

      //Save the note using the keyboard shortcut
      if (Cypress.platform === "darwin") {
        cy.get("[data-test='note-title']").type("{meta}s");
      } else if (Cypress.platform === "win32" || Cypress.platform === "linux") {
        cy.get("[data-test='note-title']").type("{ctrl}s");
      }

      //After using the saving shortcut, the saving animation will show up
      cy.get("[data-test='note-saving-animation']").should("exist");
      cy.get("[data-test='note-last-saved']").should("not.exist");

      // After a short while, the saving animation should stop and show the new last saved date.
      cy.get("[data-test='note-saving-animation']").should("not.exist");
      cy.get("[data-test='note-last-saved']").should("exist");

      cy.get<string>("@noteLastSavedTime").then((noteLastSavedTime) => {
        cy.get("[data-test='note-last-saved']")
          .invoke("text")
          .should("not.equal", noteLastSavedTime);
      });

      cy.get("[data-test='nav-item-list']").children(":contains('Untitled')").should("not.exist");
      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("exist");
    });
  });
}
