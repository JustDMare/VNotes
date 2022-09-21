import {
  HeadingBigBlock,
  HeadingMediumBlock,
  HeadingSmallBlock,
  PlainTextBlock,
} from "@/components/editor/blocks";
import type { BlockType } from "@/types";
import type { Component } from "vue";

/**
 * @readonly @constant BLOCK_DICTIONARY that contains all the BlockTypes and their matching Vue
 * Components in order to render or create the appropriate component based on its BlockType
 *
 *
 * @type ReadonlyMap<BlockType, Component>
 */
const BLOCK_DICTIONARY: ReadonlyMap<BlockType, Component> = new Map<
  BlockType,
  Component
>([
  ["text", PlainTextBlock],
  ["heading_big", HeadingBigBlock],
  ["heading_medium", HeadingMediumBlock],
  ["heading_small", HeadingSmallBlock],
]);

export default BLOCK_DICTIONARY;
