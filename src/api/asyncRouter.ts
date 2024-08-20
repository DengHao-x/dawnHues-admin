import { request } from "@/utils/https/request";

// 获取异步路由
export const getAsyncRouter = (params?: object) => {
  return request.get("/asyncRoutes/getRouter", params);
};
