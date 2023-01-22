export function focusUpAndAlignCaretInSameVertical(element: HTMLElement) {
  let caretPreviousOffset = getCaretPreviousPosition();
  element.focus();
  let nodeToFocus = element.lastChild as Node;
  if (!nodeToFocus) {
    nodeToFocus = element;
  }
  if (
    nodeToFocus.textContent &&
    nodeToFocus.textContent[nodeToFocus.textContent.length - 1] === "\u200B"
  ) {
    caretPreviousOffset += 1;
  }
  restoreCaretPosition(nodeToFocus, caretPreviousOffset);
}

export function focusDownAndAlignCaretInSameVertical(element: HTMLElement) {
  const caretPreviousOffset = getCaretPreviousPosition();
  element.focus();
  let nodeToFocus = element.firstChild as Node;
  if (!nodeToFocus) {
    nodeToFocus = element;
  }
  restoreCaretPosition(nodeToFocus, caretPreviousOffset);
}

function getCaretPreviousPosition() {
  const selection = window.getSelection();
  let previousOffset = 0;
  if (selection) {
    const range = selection.getRangeAt(0);
    range.collapse(true);
    previousOffset = range.startOffset;
  }
  return previousOffset;
}

function restoreCaretPosition(nodeToFocus: Node, previousOffset: number) {
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    range.selectNodeContents(nodeToFocus);
    range.collapse(true);
    if (nodeToFocus.textContent && nodeToFocus.textContent.length > previousOffset) {
      if (nodeToFocus.textContent[previousOffset] === "\u200B") {
        console.log("hi");
        range.setStart(nodeToFocus, previousOffset + 1);
      } else {
        range.setStart(nodeToFocus, previousOffset);
      }
    } else {
      range.setStart(nodeToFocus, nodeToFocus.textContent?.length || 0);
    }
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
