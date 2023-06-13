import type { PaletteCommand } from "../command-palette/interfaces";
import {
  CheckboxIcon,
  HeadingBigIcon,
  HeadingMediumIcon,
  HeadingSmallIcon,
  PlainTextIcon,
  TrashIcon,
} from "@/components/icons";
import { i18n } from "@/i18n/i18n.plugin";
import convertBlockTypeCommand from "../command-palette/convert-block-type";
import deleteBlockCommand from "../command-palette/delete-block";

/**
 * Singleton constant that contains all the commands that can be executed from the command palette.
 */
let ALL_COMMANDS: PaletteCommand[] = [];

/**
 * Returns the `ALL_COMMANDS` constant, which contains all the `PaletteCommand` objects
 * that are to be displayed command palette. If the constant is empty, it will be
 * populated with the `PaletteCommands` then turned into a frozen array.
 *
 * @returns {Readonly<PaletteCommand[]>} The singleton `PaletteCommand[]` constant
 * objects.
 */
function getCommandList(): Readonly<PaletteCommand[]> {
  if (!ALL_COMMANDS.length) {
    ALL_COMMANDS = getConvertBlockTypeCommands().concat(getEditorCommands());
    Object.freeze(ALL_COMMANDS);
  }
  return ALL_COMMANDS;
}

/**
 * Returns a predefined list of `PaletteCommand` objects used to transform blocks into
 * other block types.
 *
 * @returns {PaletteCommand[]} The list of `PaletteCommand` objects.
 */
function getConvertBlockTypeCommands(): PaletteCommand[] {
  const t = i18n.global.t;
  return [
    {
      icon: PlainTextIcon,
      name: t("commandPalette.convertBlockType.plainText.name"),
      execute: convertBlockTypeCommand("text"),
      description: t("commandPalette.convertBlockType.plainText.description"),
      tag: "p",
      dataTest: "palette-convert-plain-text",
    },
    {
      icon: HeadingBigIcon,
      name: t("commandPalette.convertBlockType.headingBig.name"),
      execute: convertBlockTypeCommand("heading_big"),
      description: t("commandPalette.convertBlockType.headingBig.description"),
      tag: "h1",
      dataTest: "palette-convert-h1",
    },
    {
      icon: HeadingMediumIcon,
      name: t("commandPalette.convertBlockType.headingMedium.name"),
      execute: convertBlockTypeCommand("heading_medium"),
      description: t("commandPalette.convertBlockType.headingMedium.description"),
      tag: "h2",
      dataTest: "palette-convert-h2",
    },
    {
      icon: HeadingSmallIcon,
      name: t("commandPalette.convertBlockType.headingSmall.name"),
      execute: convertBlockTypeCommand("heading_small"),
      description: t("commandPalette.convertBlockType.headingSmall.description"),
      tag: "h3",
      dataTest: "palette-convert-h3",
    },
    {
      icon: CheckboxIcon,
      name: t("commandPalette.convertBlockType.checkbox.name"),
      execute: convertBlockTypeCommand("checkbox"),
      description: t("commandPalette.convertBlockType.checkbox.description"),
      tag: "todo",
      dataTest: "palette-convert-checkbox",
    },
  ];
}

/**
 * Returns a predefined list of `PaletteCommand` editor-related commands.
 *
 * @returns {PaletteCommand[]} The list of `PaletteCommand` objects.
 */
function getEditorCommands(): PaletteCommand[] {
  const t = i18n.global.t;
  return [
    {
      icon: TrashIcon,
      name: t("commandPalette.editor.deleteBlock.name"),
      execute: deleteBlockCommand(),
      description: t("commandPalette.editor.deleteBlock.description"),
    },
  ];
}

export default getCommandList;
