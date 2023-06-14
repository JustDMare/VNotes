/* eslint-disable max-len */
/**
 * This suite tests the relocation of a folder to a different parent folder.
 * The tests will cover the following scenarios:
 * - Relocation of a folder to the root directory.
 * - Relocation of a folder to an existing folder.
 * - Relocation of a folder with nested content.
 * - The folder is not allowed to relocate to itself or any of its subfolders.
 * @returns {void}
 */
export function folderRelocationSubSuite(): void {
  describe("Folder Relocation", () => {
    emptyFolderRelocationBetweenParentAndRoot();
  });
}

/**
 * Tests the relocation of a subfolder to the root directory. Then tests the relocation of
 * that folder from root to its original parent folder.
 * @returns {void}
 */
function emptyFolderRelocationBetweenParentAndRoot(): void {
  describe("Tests the relocation of an empty folder between its parent folder and the root directory", () => {
    beforeEach(() => {
      cy.contains("[data-test='nav-folder']", "FolderB").as("parentFolder").should("exist");
    });
    it("Relocates a nested folder to the root directory, removing it from the old parent's list of content", () => {
      cy.get("@parentFolder").click();
      cy.get("@parentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderC").as("folderToMove").should("exist");
      });
      cy.get("@folderToMove").trigger("mouseover");
      cy.get("@folderToMove")
        .children("[data-test='nav-folder-content']")
        .within(() => {
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
            "be.visible"
          );
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-move-folder']").click();
        });
      cy.get("[data-test='move-folder-dialog']").should("be.visible");
      cy.get("[data-test='move-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );
      cy.get("[data-test='move-folder-dialog']").within(() => {
        cy.contains("[data-test='move-item-target-folder']", "Root folder").should("exist").click();
        cy.contains("[data-test='move-item-target-folder']", "Root folder")
          .find("[data-test='move-item-target-folder-selected-icon']")
          .should("be.visible");
      });
      cy.get("[data-test='move-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='move-folder-dialog']").trigger("keydown", { key: "Enter" });
      cy.get("[data-test='move-folder-dialog']").should("not.be.visible");
      cy.get("@parentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderC").should("not.exist");
      });
      cy.contains("[data-test='nav-folder']", "SubfolderC")
        .parent("[data-test='nav-item-list']")
        .should("exist");
    });
    it("Relocates the previously moved folder from the root directory to its original parent folder", () => {
      cy.contains("[data-test='nav-folder']", "SubfolderC").as("folderToMove").should("exist");
      cy.get("@folderToMove").trigger("mouseover");
      cy.get("@folderToMove")
        .children("[data-test='nav-folder-content']")
        .within(() => {
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
            "be.visible"
          );
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-move-folder']").click();
        });
      cy.get("[data-test='move-folder-dialog']").should("be.visible");
      cy.get("[data-test='move-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );
      cy.get("[data-test='move-folder-dialog']").within(() => {
        cy.contains("[data-test='move-item-target-folder']", "FolderB").should("exist").click();
        cy.contains("[data-test='move-item-target-folder']", "FolderB")
          .find("[data-test='move-item-target-folder-selected-icon']")
          .should("be.visible");
      });
      cy.get("[data-test='move-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='move-folder-dialog']").trigger("keydown", { key: "Enter" });
      cy.get("[data-test='move-folder-dialog']").should("not.be.visible");
      cy.get("@parentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderC").should("exist");
      });
      cy.contains("[data-test='nav-folder']", "SubfolderC")
        .parent("[data-test='nav-item-list']")
        .should("not.exist");
    });
  });
}
