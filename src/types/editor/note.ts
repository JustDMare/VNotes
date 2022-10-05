import type { Block } from "../blocks";

export default interface Note {
  noteID: string;
  parentID: string;
  title: string;
  createdTime: string; // timestamp
  lastUpdatedTime: string; // timestamp
  content: Block[];
}
