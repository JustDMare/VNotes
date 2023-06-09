import NoteEditor from "../NoteEditor.vue";

describe("<NoteEditor />", () => {
  it("renders", () => {
    cy.mount(NoteEditor);
  });
});
