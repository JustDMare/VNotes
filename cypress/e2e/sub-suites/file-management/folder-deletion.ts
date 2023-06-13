/* eslint-disable max-len */
/**
 * This suite tests the deletion of folders.
 * The tests are divided into two sub-suites:
 * - Folder deletion of an empty folder
 * - Folder deletion of a folder with nested content.
 * @returns {void}
 */
export function folderDeletionSubSuite(): void {
  describe("Folder Deletion", () => {
    emptyFolderDeletion();
    folderWithNestedContentDeletion();
  });
}

/**
 * Tests the deletion of empty folders.
 * @returns {void}
 */
function emptyFolderDeletion(): void {
  describe("Deletion of empty folders", () => {
    beforeEach(() => {
      cy.get("[data-test='nav-folder']:visible")
        .its("length")
        .then((length) => {
          cy.wrap(length).as("folderCount");
        });
    });
    it("Deletes an empty folder with Enter key", () => {
      cy.contains("[data-test='nav-folder']", "CreatedFolder2").eq(0).as("folderToDelete");
      cy.get("@folderToDelete").should("exist");
      cy.get("@folderToDelete").trigger("mouseover");
      cy.get("@folderToDelete").within(() => {
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
          "be.visible"
        );
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-delete-folder']").click();
      });
      cy.get("[data-test='delete-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='delete-folder-dialog']").trigger("keydown", { key: "Enter" });
      cy.get<number>("@folderCount").then((folderCount) => {
        cy.get("[data-test='nav-folder']:visible")
          .its("length")
          .should("eq", folderCount - 1);
      });
    });
    it("Deletes an empty folder when clicking on the main button", () => {
      cy.contains("[data-test='nav-folder']", "CreatedFolder2").as("folderToDelete");
      cy.get("@folderToDelete").should("exist");
      cy.get("@folderToDelete").trigger("mouseover");
      cy.get("@folderToDelete").within(() => {
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
          "be.visible"
        );
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-delete-folder']").click();
      });
      cy.get("[data-test='delete-folder-dialog'] [data-test='base-dialog-main-button']").click();
      cy.get<number>("@folderCount").then((folderCount) => {
        cy.get("[data-test='nav-folder']:visible")
          .its("length")
          .should("eq", folderCount - 1);
      });
    });
  });
}

/**
 * Tests the deletion of folders with nested content.
 * @returns {void}
 */
function folderWithNestedContentDeletion(): void {
  describe("Deletion of a folder with nested content. The nested content should be deleted together with its parent folder", () => {
    beforeEach(() => {
      cy.contains("[data-test='nav-folder']", "CreatedFolder1").as("parentFolder");
      cy.get("@parentFolder").should("exist");
      cy.get("[data-test='nav-folder']:visible")
        .its("length")
        .then((length) => {
          cy.wrap(length).as("folderCount");
        });
    });
    it("Should have a nested folder", () => {
      cy.get("@parentFolder").click();
      cy.get("@parentFolder").within(() => {
        cy.get("[data-test='nav-folder']").contains("CreatedSubfolder1").should("exist");
      });
    });
    it("Should allow the deletion of a folder with nested content", () => {
      cy.get("@parentFolder").trigger("mouseover");
      cy.get("@parentFolder")
        .children("[data-test='nav-folder-content']")
        .within(() => {
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
            "be.visible"
          );
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-delete-folder']").click();
        });
      cy.get("[data-test='delete-folder-dialog'] [data-test='base-dialog-main-button']").click();

      cy.get<number>("@folderCount").then((folderCount) => {
        cy.get("[data-test='nav-folder']:visible")
          .its("length")
          .should("eq", folderCount - 2);
      });
      cy.get("@parentFolder").should("not.exist");
      cy.contains("[data-test='nav-folder']", "CreatedSubfolder1").should("not.exist");
    });
  });
}
