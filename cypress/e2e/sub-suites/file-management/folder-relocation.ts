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
    folderWithNestedContentRelocationToSubfolder();
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
      // Open SubfolderC's Move dialog
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

      // Move SubfolderC to the root directory
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

      // Confirm that SubfolderC is no longer in FolderB's list of content, but in the
      // root directory
      cy.get("@parentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderC").should("not.exist");
      });
      cy.contains("[data-test='nav-folder']", "SubfolderC")
        .parent("[data-test='nav-item-list']")
        .should("exist");
    });
    it("Relocates the previously moved folder from the root directory to its original parent folder", () => {
      // Open SubfolderC's Move dialog
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

      // Move SubfolderC back to FolderB
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

      // Confirm that SubfolderC is no longer in the root directory, but in FolderB's list
      cy.get("@parentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderC").should("exist");
      });
      cy.contains("[data-test='nav-folder']", "SubfolderC")
        .parent("[data-test='nav-item-list']")
        .should("not.exist");
    });
  });
}

/**
 * Tests the relocation of a subfolder with nested content to a different subfolder as its
 * new parent folder. Then tests the relocation of that folder from the new parent folder
 * to its original parent folder.
 * @returns {void}
 */
function folderWithNestedContentRelocationToSubfolder(): void {
  describe("Tests the relocation of a folder with nested content to a different subfolder as its new parent folder", () => {
    beforeEach(() => {
      cy.contains("[data-test='nav-folder']", "FolderA").as("parentFolder").should("exist");
    });
    it("Relocates a folder with nested content to a different subfolder as its new parent folder", () => {
      // Display FolderA's content
      cy.get("@parentFolder").click();
      cy.get("@parentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderA").as("folderToMove").should("exist");
        cy.contains("[data-test='nav-folder']", "SubfolderB").as("newParentFolder").should("exist");
      });

      // Display SubfolderA's content
      cy.get("@folderToMove").click();
      cy.get("@folderToMove").within(() => {
        cy.contains("SubfolderD").should("be.visible");
        cy.contains("NoteE").should("be.visible");
      });

      // Open the MoveFolder dialog for SubfolderA
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

      // Move SubfolderA to SubfolderB
      cy.get("[data-test='move-folder-dialog']").within(() => {
        cy.contains("[data-test='move-item-target-folder']", "FolderA")
          .find("[data-test='move-item-target-folder-dropdown-btn']")
          .should("exist")
          .click();
        // Verify that SubfolderA and its subfolders (SubfolderD) do not appear in the
        // list of parent folder candidates
        cy.contains("[data-test='move-item-target-folder']", "SubfolderA").should("not.exist");
        cy.contains("[data-test='move-item-target-folder']", "SubfolderD").should("not.exist");
        // Continue moving SubfolderA to SubfolderB
        cy.contains("[data-test='move-item-target-folder']", "SubfolderB").should("exist").click();
        cy.contains("[data-test='move-item-target-folder']", "SubfolderB")
          .find("[data-test='move-item-target-folder-selected-icon']")
          .should("be.visible");
      });
      cy.get("[data-test='move-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='move-folder-dialog']").trigger("keydown", { key: "Enter" });
      cy.get("[data-test='move-folder-dialog']").should("not.be.visible");

      // Verify that SubfolderA is no longer a direct child of FolderA, but is now a child
      // of SubfolderB.
      cy.contains("[data-test='nav-folder']", "SubfolderA").should("not.be.visible");
      cy.get("@newParentFolder").click();
      cy.contains("[data-test='nav-folder']", "SubfolderA").should("be.visible");

      // Verify that SubfolderA's content has moved with SubfolderA.
      cy.contains("[data-test='nav-folder']", "SubfolderA").click();
      cy.contains("[data-test='nav-folder']", "SubfolderA").within(() => {
        cy.contains("SubfolderD").should("be.visible");
        cy.contains("NoteE").should("be.visible");
      });
    });
    it("Relocates the moved subfolder from its new parent to its original parent folder", () => {
      // Display  SubfolderB's content
      cy.get("@parentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderB").as("newParentFolder").should("exist");
      });
      cy.get("@newParentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderA").as("folderToMove").should("exist");
      });

      // Display SubfolderA's content
      cy.get("@folderToMove").click();
      cy.get("@folderToMove").within(() => {
        cy.contains("SubfolderD").should("be.visible");
        cy.contains("NoteE").should("be.visible");
      });

      // Open the MoveFolder dialog for SubfolderA
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

      // Move SubfolderA to FolderA
      cy.get("[data-test='move-folder-dialog']").within(() => {
        cy.contains("[data-test='move-item-target-folder']", "FolderA").should("exist").click();
        cy.contains("[data-test='move-item-target-folder']", "FolderA")
          .find("[data-test='move-item-target-folder-selected-icon']")
          .should("be.visible");
      });
      cy.get("[data-test='move-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='move-folder-dialog']").trigger("keydown", { key: "Enter" });
      cy.get("[data-test='move-folder-dialog']").should("not.be.visible");

      // Verify that SubfolderA is now a direct child of FolderA and is no longer a child
      // of SubfolderB.
      cy.get("@newParentFolder").click();
      cy.contains("[data-test='nav-folder']", "SubfolderA").should("be.visible");
      cy.get("@newParentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "SubfolderA").should("not.exist");
      });
      // Verify that SubfolderA's content has moved with SubfolderA.
      cy.contains("[data-test='nav-folder']", "SubfolderA").click();
      cy.contains("[data-test='nav-folder']", "SubfolderA").within(() => {
        cy.contains("SubfolderD").should("be.visible");
        cy.contains("NoteE").should("be.visible");
      });
    });
  });
}
