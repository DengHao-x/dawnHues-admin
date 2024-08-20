//当前用户信息类型
export type userType = {
  /** 头像 */
  avatar: string;
  /** 用户名 */
  username: string;
  /** 当前登录用户的角色 */
  roles: Array<string>;
  /** `token` */
  accessToken: string;
  /** 用于调用刷新`accessToken`的接口时所需的`token` */
  refreshToken: string;
};
