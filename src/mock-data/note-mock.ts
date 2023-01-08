import type {
  HeadingBigBlock,
  HeadingMediumBlock,
  HeadingSmallBlock,
  PlainTextBlock,
  CheckboxBlock,
  Note,
} from "vnotes-types";

const headingBig: HeadingBigBlock = {
  _id: "f842a67e-7148-40c2-8a9d-757592b219f0",
  type: "heading_big",
  content: "Heading 1",
  uniqueProperties: {},
};
const plainText1: PlainTextBlock = {
  _id: "ad0a3390-b23d-478c-bfc6-80ab2dd6fa24",
  type: "text",
  content: "This is a text block",
  uniqueProperties: {},
};
const headingMedium: HeadingMediumBlock = {
  _id: "1efe61b0-8958-4066-83d5-8533af03a134",
  type: "heading_medium",
  content: "Heading 2",
  uniqueProperties: {},
};
const plainText2: PlainTextBlock = {
  _id: "99c222eb-8552-4830-9678-64f20fd41bb9",
  type: "text",
  content: "This is yet another text block",
  uniqueProperties: {},
};
const headingSmall: HeadingSmallBlock = {
  _id: "dccdab13-7757-4223-a40a-33377aaaadef",
  type: "heading_small",
  content: "Heading 3",
  uniqueProperties: {},
};
const plainText3: PlainTextBlock = {
  _id: "eced1b5a-4153-4508-82ad-f7acc60b3064",
  type: "text",
  content: "This is one last \n text block",
  uniqueProperties: {},
};
const checkbox: CheckboxBlock = {
  _id: "f957e0e5-ea30-40bf-bba4-e6286f19a96e",
  type: "checkbox",
  content: "This is a checkbox",
  uniqueProperties: {
    selected: true,
  },
};

export const noteBlocks: Note = {
  _id: "c085cb2d-358c-4289-88c4-d9d6baf13a7a",
  parentId: "8e1239e8-a94f-4313-a481-ac9883a4603b",
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
