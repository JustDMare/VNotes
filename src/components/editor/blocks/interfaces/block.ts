export default interface Block {
  block_id: string;
  block_type: string;
  created_time: string; //timestamp
  last_updated_time: string; //timestamp
  content: string; //Content of the block

  //unique_properties: BlockCustomProperties;
}
