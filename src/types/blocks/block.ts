import type { CheckboxCustomProperties } from "./checkbox";
export default interface Block {
  blockID: string;
  parentID: string;
  type: BlockType;
  createdTime: string; //timestamp
  lastUpdatedTime: string; //timestamp
  content: string; //Content of the block
  unique_properties: BlockCustomProperties;
}

export type BlockType =
  | "text"
  | "heading_big"
  | "heading_medium"
  | "heading_small"
  | "checkbox";

export type BlockCustomProperties = Partial<CheckboxCustomProperties>;
