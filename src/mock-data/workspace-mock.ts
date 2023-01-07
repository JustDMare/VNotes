import type { Folder, UserSpace, NavigationNoteReference } from "vnotes-types";

//Note References
const noteF: NavigationNoteReference = {
  _id: "427583e4-4cf8-404f-9816-bc24a363b5ea",
  parentId: "5e072c5d-e62a-4fba-be9f-96d9ce3c8e17", //Folder E
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  title: "Note F",
};
const noteE: NavigationNoteReference = {
  _id: "69c1e3e1-aeb8-4124-80ad-ed72d55dbc6f",
  parentId: "93d8e202-7fb6-498f-98a6-403fc1c383fb", //Folder D
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  title: "Note E",
};
const noteD: NavigationNoteReference = {
  _id: "8178f175-f978-42ad-ab3c-46152d70d630",
  parentId: "51c75286-30c4-4c69-8ba3-4a40936b7a20", //Folder C
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  title: "Note D",
};
const noteC: NavigationNoteReference = {
  _id: "ac010aea-f310-49e7-b7b5-666853cf44c8",
  parentId: "c8376768-e101-4c4a-954c-ca73b1cd8785", //Folder A
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  title: "Note C",
};
const noteB: NavigationNoteReference = {
  _id: "ed78fa2c-292d-4f09-bfb6-fb44025b26db",
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  parentId: undefined,
  title: "Note B",
};
const noteA: NavigationNoteReference = {
  _id: "7ffa36b2-1cb5-4c1e-ac84-7a949e95d339",
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  parentId: undefined,
  title: "Note A",
};

// Folders
const folderE: Folder = {
  _id: "5e072c5d-e62a-4fba-be9f-96d9ce3c8e17",
  name: "Folder E",
  parentId: undefined,
  numberOfItems: 1,
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  content: { folders: [], notes: [noteF] },
};

const folderD: Folder = {
  _id: "93d8e202-7fb6-498f-98a6-403fc1c383fb",
  name: "Folder D",
  parentId: "e21c48af-37b9-47d6-9d16-fa62c7f6552e",
  numberOfItems: 1,
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  content: { folders: [], notes: [noteE] },
};

const folderC: Folder = {
  _id: "51c75286-30c4-4c69-8ba3-4a40936b7a20",
  name: "Folder C",
  parentId: "ab4f209b-eb28-4855-8c12-49a6b1e363da",
  numberOfItems: 1,
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  content: { folders: [], notes: [noteD] },
};

const folderB: Folder = {
  _id: "e21c48af-37b9-47d6-9d16-fa62c7f6552e",
  name: "Folder B",
  parentId: "ab4f209b-eb28-4855-8c12-49a6b1e363da",
  numberOfItems: 1,
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  content: { folders: [folderD], notes: [] },
};

const folderA: Folder = {
  _id: "ab4f209b-eb28-4855-8c12-49a6b1e363da",
  name: "Folder A",
  parentId: undefined,
  numberOfItems: 3,
  createdTime: "1673086339",
  lastUpdatedTime: "1673086339",
  content: { folders: [folderB, folderC], notes: [noteC] },
};

//Workspace

export const userSpaceMock: UserSpace = {
  _id: "c8376768-e101-4c4a-954c-ca73b1cd8785",
  userToken: "asdafsakh",
  content: { folders: [folderA, folderE], notes: [noteA, noteB] },
};
