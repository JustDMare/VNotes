export function focusAndPlaceCaretAtEnd(element: HTMLElement) {
  element.focus();
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    let lastChild = element.lastChild as Node;
    if (!lastChild) {
      lastChild = element;
    }
    range.selectNodeContents(lastChild as Node);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
