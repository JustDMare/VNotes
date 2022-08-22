import type Block from "../blocks/interfaces/block";

export default interface Note {
  note_id: string;
  parent_id: string;
  title: string;
  created_time: string; // timestamp
  last_updated_time: string; // timestamp
  content: Block[];
}
