export function findContentEditables() {
  const elements: HTMLElement[] = Array.from(
    document.getElementsByClassName("note-editor__content-editable")
  ) as HTMLElement[];
  return elements;
}
