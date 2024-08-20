import { defineStore } from "pinia";
import { userType } from "./types";

export const useUserStore = defineStore({
  id: "dawnuserStore",
  state: (): userType => ({
    avatar: "",
    username: "",
    roles: [],
    accessToken: "",
    refreshToken: "",
  }),
  actions: {},
});
