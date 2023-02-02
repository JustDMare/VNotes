import { useEditorStore } from "@/stores/editor";
import { defineStore } from "pinia";
import type { UserSpace } from "vnotes-types";
import { useAuth0 } from "@auth0/auth0-vue";

export const useUserSpaceStore = defineStore("userSpace", {
  state: () => ({
    userSpace: {
      _id: "",
      content: { folders: [], notes: [] },
    } as UserSpace,
    editorStore: useEditorStore(),
    auth0: useAuth0(),
  }),

  getters: {},
  actions: {
    //TODO: Error Handling and Documentation
    async fetchAllUserSpaceContent(): Promise<void> {
      const accessToken = await this.auth0.getAccessTokenSilently();
      fetch("http://localhost:3030/user-space", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((data) =>
        data.json().then((json) => {
          this.userSpace._id = json.userSpace._id;
          this.userSpace.content = json.contentTree;
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
      fetch(`http://localhost:3030/folders/delete/${folderId}`, {
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
  },
});
