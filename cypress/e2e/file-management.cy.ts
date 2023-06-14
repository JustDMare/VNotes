import { folderCreationSubSuite, folderDeletionSubSuite } from "./sub-suites/file-management";
import { folderRelocationSubSuite } from "./sub-suites/file-management/folder-relocation";

/* eslint-disable max-len */
describe("File Management Tests", () => {
  before(() => {
    cy.then(Cypress.session.clearCurrentSessionData);
    cy.loginWithAuth0(Cypress.env("auth0_username"), Cypress.env("auth0_password"));
  });

  // Folder content visibility toggle
  describe("Toggle the visibility of subfolders and contained notes when clicking on the parent folder", () => {
    it("Displays inner folders and notes of a folder when clicked, if they are hidden", () => {
      cy.get(".nav__folder .nav__item").contains("FolderA").should("exist");
      // Subfolders and contained notes are hidden
      cy.contains(".nav__folder", "FolderA")
        .children(".nav__folder__content")
        .should("not.be.visible");
      cy.contains(".nav__folder", "FolderA").find(".nav__folder").should("not.be.visible");
      cy.contains(".nav__folder", "FolderA").find(".nav__note").should("not.be.visible");

      // Click on the folder
      cy.get(".nav__item").contains("FolderA").click();

      // Subfolders and contained notes are now visible
      cy.contains(".nav__folder", "FolderA").children(".nav__folder__content").should("be.visible");
      cy.contains(".nav__folder", "FolderA").find(".nav__folder").should("be.visible");
      cy.contains(".nav__folder", "FolderA").find(".nav__note").should("be.visible");
    });

    it("Hides inner folders and notes of a folder when clicked, if they are visible", () => {
      cy.get(".nav__folder .nav__item").contains("FolderA").should("exist");

      // Subfolders and contained notes are visible
      cy.contains(".nav__folder", "FolderA").children(".nav__folder__content").should("be.visible");
      cy.contains(".nav__folder", "FolderA").find(".nav__folder").should("be.visible");
      cy.contains(".nav__folder", "FolderA").find(".nav__note").should("be.visible");

      // Click on the folder
      cy.get(".nav__item").contains("FolderA").click();

      // Subfolders and contained notes are now hidden
      cy.contains(".nav__folder", "FolderA")
        .children(".nav__folder__content")
        .should("not.be.visible");
      cy.contains(".nav__folder", "FolderA").find(".nav__folder").should("not.be.visible");
      cy.contains(".nav__folder", "FolderA").find(".nav__note").should("not.be.visible");
    });
  });

  // Closing file management dialogs
  describe("Testing the closing actions for the file management dialogs", () => {
    context(
      "All file management dialogs share the same dialog behaviour, so testing one serves for testing all the others",
      () => {
        beforeEach(() => {
          cy.get(".sidebar__new-btns__btn.btn--new-folder").click();
          cy.get("[data-test='create-folder-dialog']").should("be.visible");
        });
        after(() => {
          cy.get("#sidebar-nav").click();
          cy.get("[data-test='create-folder-dialog']").should("not.be.visible");
        });
        it("Pressing 'Esc' key closes the folder creation dialog", () => {
          cy.get("[data-test='create-folder-dialog']").trigger("keydown", { key: "Escape" });
          // cy.get("[data-test='create-folder-dialog']").type("{esc}");
          cy.get("[data-test='create-folder-dialog']").should("not.be.visible");
        });
        it("Clicking on the 'X' button closes the folder creation dialog", () => {
          cy.get(
            "[data-test='create-folder-dialog'] [data-test='base-dialog-close-button']"
          ).click();
          cy.get("[data-test='create-folder-dialog']").should("not.be.visible");
        });
        it("Clicking outside the folder creation dialog closes the folder creation dialog", () => {
          cy.get("#sidebar-nav").click();
          cy.get("[data-test='create-folder-dialog']").should("not.be.visible");
        });
        it("Clicking inside the folder creation dialog does NOT close the folder creation dialog", () => {
          cy.get("[data-test='create-folder-dialog']").click();
          cy.get("[data-test='create-folder-dialog']").should("be.visible");
        });
      }
    );
  });

  folderCreationSubSuite();
  folderDeletionSubSuite();
  folderRelocationSubSuite();
});
