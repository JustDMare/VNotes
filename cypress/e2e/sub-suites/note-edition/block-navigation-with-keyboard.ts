/* eslint-disable max-len */

/**
 * This suite tests the navigability of the focus (caret) between blocks with the
 * keyboard. More specifically, with the down and up arrow keys.
 * The tests  will cover the scenarios with the following kinds of blocks:
 * - One-line text blocks with content.
 * - One-line text blocks without content.
 * - Multi-line text blocks with content.
 * - Checkbox block with content.
 * - Checkbox block without content.
 * - Text block with very long one-line content that jumps to "new lines" without an
 *   actual line break.
 *
 * @returns {void}
 */
export function blockNavigationWithKeyboard(): void {
  describe("Keyboard Navigation Between Blocks", () => {
    before(() => {
      cy.get("[data-test='nav-item-list']").children(":contains('NoteB')").should("exist").click();
      cy.get("[data-test='note-title']").should("have.text", "NoteB");
      cy.get("[data-test='block-content']").first().focus();
    });
    it("Allows the navigation between lines of a multi-line with the arrow keys", () => {
      cy.get("[data-test='block-content']").first().as("parentElement");
      cy.focusedNodeTextShouldEqual(cy.get("@parentElement"), 0);
      cy.get("@parentElement").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@parentElement"), 1);
      cy.get("@parentElement").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@parentElement"), 2);
      cy.get("@parentElement").type("{uparrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@parentElement"), 1);
      cy.get("@parentElement").type("{uparrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@parentElement"), 0);
      cy.get("@parentElement").type("{downarrow}{downarrow}{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@parentElement"), 3);
    });
    it("Allows the navigation between a multi-line block to a block below. Once reaching the last line of the multi-line block, it allows the jump to a different block", () => {
      cy.get("[data-test='block-content']").first().as("multiLineBlock");
      cy.get("[data-test='block-content']").eq(1).as("blockBelow");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 3);
      cy.get("@multiLineBlock").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@blockBelow"), 0);
    });
    it("Moves the cursor to the last line of the multi-line block if accessed with the arrowUp key from the block below", () => {
      cy.get("[data-test='block-content']").first().as("multiLineBlock");
      cy.get("[data-test='block-content']").eq(1).as("blockBelow");
      cy.focusedNodeTextShouldEqual(cy.get("@blockBelow"), 0);
      cy.get("@blockBelow").type("{uparrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 3);
      // Going back to the block below
      cy.get("@multiLineBlock").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@blockBelow"), 0);
    });
    it("Moves the cursor to the first line of a multi-line block if accessed with the arrowDown key from the block above.", () => {
      cy.get("[data-test='block-content']").eq(1).as("blockAbove");
      cy.get("[data-test='block-content']").eq(2).as("multiLineBlock");
      cy.focusedNodeTextShouldEqual(cy.get("@blockAbove"), 0);
      cy.get("@blockAbove").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 0);
    });
    it("Moves the cursor to block above if the cursor is moved up from the first line of the multi-line block.", () => {
      cy.get("[data-test='block-content']").eq(1).as("blockAbove");
      cy.get("[data-test='block-content']").eq(2).as("multiLineBlock");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 0);
      cy.get("@multiLineBlock").type("{uparrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@blockAbove"), 0);

      // Going back to the multi-line block
      cy.get("@blockAbove").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 0);
    });
    it("Does not move the cursor to the block above if it is moved up from the second line or any subsequent lines of the multine block.", () => {
      cy.get("[data-test='block-content']").eq(1).as("blockAbove");
      cy.get("[data-test='block-content']").eq(2).as("multiLineBlock");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 0);
      cy.get("@multiLineBlock").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 1);
      cy.get("@multiLineBlock").type("{uparrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 0);
      // Going back to the last line of the multiline block
      cy.get("@blockAbove").type("{downarrow}");
      cy.get("@multiLineBlock").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 1);
    });
    it("Allows the navigation between a multi-line block and a checkbox block below. Both downwards and upwards navigation are considered", () => {
      cy.get("[data-test='block-content']").eq(2).as("multiLineBlock");
      cy.get("[data-test='block-content']").eq(3).as("checkboxBlock");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 1);
      cy.get("@multiLineBlock").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@checkboxBlock"), 0);
      cy.get("@checkboxBlock").type("{uparrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@multiLineBlock"), 1);

      // Going back to the checkbox block
      cy.get("@multiLineBlock").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@checkboxBlock"), 0);
    });
    it("Allows the navigation between a checkbox block with content and an empty checkbox below. Both downwards and upwards navigation are considered", () => {
      cy.get("[data-test='block-content']").eq(3).as("checkboxBlock");
      cy.get("[data-test='block-content']").eq(4).as("emptyCheckboxBlock");
      cy.focusedNodeTextShouldEqual(cy.get("@checkboxBlock"), 0);
      cy.get("@checkboxBlock").type("{downarrow}");
      // Empty blocks have no nodes, so we can't use the focusedNodeTextShouldEqual helper
      cy.get("@emptyCheckboxBlock").then(($el) => {
        cy.focused().should("deep.equal", $el);
      });
      cy.get("@emptyCheckboxBlock").type("{uparrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@checkboxBlock"), 0);

      // Going back to the empty checkbox block
      cy.get("@checkboxBlock").type("{downarrow}");
      cy.get("@emptyCheckboxBlock").then(($el) => {
        cy.focused().should("deep.equal", $el);
      });
    });

    it("Allows the navigation between an empty checkbox block and an empty block below. Both downwards and upwards navigation are considered", () => {
      cy.get("[data-test='block-content']").eq(4).as("emptyCheckboxBlock");
      cy.get("[data-test='block-content']").eq(5).as("emptyBlock");
      // Empty blocks have no nodes, so we can't use the focusedNodeTextShouldEqual helper
      cy.get("@emptyCheckboxBlock").then(($el) => {
        cy.focused().should("deep.equal", $el);
      });

      cy.get("@emptyCheckboxBlock").type("{downarrow}");
      cy.get("@emptyBlock").then(($el) => {
        cy.focused().should("deep.equal", $el);
      });

      cy.get("@emptyBlock").type("{uparrow}");
      cy.get("@emptyCheckboxBlock").then(($el) => {
        cy.focused().should("deep.equal", $el);
      });

      // Going back to the empty block
      cy.get("@emptyCheckboxBlock").type("{downarrow}");
      cy.get("@emptyBlock").then(($el) => {
        cy.focused().should("deep.equal", $el);
      });
    });
    it("Allows the navigation between an empty block and an text block below. Both downwards and upwards navigation are considered", () => {
      cy.get("[data-test='block-content']").eq(5).as("emptyBlock");
      cy.get("[data-test='block-content']").eq(6).as("textBlock");
      // Empty blocks have no nodes, so we can't use the focusedNodeTextShouldEqual helper
      cy.get("@emptyBlock").then(($el) => {
        cy.focused().should("deep.equal", $el);
      });

      cy.get("@emptyBlock").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@textBlock"), 0);

      cy.get("@textBlock").type("{uparrow}");
      cy.get("@emptyBlock").then(($el) => {
        cy.focused().should("deep.equal", $el);
      });

      // Going back to the text block
      cy.get("@emptyBlock").type("{downarrow}");
      cy.focusedNodeTextShouldEqual(cy.get("@textBlock"), 0);
    });
  });
}
