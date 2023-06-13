/* eslint-disable max-len */

/**
 * This suite tests the creation of folders.
 * The tests are divided into three sub-suites:
 * - Folder creation with an empty name (forbidden).
 * - Folder creation with a valid name.
 * - Folder creation inside another folder.
 * @returns {void}
 */
export function folderCreationSubSuite(): void {
  describe("Folder Creation", () => {
    folderCreationWithEmptyName();
    folderCreationWithValidName();
    folderCreationWithinFolder();
  });
}

/**
 * Tests that the system does not allow the creation of a folder if the name is empty or
 * only contains blank spaces.
 * @returns {void}
 */
function folderCreationWithEmptyName(): void {
  describe("Does not allow the creation of a new folder with an empty name", () => {
    before(() => {
      cy.get(".sidebar__new-btns__btn.btn--new-folder").click();
      cy.get("[data-test='create-folder-dialog']").should("be.visible");
    });
    after(() => {
      cy.get("#sidebar-nav").click();
      cy.get("[data-test='create-folder-dialog']").should("not.be.visible");
    });
    beforeEach(() => {
      cy.get("[data-test='nav-folder']:visible")
        .its("length")
        .then((length) => {
          cy.wrap(length).as("folderCount");
        });
    });
    it("Does not allow the creation of a new folder with the starting empty string", () => {
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );

      cy.get("[data-test='create-folder-dialog'] input").type("{enter}");
      cy.get("[data-test='create-folder-dialog']").should("be.visible");
      cy.get<number>("@folderCount").then((folderCount) => {
        cy.get("[data-test='nav-folder']:visible").its("length").should("eq", folderCount);
      });
    });
    it("Does not allow the creation of a new folder with a blank space as a name", () => {
      cy.get("[data-test='create-folder-dialog'] input").type(" ");
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );
      cy.get("[data-test='create-folder-dialog'] input").type("{enter}");
      cy.get("[data-test='create-folder-dialog']").should("be.visible");
      cy.get<number>("@folderCount").then((folderCount) => {
        cy.get("[data-test='nav-folder']:visible").its("length").should("eq", folderCount);
      });
    });
  });
}

/**
 * Tests that the system allows the creation of a folder if the name is valid.
 * Any string is considered a valid name as long as it is not empty or only contains blank
 * spaces. Repeated names are allowed.
 * @returns {void}
 */
function folderCreationWithValidName(): void {
  describe("Allows the creation of a new folder at the root directory with a valid name", () => {
    beforeEach(() => {
      cy.get(".sidebar__new-btns__btn.btn--new-folder").click();
      cy.get("[data-test='create-folder-dialog']").should("be.visible");
      cy.get("[data-test='nav-folder']:visible")
        .its("length")
        .then((length) => {
          cy.wrap(length).as("folderCount");
        });
    });
    after(() => {
      cy.get("#sidebar-nav").click();
      cy.get("[data-test='create-folder-dialog']").should("not.be.visible");
    });
    it("Allows the creation of a new folder with a valid name and pressing Enter", () => {
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );

      cy.get("[data-test='create-folder-dialog'] input").type("CreatedFolder1");
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='create-folder-dialog'] input").type("{enter}");

      cy.get("[data-test='create-folder-dialog']").should("be.hidden");
      cy.get("[data-test='nav-folder']").contains("CreatedFolder1").should("exist");

      cy.get<number>("@folderCount").then((folderCount) => {
        cy.get("[data-test='nav-folder']:visible")
          .its("length")
          .should("eq", folderCount + 1);
      });
    });
    it("Allows the creation of a new folder with a valid name and clicking the main button", () => {
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );

      cy.get("[data-test='create-folder-dialog'] input").type("CreatedFolder2");
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );

      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").click();

      cy.get("[data-test='create-folder-dialog']").should("be.hidden");
      cy.get<number>("@folderCount").then((folderCount) => {
        cy.get("[data-test='nav-folder']:visible")
          .its("length")
          .should("eq", folderCount + 1);
      });
    });
    it("Allows the creation of a new folder with a repeated valid name", () => {
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );

      cy.get("[data-test='create-folder-dialog'] input").type("CreatedFolder2");
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='create-folder-dialog'] input").type("{enter}");

      cy.get("[data-test='create-folder-dialog']").should("be.hidden");
      cy.get("[data-test='nav-folder']").contains("CreatedFolder2").should("exist");

      cy.get<number>("@folderCount").then((folderCount) => {
        cy.get("[data-test='nav-folder']:visible")
          .its("length")
          .should("eq", folderCount + 1);
      });
    });
  });
}

/**
 * Tests that the system allows the creation of a subfolder within an existing folder.
 * @returns {void}
 */
function folderCreationWithinFolder(): void {
  describe("Creation of a folder within an existing folder", () => {
    beforeEach(() => {
      cy.contains("[data-test='nav-folder']", "CreatedFolder1").as("parentFolder");
      cy.get("@parentFolder").should("exist");
    });
    it("Should not have a nested folder", () => {
      cy.get("@parentFolder").click();
      cy.get("@parentFolder").within(() => {
        cy.contains("[data-test='nav-folder']", "CreatedSubfolder1").should("not.exist");
      });
    });
    it("Allows the creation of a folder within an existing folder", () => {
      cy.get("@parentFolder").trigger("mouseover");
      cy.get("@parentFolder").within(() => {
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-button']").click();
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='dropdown-menu']").should(
          "be.visible"
        );
        cy.get("[data-test='nav-item-options-dropdown'] [data-test='nav-create-folder']").click();
      });
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.disabled"
      );

      cy.get("[data-test='create-folder-dialog'] input").type("CreatedSubfolder1");
      cy.get("[data-test='create-folder-dialog'] [data-test='base-dialog-main-button']").should(
        "be.enabled"
      );
      cy.get("[data-test='create-folder-dialog'] input").type("{enter}");
      cy.get("[data-test='create-folder-dialog']").should("be.hidden");

      cy.get("@parentFolder").click();
      cy.get("@parentFolder").within(() => {
        cy.get("[data-test='nav-folder']").contains("CreatedSubfolder1").should("exist");
      });
    });
  });
}
