import { type Router, createRouter, type RouteRecordRaw, type RouteComponent, createWebHashHistory } from "vue-router";
import NProgress from "@/utils/nprogress";
import baseRoutes from "./modules/baseRouter";
import { getToken, removeToken } from "@/utils/authentication";
import { initRouter, sortRoutesByRank, findToPath } from "@/router/utils";
/** 路由白名单 */
const whiteList = ["/login"];

/** 本地静态路由（未做任何处理） */
export const staticRoutingList = baseRoutes;
/** 创建路由实例 */
export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutingList as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  console.log(to, from, getToken(), "getToken()");
  if (getToken()) {
    await initRouter().then((router: any) => {
      const route = findToPath(to.path, router.options.routes[0].children);
      if (route && route.meta?.title) {
        // router.push(to.fullPath);
      }
      console.log(to.path, "route29");
      // router.push(to.fullPath);
      // if (to.name) router.push(to.fullPath);

      console.log(router, router.options.routes[0].children, "1122");
    });
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
