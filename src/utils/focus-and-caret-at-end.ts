export function focusAndPlaceCaretAtEnd(element: HTMLElement) {
  element.focus();
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    let nodeToFocus = element.lastChild as Node;
    if (!nodeToFocus) {
      nodeToFocus = element;
    }
    let offSetToFocus = 0;
    const nodeTextContent = nodeToFocus.textContent;
    if (nodeTextContent) {
      const nodeLastChar = nodeTextContent[nodeTextContent.length - 1];
      if (nodeLastChar === "\u200B" && nodeTextContent.length > 1) {
        offSetToFocus = nodeTextContent.length - 1;
      } else {
        offSetToFocus = nodeTextContent.length;
      }
    }
    range.setStart(nodeToFocus, offSetToFocus);
    range.setEnd(nodeToFocus, offSetToFocus);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
}
