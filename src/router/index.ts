import { type Router, createRouter, type RouteRecordRaw, type RouteComponent, createWebHashHistory } from "vue-router";
import NProgress from "@/utils/nprogress";
import baseRoutes from "./modules/baseRouter";
import { getToken, removeToken } from "@/utils/authentication";
import { initRouter } from "@/router/utils";
/** 路由白名单 */
const whiteList = ["/login"];

/** 创建路由实例 */
export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: baseRoutes as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  console.log(to, from, getToken(), "getToken()");
  if (getToken()) {
    initRouter().then(() => {});
    if (to.path === "/") {
      next("/home");
    } else {
      next();
    }
  } else {
    if (to.path !== "/login") {
      if (whiteList.indexOf(to.path) !== -1) {
        next();
      } else {
        removeToken();
        next({ path: "/login" });
      }
    } else {
      next();
    }
  }
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
