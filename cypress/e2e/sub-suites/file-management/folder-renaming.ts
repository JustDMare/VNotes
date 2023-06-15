/**
 * This suite tests the renaming of folders.
 * The tests will cover the following scenarios:
 * - Folder renaming with an empty name (forbidden).
 * - Folder renaming with a valid name.
 * - Folder renaming of a folder with nested content.
 * @returns {void}
 */
export function folderRenamingSubSuite(): void {
  describe("Folder Renaming", () => {
    folderRenamingWithEmptyName();
    folderRenamingWithValidName();
  });
}
/**
 * Tests that the system does not allow the renaming of a folder if the name is empty or
 * only contains blank spaces.
 * @returns {void}
 */
function folderRenamingWithEmptyName(): void {
  describe("Does not allow the renaming of a folder with an empty name", () => {
    before(() => {
      // Open the Rename dialog for FolderA
      cy.contains("[data-test='nav-folder']", "FolderA").as("folderToRename").should("exist");
      cy.get("@folderToRename").trigger("mouseover");
      cy.get("@folderToRename")
        .children("[data-test='nav-folder-content']")
        .within(() => {
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
            "be.visible"
          );
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-rename-folder']").click();
        });
      cy.get("[data-test='rename-folder-dialog']").should("be.visible");
    });
    after(() => {
      cy.get("#sidebar-nav").click();
      cy.get("[data-test='rename-folder-dialog']").should("not.be.visible");
    });
    beforeEach(() => {
      cy.contains("[data-test='nav-folder']", "FolderA").as("folderToRename");
    });
    it("Does not allow the renaming of a folder with the starting empty string", () => {
      // The Rename dialog starts with the current name of the folder to be renamed
      cy.get("[data-test='rename-folder-dialog'] input").should("have.value", "FolderA");
      cy.get("[data-test='rename-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );

      cy.get("[data-test='rename-folder-dialog'] input").clear();
      cy.get("[data-test='rename-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );
      cy.get("[data-test='rename-folder-dialog'] input").type("{enter}");
      cy.get("[data-test='rename-folder-dialog']").should("be.visible");
      cy.contains("[data-test='nav-folder']", "FolderA").should("exist");
    });
    it("Does not allow the renaming of a folder with a blank space as a name", () => {
      cy.get("[data-test='rename-folder-dialog'] input").clear();
      cy.get("[data-test='rename-folder-dialog'] input").type(" ");
      cy.get("[data-test='rename-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );
      cy.get("[data-test='rename-folder-dialog'] input").type("{enter}");
      cy.get("[data-test='rename-folder-dialog']").should("be.visible");
      cy.contains("[data-test='nav-folder']", "FolderA").should("exist");
    });
  });
}

/**
 * Tests that the system allows the renaming of a folder if the name is valid.
 * Any string is considered a valid name as long as it is not empty or only contains blank
 * spaces. Repeated names are allowed.
 * @returns {void}
 */
function folderRenamingWithValidName(): void {
  describe("Renaming, with a valid name, of a folder that has nested content", () => {
    it("Renames a folder with nested content with a valid new name", () => {
      // Verify that the new name of the folder is not being used by another folder
      cy.get("[data-test='nav-folder']").contains("FolderRenamed").should("not.exist");

      //Verify that the folder to be renamed has nested content
      cy.contains("[data-test='nav-folder']", "FolderA").as("folderToRename").should("exist");
      cy.get("@folderToRename").click();
      cy.get("@folderToRename").within(() => {
        cy.contains("SubfolderA").should("be.visible");
        cy.contains("SubfolderB").should("be.visible");
        cy.contains("NoteC").should("be.visible");
        cy.contains("NoteD").should("be.visible");
      });

      // Open the Rename dialog for FolderA
      cy.get("@folderToRename").trigger("mouseover");
      cy.get("@folderToRename")
        .children("[data-test='nav-folder-content']")
        .within(() => {
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
            "be.visible"
          );
          cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-rename-folder']").click();
        });
      cy.get("[data-test='rename-folder-dialog']").should("be.visible");

      // The Rename dialog starts with the current name of the folder to be renamed
      cy.get("[data-test='rename-folder-dialog'] input").should("have.value", "FolderA");
      cy.get("[data-test='rename-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );

      // Type the new name and press Enter
      cy.get("[data-test='rename-folder-dialog'] input").clear();
      cy.get("[data-test='rename-folder-dialog'] input").type("FolderRenamed");
      cy.get("[data-test='rename-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='rename-folder-dialog'] input").trigger("keydown", { key: "Enter" });
      cy.get("[data-test='rename-folder-dialog']").should("be.hidden");

      // Verify that the folder was renamed
      cy.contains("FolderA").should("not.exist");
      cy.contains("[data-test='nav-folder']", "FolderRenamed").as("folderRenamed").should("exist");

      // Verify that the folder's nested content is still there
      cy.get("@folderRenamed").click();
      cy.get("@folderRenamed").within(() => {
        cy.contains("SubfolderA").should("be.visible");
        cy.contains("SubfolderB").should("be.visible");
        cy.contains("NoteC").should("be.visible");
        cy.contains("NoteD").should("be.visible");
      });
    });
    it("Renames the previously renamed folder with nested content to its previous name", () => {
      // Open the Rename dialog for FolderRenamed - formerly FolderA
      cy.contains("[data-test='nav-folder-content']", "FolderRenamed")
        .as("folderRenamed")
        .should("exist");
      cy.get("@folderRenamed").trigger("mouseover");
      cy.get("@folderRenamed").within(() => {
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
          "be.visible"
        );
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-rename-folder']").click();
      });
      cy.get("[data-test='rename-folder-dialog']").should("be.visible");

      // The Rename dialog starts with the current name of the folder to be renamed
      cy.get("[data-test='rename-folder-dialog'] input").should("have.value", "FolderRenamed");
      cy.get("[data-test='rename-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );

      // Type the new name and press Enter
      cy.get("[data-test='rename-folder-dialog'] input").clear();
      cy.get("[data-test='rename-folder-dialog'] input").type("FolderA");
      cy.get("[data-test='rename-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='rename-folder-dialog'] input").trigger("keydown", { key: "Enter" });
      cy.get("[data-test='rename-folder-dialog']").should("be.hidden");

      // Verify that the folder was renamed
      cy.contains("FolderRenamed").should("not.exist");
      cy.contains("[data-test='nav-folder']", "FolderA").as("folderToRename").should("exist");
      // Verify that the folder's nested content is still there

      cy.get("@folderToRename").click();
      cy.get("@folderToRename").within(() => {
        cy.contains("SubfolderA").should("be.visible");
        cy.contains("SubfolderB").should("be.visible");
        cy.contains("NoteC").should("be.visible");
        cy.contains("NoteD").should("be.visible");
      });
    });
  });
}
