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
  });
}
