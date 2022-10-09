import type { NoteReference } from "@/types/note-reference";
import type { Folder, Workspace } from "@/types";

//Note References
const noteF: NoteReference = {
  noteID: "427583e4-4cf8-404f-9816-bc24a363b5ea",
  parentID: "5e072c5d-e62a-4fba-be9f-96d9ce3c8e17", //Folder E
  title: "Note F",
  createdTime: "1665330698",
  lastUpdatedTime: "1665330698",
};
const noteE: NoteReference = {
  noteID: "69c1e3e1-aeb8-4124-80ad-ed72d55dbc6f",
  parentID: "93d8e202-7fb6-498f-98a6-403fc1c383fb", //Folder D
  title: "Note E",
  createdTime: "1665330702",
  lastUpdatedTime: "1665330702",
};
const noteD: NoteReference = {
  noteID: "8178f175-f978-42ad-ab3c-46152d70d630",
  parentID: "51c75286-30c4-4c69-8ba3-4a40936b7a20", //Folder C
  title: "Note D",
  createdTime: "1665330705",
  lastUpdatedTime: "1665330705",
};
const noteC: NoteReference = {
  noteID: "ac010aea-f310-49e7-b7b5-666853cf44c8",
  parentID: "c8376768-e101-4c4a-954c-ca73b1cd8785", //Folder A
  title: "Note C",
  createdTime: "1665330708",
  lastUpdatedTime: "1665330708",
};
const noteB: NoteReference = {
  noteID: "ed78fa2c-292d-4f09-bfb6-fb44025b26db",
  parentID: null,
  title: "Note B",
  createdTime: "1665330711",
  lastUpdatedTime: "1665330711",
};
const noteA: NoteReference = {
  noteID: "7ffa36b2-1cb5-4c1e-ac84-7a949e95d339",
  parentID: null,
  title: "Note A",
  createdTime: "1665330714",
  lastUpdatedTime: "1665330714",
};

// Folders
const folderE: Folder = {
  folderID: "5e072c5d-e62a-4fba-be9f-96d9ce3c8e17",
  name: "Folder E",
  parentID: null,
  createdTime: "1665270323",
  lastUpdatedTime: "1665270323",
  numberOfItems: 1,
  content: [noteF],
};

const folderD: Folder = {
  folderID: "93d8e202-7fb6-498f-98a6-403fc1c383fb",
  name: "Folder D",
  parentID: "e21c48af-37b9-47d6-9d16-fa62c7f6552e",
  createdTime: "1665270319",
  lastUpdatedTime: "1665270319",
  numberOfItems: 1,
  content: [noteE],
};

const folderC: Folder = {
  folderID: "51c75286-30c4-4c69-8ba3-4a40936b7a20",
  name: "Folder C",
  parentID: "ab4f209b-eb28-4855-8c12-49a6b1e363da",
  createdTime: "1665270313",
  lastUpdatedTime: "1665270313",
  numberOfItems: 1,
  content: [noteD],
};

const folderB: Folder = {
  folderID: "e21c48af-37b9-47d6-9d16-fa62c7f6552e",
  name: "Folder B",
  parentID: "ab4f209b-eb28-4855-8c12-49a6b1e363da",
  createdTime: "1665270309",
  lastUpdatedTime: "1665270309",
  numberOfItems: 1,
  content: [folderD],
};

const folderA: Folder = {
  folderID: "ab4f209b-eb28-4855-8c12-49a6b1e363da",
  name: "Folder A",
  parentID: null,
  createdTime: "1665252899",
  lastUpdatedTime: "1665252899",
  numberOfItems: 3,
  content: [folderB, folderC, noteC],
};

//Workspace

export const workspaceMock: Workspace = {
  workspaceID: "c8376768-e101-4c4a-954c-ca73b1cd8785",
  content: [folderA, folderE, noteA, noteB],
};
