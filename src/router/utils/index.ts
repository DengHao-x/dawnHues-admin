import { getAsyncRouter } from "@/api/asyncRouter";
import { deepClone } from "@/utils/utils";
import { type RouteRecordRaw } from "vue-router";
import router from "../index";
// 初始化路由
export const initRouter = async () => {
  return new Promise((resolve) => {
    getAsyncRouter().then((res: any) => {
      console.log(res.data);
      handleAsyncRouter(deepClone(res.data.data));
      resolve(res.data);
    });
  });
};

//处理后端传过来的动态路由
const handleAsyncRouter = (ayncRouterList: Array<RouteAllConfigs>) => {
  const aa = filterAsyncRouter(ayncRouterList);
  console.log(aa, "ayncRouterList");
  router.options.routes.push(ayncRouterList[0]);
  router.addRoute(ayncRouterList);
  console.log(router, "router");
};

/**
 *
 * @description 处理后端传过来的动态路由，生成前端规范的路由
 * @param {Array<RouteRecordRaw>} ayncRouterList
 * @return {*}
 */
const filterAsyncRouter = (ayncRouterList: Array<RouteRecordRaw>) => {
  //判断是否为空
  if (ayncRouterList && !ayncRouterList.length) return;

  const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");
  const modulesRoutesKeys = Object.keys(modulesRoutes);
  console.log(modulesRoutes, modulesRoutesKeys, "modulesRoutesKeys");
  ayncRouterList.forEach((item: RouteRecordRaw) => {
    console.log(item, "item");
    const index = modulesRoutesKeys.findIndex((ev) => ev.includes(item.path));
    item.component = modulesRoutes[modulesRoutesKeys[index]];
    if (item?.children && item.children.length) {
      filterAsyncRouter(item.children);
    }
  });
  return ayncRouterList;
};
