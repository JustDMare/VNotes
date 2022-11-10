import type {
  HeadingBigBlock,
  HeadingMediumBlock,
  HeadingSmallBlock,
  PlainTextBlock,
  CheckboxBlock,
} from "@/types";

import type Note from "@/types/editor/note";

const headingBig: HeadingBigBlock = {
  blockID: "f842a67e-7148-40c2-8a9d-757592b219f0",
  parentID: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  type: "heading_big",
  createdTime: "1661190197",
  lastUpdatedTime: "1661190201",
  content: "Heading 1",
  uniqueProperties: {},
};
const plainText1: PlainTextBlock = {
  blockID: "ad0a3390-b23d-478c-bfc6-80ab2dd6fa24",
  parentID: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  type: "text",
  createdTime: "1661190278",
  lastUpdatedTime: "1661190286",
  content: "This is a text block",
  uniqueProperties: {},
};
const headingMedium: HeadingMediumBlock = {
  blockID: "1efe61b0-8958-4066-83d5-8533af03a134",
  parentID: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  type: "heading_medium",
  createdTime: "1662199243",
  lastUpdatedTime: "1662199243",
  content: "Heading 2",
  uniqueProperties: {},
};
const plainText2: PlainTextBlock = {
  blockID: "99c222eb-8552-4830-9678-64f20fd41bb9",
  parentID: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  type: "text",
  createdTime: "1662199253",
  lastUpdatedTime: "1662199253",
  content: "This is yet another text block",
  uniqueProperties: {},
};
const headingSmall: HeadingSmallBlock = {
  blockID: "dccdab13-7757-4223-a40a-33377aaaadef",
  parentID: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  type: "heading_small",
  createdTime: "1662199258",
  lastUpdatedTime: "1662199258",
  content: "Heading 3",
  uniqueProperties: {},
};
const plainText3: PlainTextBlock = {
  blockID: "eced1b5a-4153-4508-82ad-f7acc60b3064",
  parentID: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  type: "text",
  createdTime: "1662199262",
  lastUpdatedTime: "1662199262",
  content: "This is one last \n text block",
  uniqueProperties: {},
};
const checkbox: CheckboxBlock = {
  blockID: "f957e0e5-ea30-40bf-bba4-e6286f19a96e",
  parentID: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  type: "checkbox",
  createdTime: "1668020160",
  lastUpdatedTime: "1668020161",
  content: "This is a checkbox",
  uniqueProperties: {
    selected: true,
  },
};

export const noteBlocks: Note = {
  noteID: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  parentID: "8e1239e8-a94f-4313-a481-ac9883a4603b",
  title: "First Note",
  createdTime: "1661190013",
  lastUpdatedTime: "1661190019",
  content: [
    headingBig,
    plainText1,
    headingMedium,
    plainText2,
    headingSmall,
    plainText3,
    checkbox,
  ],
};
