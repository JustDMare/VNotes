import type { Note } from "./editor";

export type NoteReference = Omit<Note, "content">;
