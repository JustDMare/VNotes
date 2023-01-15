import type { Command } from "./interfaces";
import { GripIcon } from "@/components/icons";
import { i18n } from "@/i18n/i18n.plugin";
import convertBlockTypeCommand from "./convert-block-type";

const CONVERT_BLOCK_TYPE_COMMANDS = (): Command[] => {
  const t = i18n.global.t;
  return [
    {
      icon: GripIcon,
      name: "Plain text",
      execute: convertBlockTypeCommand("63b9531a4bca2b32bd80103c", "text"),
      description: "",
      shorthand: "a",
    },
    {
      icon: GripIcon,
      name: "help",
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_big"
      ),
      description: "a",
      shorthand: "a",
    },
    {
      icon: GripIcon,
      name: "help",
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_medium"
      ),
      description: "a",
      shorthand: "a",
    },
    {
      icon: GripIcon,
      name: "help",
      execute: convertBlockTypeCommand(
        "63b9531a4bca2b32bd80103c",
        "heading_small"
      ),
      description: "a",
      shorthand: "a",
    },
    {
      icon: GripIcon,
      name: "help",
      execute: convertBlockTypeCommand("63b9531a4bca2b32bd80103c", "checkbox"),
      description: "a",
      shorthand: "a",
    },
  ];
};

const COMMAND_LIST = (): Command[] => {
  const allCommands = CONVERT_BLOCK_TYPE_COMMANDS();
  return allCommands;
};

export default COMMAND_LIST;
