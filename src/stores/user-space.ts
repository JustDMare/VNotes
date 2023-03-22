import { useEditorStore } from "@/stores/editor";
import { defineStore } from "pinia";
import type { UserSpace } from "vnotes-types";
import { useAuth0 } from "@auth0/auth0-vue";
import { i18n } from "@/i18n/i18n.plugin";

export const useUserSpaceStore = defineStore("userSpace", {
  state: () => ({
    userSpace: {
      _id: "",
      content: { folders: [], notes: [] },
    } as UserSpace,
    parentHashTable: new Object(null),
    editorStore: useEditorStore(),
    auth0: useAuth0(),
  }),

  getters: {},
  actions: {
    //TODO: Error Handling and Documentation
    async fetchAllUserSpaceContent(): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      const locale = i18n.global.locale.value;
      fetch(`http://localhost:3030/user-space/${locale}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((data) =>
        data.json().then((json) => {
          this.userSpace._id = json.userSpace._id;
          this.userSpace.content = json.contentTree;
          this.parentHashTable = json.parentHashTable;
        })
      );
    },
    async createFolder(folderName: string, parentId: string | null): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch("http://localhost:3030/folders/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name: folderName, parentId: parentId }),
      })
        .then(() => {
          this.fetchAllUserSpaceContent().catch((error) => {
            console.log(error);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createNote(noteTitle: string, parentId: string | null): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch("http://localhost:3030/notes/create", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title: noteTitle, parentId: parentId }),
      })
        .then((data) =>
          data
            .json()
            .then((json) => {
              this.router.push({ name: "editor", params: { id: json.note._id } });
            })
            .catch((error) => {
              console.log(error);
            })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    async renameFolder(folderId: string, folderNewName: string): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch("http://localhost:3030/folders/rename", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ _id: folderId, name: folderNewName }),
      })
        .then((data) =>
          data
            .json()
            .then(async () => {
              await this.fetchAllUserSpaceContent().catch((error) => {
                console.log(error);
              });
            })
            .catch((error) => {
              console.log(error);
            })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    async renameNote(noteId: string, noteNewTitle: string): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch("http://localhost:3030/notes/rename", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ _id: noteId, title: noteNewTitle }),
      })
        .then((data) =>
          data
            .json()
            .then(async (json) => {
              await this.fetchAllUserSpaceContent().catch((error) => {
                console.log(error);
              });
              this.editorStore.fetchNote(json.note._id);
            })
            .catch((error) => {
              console.log(error);
            })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteFolder(folderId: string): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      const noteInEditorId = this.editorStore.noteInEditor?._id;
      let deleteRequestParams = undefined;
      if (noteInEditorId) {
        deleteRequestParams = {
          noteId: noteInEditorId,
        };
      }
      const response = await fetch(
        `http://localhost:3030/folders/delete/${folderId}?` +
          new URLSearchParams(deleteRequestParams),
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const jsonData = await response.json();
      if (jsonData.error) {
        console.log(jsonData.error);
        return;
      }
      if (jsonData.noteBelongsToFolder) {
        this.router.push({ name: "workspace" });
      } else {
        this.fetchAllUserSpaceContent().catch((error) => {
          console.log(error);
        });
      }
    },
    async deleteNote(noteId: string): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch(`http://localhost:3030/notes/delete/${noteId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((data) =>
          data
            .json()
            .then(async () => {
              if (this.editorStore.noteInEditor?._id === noteId) {
                this.router.push({ name: "workspace" });
              } else {
                await this.fetchAllUserSpaceContent().catch((error) => {
                  console.log(error);
                });
              }
            })
            .catch((error) => {
              console.log(error);
            })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    async moveFolder(folderId: string, newParentId: string | null): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch("http://localhost:3030/folders/move", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ _id: folderId, parentId: newParentId }),
      })
        .then((data) =>
          data
            .json()
            .then(async () => {
              await this.fetchAllUserSpaceContent().catch((error) => {
                console.log(error);
              });
            })
            .catch((error) => {
              console.log(error);
            })
        )
        .catch((error) => {
          console.log(error);
        });
    },
    async moveNote(noteId: string, newParentId: string | null): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch("http://localhost:3030/notes/move", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ _id: noteId, parentId: newParentId }),
      })
        .then((data) =>
          data
            .json()
            .then(async () => {
              await this.fetchAllUserSpaceContent().catch((error) => {
                console.log(error);
              });
            })
            .catch((error) => {
              console.log(error);
            })
        )
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
