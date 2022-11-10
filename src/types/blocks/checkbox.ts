import type { default as Block, BlockUniqueProperties } from "./block";

export default interface CheckboxBlock extends Block {
  type: "checkbox";
  uniqueProperties: BlockUniqueProperties & CheckboxUniqueProperties;
}

export interface CheckboxUniqueProperties {
  selected: boolean;
}
