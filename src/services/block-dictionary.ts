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
function getBlockComponentDictionary(): ReadonlyMap<BlockType, Component> {
  return new Map<BlockType, Component>([
    ["text", PlainTextBlock],
    ["heading_big", HeadingBigBlock],
    ["heading_medium", HeadingMediumBlock],
    ["heading_small", HeadingSmallBlock],
    ["checkbox", CheckBoxBlock],
  ]);
}

/**
 * @readonly Returns a readonly map that contains all the BlockTypes and their matching CSS BEM
 * classes in order to apply the corresponding styling to each block type.
 * @returns {ReadonlyMap<BlockType, string>} map that contains all the BlockTypes and their
 * assigned CSS BEM classes.
 */
function getBlockClassDictionary(): ReadonlyMap<BlockType, string> {
  return new Map<BlockType, string>([
    ["text", "block--text"],
    ["heading_big", "block--heading__big"],
    ["heading_medium", "block--heading__medium"],
    ["heading_small", "block--heading__small"],
    ["checkbox", "block--checkbox"],
  ]);
}
export { getBlockComponentDictionary, getBlockClassDictionary };
