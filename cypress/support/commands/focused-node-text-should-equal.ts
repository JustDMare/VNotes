/**
 * Asserts that the text of the node at the given `textLine` from the given element is equal to
 * the text of the focused node.
 *
 * @export
 * @param {Cypress.Chainable<JQuery<HTMLElement>>} parentElement - element that contains the node.
 * @param {number} textLine - Text visual text line of the node that is being compared. Starts at 0.
 * @returns {void}
 *
 * @remarks
 * The `textLine` represents the visual text line in which the text appears inside the
 * element. Starts at 0. This approach is used because the nodes are separated by \n
 * character nodes, so the first textLine would be 0, the second 2, the third 4, and so on.
 */
export function focusedNodeTextShouldEqualCommand(
  parentElement: Cypress.Chainable<JQuery<HTMLElement>>,
  textLine: number
): void {
  cy.window().then((win) => {
    const selection = win.getSelection();
    const selectedNode = selection.anchorNode;
    const nodeIndex = textLine * 2; // The text nodes are separated by \n character nodes.
    parentElement.then(($parentElement) => {
      const textNodes = Array.from($parentElement[0].childNodes);
      expect(selectedNode.textContent).to.equal(textNodes[nodeIndex].textContent);
    });
  });
}
