export function focusAndPlaceCaretAtEnd(element: HTMLElement) {
  element.focus();
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    let nodeToFocus = element.lastChild as Node;
    if (!nodeToFocus) {
      nodeToFocus = element;
    }
    range.selectNodeContents(nodeToFocus as Node);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
