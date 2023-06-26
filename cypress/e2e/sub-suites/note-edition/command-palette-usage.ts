/* eslint-disable max-len */
/**
 * This suite tests the activation and usage of the command palette of the note's editor
 * for changing the type of the blocks.
 * The tests will cover the following scenarios:
 * - Activation of the command palette.
 * - Filtering commands by writing on the block after activation.
 * - Selecting a command:
 *   - With the keyboard's arrow keys to choose the select and Enter to execute it.
 *   - With the mouse, by pointing and clicking.
 * - Closing the command palette without executing a command:
 *   - By pressing the Escape key.
 *   - By clicking outside of the command palette's dialog.
 *   - By deleting the query, if any, and then deleting the '/' that opened the command
 *     palette.
 *   - By pressing the Espace key when the current query has no commands as a result.
 * - Executing the commands to change the type of a block between:
 *    - Plain text.
 *    - Heading big.
 *    - Heading medium.
 *    - Heading small.
 *    - Checkbox.
 */
export function commandPaletteUsageSubSuite(): void {
  describe("Tests for activation and usage of the command palette", () => {
    before(() => {
      cy.get("[data-test='nav-item-list']").children(":contains('NoteA')").should("exist").click();
    });

    beforeEach(() => {
      cy.get("[data-test='block-content']").first().as("currentBlock");
      cy.get("[data-test='cmd-palette']").as("cmdPalette");
      cy.get("@currentBlock")
        .invoke("text")
        .then((text) => {
          cy.wrap(text).as("blockPreviousText");
        });
      cy.get("@cmdPalette").should("not.be.visible");
      cy.get("@currentBlock").click();
      cy.get("@currentBlock").type("/");
      cy.get("@cmdPalette").should("be.visible");
    });
    activationAndClosingOfCmdPalette();
    selectionOfCommands();
    filteringOfCommands();
  });
}

/**
 * This function contains the tests for the activation and closing of the command palette:
 * - By pressing the Escape key.
 * - By clicking outside of the command palette's dialog.
 * - By deleting the query, if any, and then deleting the '/' that opened the command
 *   palette.
 * - By pressing the Espace key when the current query has no commands as a result.
 *
 * @returns {void}
 */
function activationAndClosingOfCmdPalette(): void {
  describe("Tests for opening and closing of the command palette", () => {
    after(() => {
      cy.get("@currentBlock").clear().type("Block 1");
    });
    it("Opens the command palette and closes it with the 'Escape' key", () => {
      cy.get("@currentBlock").type("{esc}");
      cy.get("@cmdPalette").should("not.be.visible");

      // Text of the block should include the '/'
      cy.get<string>("@blockPreviousText").then((blockPreviousText) => {
        cy.get("@currentBlock")
          .invoke("text")
          .should("eq", blockPreviousText + "/");
      });
    });
    it("Opens the command palette and closes it by clicking outside of the palette's dialog", () => {
      cy.get("@currentBlock").click();
      cy.get("@cmdPalette").should("not.be.visible");

      // Text of the block should include the '/'
      cy.get<string>("@blockPreviousText").then((blockPreviousText) => {
        cy.get("@currentBlock")
          .invoke("text")
          .should("eq", blockPreviousText + "/");
      });
    });
    it("Opens the command palette, performs a simple query and then closes the palette by deleting the query and the '/' that opened the palette.", () => {
      // Query to filter for "pla" (plain text)
      cy.get("@currentBlock").type("pla");
      cy.get("@cmdPalette").should("be.visible");

      // 3 backspaces -> 'pla'
      cy.get("@currentBlock").type("{backspace}{backspace}{backspace}");
      cy.get("@cmdPalette").should("be.visible");

      // 1 more backspace -> '/'
      cy.get("@currentBlock").type("{backspace}");
      cy.get("@cmdPalette").should("not.be.visible");

      // Text of the block should be the original
      cy.get<string>("@blockPreviousText").then((blockPreviousText) => {
        cy.get("@currentBlock").invoke("text").should("eq", blockPreviousText);
      });
    });
    it("Opens the command palette, writes a query that does not yield any result (for example if '/' was used to type in a date) and closes the palette when the user presses spacebar.", () => {
      // A space character should not close the palette if it has commands available
      cy.get("@currentBlock").type(" ");
      cy.get("@cmdPalette")
        .should("be.visible")
        .find("[data-test='cmd-palette-command']")
        .its("length")
        .should("be.greaterThan", 0);

      // Type a query that does not yield commands
      cy.get("@currentBlock").type("06");
      cy.get("@cmdPalette")
        .should("be.visible")
        .find("[data-test='cmd-palette-no-cmd-message']")
        .should("exist")
        .find("[data-test='cmd-palette-list']")
        .should("not.exist");

      // Type a space character
      cy.get("@currentBlock").type(" ");
      cy.get("@cmdPalette").should("not.be.visible");

      // Text of the block should be the original
      cy.get<string>("@blockPreviousText").then((blockPreviousText) => {
        cy.get("@currentBlock")
          .invoke("text")
          .should("eq", blockPreviousText + "/ 06 ");
      });
    });
  });
}

/**
 * This function contains the tests for the selection of commands:
 * - With the keyboard's arrow keys to choose the select and Enter to execute it.
 * - With the mouse, by pointing and clicking.
 *
 * @returns {void}
 */
function selectionOfCommands(): void {
  describe("Tests for the selection of commands", () => {
    it("Selects the second command (Heading big) with the mouse, by clicking on it", () => {
      cy.get("@currentBlock").should("have.class", "block__content--text");
      cy.get("@currentBlock").should("not.have.class", "block__content--heading__big");
      cy.get("@cmdPalette").find("[data-test='cmd-palette-command']").eq(1).click();
      cy.get("@cmdPalette").should("not.be.visible");
      cy.get("@currentBlock").should("have.class", "block__content--heading__big");
      cy.get("@currentBlock").should("not.have.class", "block__content--text");

      cy.get<string>("@blockPreviousText").then((blockPreviousText) => {
        cy.get("@currentBlock").invoke("text").should("eq", blockPreviousText);
      });
    });

    it("Selects the third command (Heading medium) with the keyboard's arrow keys and executes it with the Enter key", () => {
      cy.get("@currentBlock").should("have.class", "block__content--heading__big");
      cy.get("@currentBlock").should("not.have.class", "block__content--medium");

      // Only 2 arrow key presses are needed to select the third command
      cy.get("@currentBlock").type("{downarrow}{downarrow}{enter}");
      cy.get("@currentBlock").should("have.class", "block__content--heading__medium");
      cy.get("@currentBlock").should("not.have.class", "block__content--heading__big");

      cy.get<string>("@blockPreviousText").then((blockPreviousText) => {
        cy.get("@currentBlock").invoke("text").should("eq", blockPreviousText);
      });
    });
  });
}

/**
 * This function contains the tests for the filtering of commands.
 * @returns {void}
 */
function filteringOfCommands(): void {
  describe("Tests for the filtering of commands", () => {
    after(() => {
      // Restore the original block type
      cy.get("@currentBlock").trigger("keydown", { key: "/" }).type("/");
      cy.get("@currentBlock").type("{enter}");
      cy.get("@currentBlock").should("have.class", "block__content--text");
    });
    it("Filters the commands by 'small' which should yield the 'Heading small' command", () => {
      cy.get("@currentBlock").should("not.have.class", "block__content--heading__small");
      cy.get("@currentBlock").should("have.class", "block__content--heading__medium");

      // The "Heading small" command should be the fourth one
      cy.get("@cmdPalette")
        .find("[data-test='cmd-palette-command']")
        .its("length")
        .should("be.greaterThan", 1);
      cy.get("@cmdPalette")
        .find("[data-test='cmd-palette-command']")
        .eq(3)
        .should("contain", "Heading small");

      // Type the query "small"
      cy.get("@currentBlock").type("small");

      // The "Heading small" command should be the first and only one
      cy.get("@cmdPalette")
        .find("[data-test='cmd-palette-command']")
        .should("have.length", 1)
        .first()
        .should("contain", "Heading small");

      // Execute the command
      cy.get("@currentBlock").type("{enter}");

      // The block type should change to the "Heading small" type
      cy.get("@currentBlock").should("have.class", "block__content--heading__small");
      cy.get("@currentBlock").should("not.have.class", "block__content--heading__medium");

      // Text of the block should be the original, without the query
      cy.get<string>("@blockPreviousText").then((blockPreviousText) => {
        cy.get("@currentBlock").invoke("text").should("eq", blockPreviousText);
      });
    });
    it("Filters the commands by 'checkbox' which should yield the 'Checkbox' command", () => {
      cy.get("@currentBlock").should("not.have.class", "block__content--checkbox__text");
      cy.get("@currentBlock").should("have.class", "block__content--heading__small");

      // The "Checkbox" command should be the fifth one
      cy.get("@cmdPalette")
        .find("[data-test='cmd-palette-command']")
        .its("length")
        .should("be.greaterThan", 1);
      cy.get("@cmdPalette")
        .find("[data-test='cmd-palette-command']")
        .eq(4)
        .should("contain", "Checkbox");

      // Type the query "checkbox"
      cy.get("@currentBlock").type("checkbox");

      // The "Checkbox" command should be the first and only one
      cy.get("@cmdPalette")
        .find("[data-test='cmd-palette-command']")
        .should("have.length", 1)
        .first()
        .should("contain", "Checkbox");
      cy.get("@currentBlock").type("{enter}");

      // The block type should change to the "Checkbox" type
      cy.get("@currentBlock").should("have.class", "block__content--checkbox__text");
      cy.get("@currentBlock").should("not.have.class", "block__content--heading__small");

      // Text of the block should be the original, without the query
      cy.get<string>("@blockPreviousText").then((blockPreviousText) => {
        cy.get("@currentBlock").invoke("text").should("eq", blockPreviousText);
      });
    });
  });
}
