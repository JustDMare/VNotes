import type { BlockType } from "@/types/blocks/block";
import TextBlock from "@/components/editor/blocks/TextBlock.vue";
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
>([["text", TextBlock]]);

export default BLOCK_DICTIONARY;
