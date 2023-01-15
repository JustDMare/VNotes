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
      name: "Plain text",
      execute: convertBlockTypeCommand("63b9531a4bca2b32bd80103c", "text"),
      description: "",
      tag: "p",
    },
    {
      icon: HeadingBigIcon,
      name: "help",
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_big"
      ),
      description: "a",
      tag: "h1",
    },
    {
      icon: HeadingMediumIcon,
      name: "help",
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_medium"
      ),
      description: "a",
      tag: "h2",
    },
    {
      icon: HeadingSmallIcon,
      name: "help",
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_small"
      ),
      description: "a",
      tag: "h3",
    },
    {
      icon: CheckboxIcon,
      name: "help",
      execute: convertBlockTypeCommand("63b9531a4bca2b32bd80103c", "checkbox"),
      description: "a",
      tag: "todo",
    },
  ];
};

const EDITOR_COMMANDS = (): Command[] => {
  const t = i18n.global.t;
  return [
    {
      icon: TrashIcon,
      name: "Plain text",
      execute: deleteBlockCommand("63b9531a4bca2b32bd80103c"),
      description: "",
    },
  ];
};

export default COMMAND_LIST;
