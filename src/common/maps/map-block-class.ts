import type { BlockType } from "@/types";

/**
 * @readonly Returns a readonly map that contains all the BlockTypes and their matching CSS BEM
 * classes in order to apply the corresponding styling to each block type.
 * @returns {ReadonlyMap<BlockType, string>} map that contains all the BlockTypes and their
 * assigned CSS BEM classes.
 */
export default function getBlockClassMap(): ReadonlyMap<BlockType, string> {
  return new Map<BlockType, string>([
    ["text", "block--text"],
    ["heading_big", "block--heading__big"],
    ["heading_medium", "block--heading__medium"],
    ["heading_small", "block--heading__small"],
    ["checkbox", "block--checkbox"],
  ]);
}
