export default interface Block {
  blockId: string;
  parentId: string;
  type: BlockType;
  createdTime: string; //timestamp
  lastUpdatedTime: string; //timestamp
  content: string; //Content of the block
  //children_blocks: IBlock[]
  //unique_properties: BlockCustomProperties;
}

export type BlockType =
  | "text"
  | "heading_big"
  | "heading_medium"
  | "heading_small";
