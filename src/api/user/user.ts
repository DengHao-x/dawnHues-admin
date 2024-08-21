import { request } from "@/utils/https/request";

/** 登录 */
export const login = (data?: object) => {
  return request.post("/user/login", { data });
};

// 登陆人信息
export const getUserInfo = (params?: object) => {
  return request.get("/user/info", params);
};
