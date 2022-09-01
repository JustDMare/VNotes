import type Block from "../blocks/block";

export default interface Note {
  noteId: string;
  parentId: string;
  title: string;
  createdTime: string; // timestamp
  lastUpdatedTime: string; // timestamp
  content: Block[];
}
