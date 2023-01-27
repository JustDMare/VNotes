import { defineStore } from "pinia";
import type { UserSpace } from "vnotes-types";
import { useAuth0 } from "@auth0/auth0-vue";

export const useUserSpaceStore = defineStore("userSpace", {
  state: () => ({
    userSpace: {
      _id: "",
      content: { folders: [], notes: [] },
    } as UserSpace,
    auth0: useAuth0(),
    authAccessToken: "",
  }),
  getters: {},
  actions: {
    //TODO: Error Handling and Documentation
    async fetchAllUserSpaceContent(): Promise<void> {
      this.authAccessToken = await this.auth0.getAccessTokenSilently();
      fetch("http://localhost:3030/user-space/", {
        headers: {
          Authorization: `Bearer ${this.authAccessToken}`,
        },
      }).then((data) =>
        data.json().then((json) => {
          this.userSpace._id = json.userSpace._id;
          this.userSpace.content = json.contentTree;
        })
      );
    },
  },
});
