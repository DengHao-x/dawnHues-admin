import { defineStore } from "pinia";
import { userType } from "./types";

export const useUserStore = defineStore({
  id: "dawnuserStore",
  state: (): userType => ({
    //头像
    avatar: "",
    //用户名
    username: "",
    //角色页面权限
    roles: [],
    //token
    accessToken: "",
    //刷新token
    refreshToken: "",
  }),
  actions: {},
});
