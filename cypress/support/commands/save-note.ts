/**
 * Saves the changes of the note that is currently on display by clicking the save button.
 * Makes several assertions to make sure the saving UX works as intended.
 *
 * @returns {void}
 */
export function saveNoteCommand(): void {
  cy.get("[data-test='note-last-saved']")
    .invoke("text")
    .then((text) => {
      cy.wrap(text).as("noteLastSavedTime");
    });

  // The last saved date should be showing at all times, but not the saving animation
  cy.get("[data-test='note-saving-animation']").should("not.exist");
  cy.get("[data-test='note-last-saved']").should("exist");

  // Wait to make sure there is at least a difference of 1 second
  cy.wait(1000);

  // Clicking the save button
  cy.get("[data-test='note-save-btn']").should("exist").click();

  //After clicking the save button, the saving animation will show up
  cy.get("[data-test='note-saving-animation']").should("exist");
  cy.get("[data-test='note-last-saved']").should("not.exist");

  // After a short while, the saving animation should stop and show the new last saved date.
  cy.get("[data-test='note-saving-animation']").should("not.exist");
  cy.get("[data-test='note-last-saved']").should("exist");

  cy.get<string>("@noteLastSavedTime").then((noteLastSavedTime) => {
    cy.get("[data-test='note-last-saved']").invoke("text").should("not.equal", noteLastSavedTime);
  });
}
