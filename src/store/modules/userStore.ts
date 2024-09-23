import { defineStore } from "pinia";
import { userType } from "./types";
import { login } from "@/api/user/user";
import { setToken, setUserInfo, removeToken } from "@/utils/authentication";
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
  actions: {
    /** 存储用户名 */
    set_username(username: string) {
      this.username = username;
    },
    /** 存储头像 */
    set_avatar(avatar: string) {
      this.avatar = avatar;
    },
    set_roles(roles: string[]) {
      this.roles = roles;
    },
    /**登陆 */
    async loginUser(data: object) {
      return new Promise((resolve, reject) => {
        login(data)
          .then((res: any) => {
            if (res.data.success) {
              const { accessToken, expires } = res.data.data;
              setToken(accessToken, expires);
            }
            resolve(res.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    async loginOut() {
      removeToken();
    },
  },
});
