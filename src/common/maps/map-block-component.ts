import {
  CheckBoxBlock,
  HeadingBigBlock,
  HeadingMediumBlock,
  HeadingSmallBlock,
  PlainTextBlock,
} from "@/components/editor/blocks";
import type { BlockType } from "@/types";
import type { Component } from "vue";

/**
 * @readonly Returns a readonly map that contains all the BlockTypes and their matching Vue
 * Components in order to render or create the appropriate component based on its BlockType.
 *
 * @returns {ReadonlyMap<BlockType, Component>} map that contains all the BlockTypes and their
 * assigned Vue Components.
 */
export default function getBlockComponentMap(): ReadonlyMap<
  BlockType,
  Component
> {
  return new Map<BlockType, Component>([
    ["text", PlainTextBlock],
    ["heading_big", HeadingBigBlock],
    ["heading_medium", HeadingMediumBlock],
    ["heading_small", HeadingSmallBlock],
    ["checkbox", CheckBoxBlock],
  ]);
}
