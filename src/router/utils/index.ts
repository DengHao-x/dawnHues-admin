import { getAsyncRouter } from "@/api/asyncRouter";

// 初始化路由
export const initRouter = async () => {
  const asyncRouter = await getAsyncRouter();
  console.log(asyncRouter);
};
