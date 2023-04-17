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

let ALL_COMMANDS: PaletteCommand[] = [];

//TODO: Document this
function getCommandList(): PaletteCommand[] {
  if (!ALL_COMMANDS.length) {
    ALL_COMMANDS = getConvertBlockTypeCommands().concat(getEditorCommands());
  }
  return ALL_COMMANDS;
}

function getConvertBlockTypeCommands(): PaletteCommand[] {
  const t = i18n.global.t;
  return [
    {
      icon: PlainTextIcon,
      name: t("commandPalette.convertBlockType.plainText.name"),
      execute: convertBlockTypeCommand("text"),
      description: t("commandPalette.convertBlockType.plainText.description"),
      tag: "p",
    },
    {
      icon: HeadingBigIcon,
      name: t("commandPalette.convertBlockType.headingBig.name"),
      execute: convertBlockTypeCommand("heading_big"),
      description: t("commandPalette.convertBlockType.headingBig.description"),
      tag: "h1",
    },
    {
      icon: HeadingMediumIcon,
      name: t("commandPalette.convertBlockType.headingMedium.name"),
      execute: convertBlockTypeCommand("heading_medium"),
      description: t("commandPalette.convertBlockType.headingMedium.description"),
      tag: "h2",
    },
    {
      icon: HeadingSmallIcon,
      name: t("commandPalette.convertBlockType.headingSmall.name"),
      execute: convertBlockTypeCommand("heading_small"),
      description: t("commandPalette.convertBlockType.headingSmall.description"),
      tag: "h3",
    },
    {
      icon: CheckboxIcon,
      name: t("commandPalette.convertBlockType.checkbox.name"),
      execute: convertBlockTypeCommand("checkbox"),
      description: t("commandPalette.convertBlockType.checkbox.description"),
      tag: "todo",
    },
  ];
}

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
