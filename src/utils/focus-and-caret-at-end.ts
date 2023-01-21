export function focusAndPlaceCaretAtEnd(element: HTMLElement) {
  element.focus();
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    range.selectNodeContents(element.lastChild as Node);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
