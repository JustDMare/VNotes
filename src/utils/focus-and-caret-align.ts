export function focusAndAlignCaretInSameVertical(element: HTMLElement) {
  const caretPreviousOffset = getCaretPreviousPosition();
  element.focus();
  restoreCaretPosition(element, caretPreviousOffset);
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

function restoreCaretPosition(element: HTMLElement, previousOffset: number) {
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    let lastChild = element.lastChild as Node;
    if (!lastChild) {
      lastChild = element;
    }
    range.selectNodeContents(lastChild);
    range.collapse(true);
    if (lastChild.textContent && lastChild.textContent.length > previousOffset) {
      range.setStart(lastChild, previousOffset);
    } else {
      range.setStart(lastChild, lastChild.textContent?.length || 0);
    }
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
