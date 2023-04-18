import type { BaseCommand } from "../interfaces";

/**
 * Represents a command that can be executed from the command palette. Adds a
 * `description` and an optional `tag` properties to the `BaseCommand` interface.
 *
 * @interface PaletteCommand
 * @extends BaseCommand
 * @property {string} description - The description of the command.
 * @property {string} tag - An optional tag to improve the searchability of the command.
 */
export interface PaletteCommand extends BaseCommand {
  description: string;
  tag?: string;
}
