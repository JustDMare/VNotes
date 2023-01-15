import type { Command } from "./interfaces";
import {
  CheckboxIcon,
  HeadingBigIcon,
  HeadingMediumIcon,
  HeadingSmallIcon,
  PlainTextIcon,
  TrashIcon,
} from "@/components/icons";
import { i18n } from "@/i18n/i18n.plugin";
import convertBlockTypeCommand from "./convert-block-type";
import deleteBlockCommand from "./delete-block";
//TODO: Document this
const COMMAND_LIST = (): Command[] => {
  const allCommands = CONVERT_BLOCK_TYPE_COMMANDS().concat(EDITOR_COMMANDS());
  return allCommands;
};

const CONVERT_BLOCK_TYPE_COMMANDS = (): Command[] => {
  const t = i18n.global.t;
  return [
    {
      icon: PlainTextIcon,
      name: t("commandPalette.convertBlockType.plainText.name"),
      execute: convertBlockTypeCommand("63b9531a4bca2b32bd80103c", "text"),
      description: t("commandPalette.convertBlockType.plainText.description"),
      tag: "p",
    },
    {
      icon: HeadingBigIcon,
      name: t("commandPalette.convertBlockType.headingBig.name"),
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_big"
      ),
      description: t("commandPalette.convertBlockType.headingBig.description"),
      tag: "h1",
    },
    {
      icon: HeadingMediumIcon,
      name: t("commandPalette.convertBlockType.headingMedium.name"),
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_medium"
      ),
      description: t(
        "commandPalette.convertBlockType.headingMedium.description"
      ),
      tag: "h2",
    },
    {
      icon: HeadingSmallIcon,
      name: t("commandPalette.convertBlockType.headingSmall.name"),
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_small"
      ),
      description: t(
        "commandPalette.convertBlockType.headingSmall.description"
      ),
      tag: "h3",
    },
    {
      icon: CheckboxIcon,
      name: t("commandPalette.convertBlockType.checkbox.name"),
      execute: convertBlockTypeCommand("63b9531a4bca2b32bd80103c", "checkbox"),
      description: t("commandPalette.convertBlockType.checkbox.description"),
      tag: "todo",
    },
  ];
};

const EDITOR_COMMANDS = (): Command[] => {
  const t = i18n.global.t;
  return [
    {
      icon: TrashIcon,
      name: t("commandPalette.editor.deleteBlock.name"),
      execute: deleteBlockCommand("63b9531a4bca2b32bd80103c"),
      description: t("commandPalette.editor.deleteBlock.description"),
    },
  ];
};

export default COMMAND_LIST;
