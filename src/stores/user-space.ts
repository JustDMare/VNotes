import { defineStore } from "pinia";
import type { UserSpace } from "vnotes-types";

export const useUserSpaceStore = defineStore("userSpace", {
  state: () => ({
    userSpace: {
      _id: "",
      content: { folders: [], notes: [] },
      userToken: "ThisIsAUserToken",
    } as UserSpace,
  }),
  getters: {},
  actions: {
    //TODO: Error Handling and Documentation
    fetchAllUserSpaceContent(): void {
      fetch(`http://localhost:3030/user-space/${this.userSpace.userToken}`).then((data) =>
        data.json().then((json) => {
          this.userSpace._id = json.userSpace._id;
          this.userSpace.userToken = json.userSpace.userToken;
          this.userSpace.content = json.contentTree;
        })
      );
    },
  },
});
