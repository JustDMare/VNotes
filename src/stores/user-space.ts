import { defineStore } from "pinia";
import type { UserSpace } from "vnotes-types";
import { useAuth0 } from "@auth0/auth0-vue";

export const useUserSpaceStore = defineStore("userSpace", {
  state: () => ({
    userSpace: {
      _id: "",
      content: { folders: [], notes: [] },
      userToken: "ThisIsAUserToken",
    } as UserSpace,
    auth0: useAuth0(),
    authAccessToken: "",
  }),
  getters: {},
  actions: {
    //TODO: Error Handling and Documentation
    async fetchAllUserSpaceContent(): Promise<void> {
      this.authAccessToken = await this.auth0.getAccessTokenSilently();
      console.log(this.auth0.idTokenClaims);
      console.log(this.auth0.user);
      fetch(`http://localhost:3030/user-space/${this.userSpace.userToken}`, {
        headers: {
          Authorization: `Bearer ${this.authAccessToken}`,
        },
      }).then((data) =>
        data.json().then((json) => {
          console.log("hi");
          this.userSpace._id = json.userSpace._id;
          this.userSpace.userToken = json.userSpace.userToken;
          this.userSpace.content = json.contentTree;
        })
      );
    },
  },
});
