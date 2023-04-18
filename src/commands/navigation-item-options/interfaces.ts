import type { BaseCommand } from "../interfaces";

/**
 * Represents the options that can be displayed and executed for a navigation folder or
 * note.
 * @typedef NavigationItemOption
 * @extends BaseCommand
 *
 * @remarks
 * The `NavigationItemOption` interface is a type alias for the `BaseCommand` interface.
 * This way if some other need for the `NavigationItemOption` interface arises, it can be
 * transformed into a proper interface.
 */
export type NavigationItemOption = BaseCommand;
