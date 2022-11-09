import type { default as Block, BlockCustomProperties } from "./block";

export default interface CheckboxBlock extends Block {
  type: "checkbox";
  custom_properties: BlockCustomProperties & CheckboxCustomProperties;
}

export interface CheckboxCustomProperties {
  selected: boolean;
}
