import type { PlainTextBlock } from "@/types";

export function getPlainTextBlockTemplate(noteID: string): PlainTextBlock {
  return {
    type: "text",
    blockID: crypto.randomUUID(),
    parentID: noteID,
    createdTime: String(Date.now()),
    lastUpdatedTime: String(Date.now()),
    content: "",
    uniqueProperties: {},
  };
}
