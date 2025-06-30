import { type Router, createRouter, type RouteRecordRaw, type RouteComponent, createWebHashHistory } from "vue-router";
import NProgress from "@/utils/nprogress";
import { baseRoutes, whiteListRouter } from "./modules/baseRouter";
import { getToken, removeToken } from "@/utils/authentication";
import { initRouter, sortRoutesByRank, findToPath, formatTwoStageRoutes, formatFlatteningRoutes } from "@/router/utils";
import { buildHierarchyTree } from "@/utils/handleTree";
/** 路由白名单 */
const whiteList = ["/login"];

/** 本地静态路由（未做任何处理） */
export const staticRoutingList = formatTwoStageRoutes(formatFlatteningRoutes(buildHierarchyTree(baseRoutes)));

/** 用于菜单渲染，未作处理 */
export const staticMenus = baseRoutes;
/** 创建路由实例 */
export const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: staticRoutingList.concat(...(whiteListRouter as RouteRecordRaw[])),
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (getToken()) {
    await initRouter().then((router: any) => {});
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
