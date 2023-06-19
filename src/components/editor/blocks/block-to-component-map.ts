import {
  CheckBoxBlock,
  HeadingBigBlock,
  HeadingMediumBlock,
  HeadingSmallBlock,
  PlainTextBlock,
} from "@/components/editor/blocks";
import type { BlockType } from "vnotes-types";
import type { Component } from "vue";

export interface BlockTypeMappings {
  component: Component;
  cssClass: string;
}

let BLOCK_COMPONENT_MAP = new Map<BlockType, BlockTypeMappings>(null);

/**
 * @readonly Returns the constant `BLOCK_COMPONENT_MAP` that contains the mapping of `BlockTypes` to
 * `BlockTypeMappings` objects, which contain the Vue Component and the CSS class assigned
 * to the `BlockType`. If the constant is empty, it will be populated with a predefined list
 * of `BlockTypeMappings` objects then turned into a frozen map to prevent further changes.
 *
 * @returns {ReadonlyMap<BlockType, BlockTypeMappings>} map that contains all the
 * BlockTypes and an object containing their assigned CSS class and Vue Component.
 */
export function getBlockToComponentMap(): ReadonlyMap<BlockType, BlockTypeMappings> {
  if (BLOCK_COMPONENT_MAP?.size === 0) {
    BLOCK_COMPONENT_MAP = new Map<BlockType, BlockTypeMappings>([
      ["text", { component: PlainTextBlock, cssClass: "block--text" }],
      ["heading_big", { component: HeadingBigBlock, cssClass: "block--heading__big" }],
      ["heading_medium", { component: HeadingMediumBlock, cssClass: "block--heading__medium" }],
      ["heading_small", { component: HeadingSmallBlock, cssClass: "block--heading__small" }],
      ["checkbox", { component: CheckBoxBlock, cssClass: "block--checkbox" }],
    ]);
    Object.freeze(BLOCK_COMPONENT_MAP);
  }
  return BLOCK_COMPONENT_MAP;
}
