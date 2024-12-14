import { getAsyncRouter } from "@/api/asyncRouter";
import { deepClone } from "@/utils/utils";
import { type RouteRecordRaw } from "vue-router";
import { usePermissionStore } from "@/store/modules/permission";
import { getUserInfo } from "@/utils/authentication";
import router from "../index";
import iframeView from "@/layout/components/iframe/index.vue";
// 初始化路由
export const initRouter = async () => {
  return new Promise((resolve) => {
    getAsyncRouter().then((res: any) => {
      handleAsyncRouter(deepClone(res.data.data));
      resolve(res.data);
    });
  });
};

/**
 * 扁平化嵌套的路由数组
 * @param {RouteRecordRaw} nestedRoutes 嵌套的多级路由
 * @returns {Array<RouteRecordRaw>} 扁平化后的路由
 */
const flattenRoutes = (nestedRoutes: RouteRecordRaw[]): RouteRecordRaw[] => {
  const flatRoutes: any = [];
  let idCounter = 0;
  const processRoutes = (routes: Array<RouteRecordRaw>, parentId: number | null = null) => {
    routes.forEach((route) => {
      // 创建唯一 id，并设定父级 id
      const routeId = idCounter++;
      // 去除嵌套结构，将路由推入平铺数组
      const { children, ...rest } = route;
      const flatRoute = { ...rest, id: routeId, parentId };

      // 将当前路由添加到平铺数组
      flatRoutes.push(flatRoute);
      // 如果存在子路由，则继续递归处理
      if (children && children.length) {
        processRoutes(children, routeId);
      }
    });
  };

  // 开始处理传入的嵌套路由
  processRoutes(nestedRoutes);
  return flatRoutes;
};
/**
 * 根据 meta.rank 字段对路由数组进行升序排序
 * @param routes 路由数组
 * @returns 排序后的路由数组
 */
const sortRoutesByRank = (routes: any[]) => {
  // 递归排序函数
  const sortByRank = (routes: any[]): void => {
    routes.sort((a, b) => {
      const rankA = a.meta?.rank ?? Infinity; // 如果没有 rank 字段，默认无穷大
      const rankB = b.meta?.rank ?? Infinity;
      return rankA - rankB;
    });
    // 递归排序子路由
    routes.forEach((route) => {
      if (route.children && route.children.length) {
        sortByRank(route.children);
      }
    });
  };
  // 调用排序函数
  sortByRank(routes);
  return routes;
};
// 根据当前的用户权限标识过滤无权限的
const filterAndBuildTree = (routes: any[]): any[] => {
  const userInfo = getUserInfo();
  const userRoles = userInfo?.roles || [];
  // 检查用户是否有权限访问该路由，如果没有 roles 限制，默认所有用户可访问
  const hasPermission = (route: any): boolean => {
    const routeRoles = route.meta?.roles;
    return !routeRoles || routeRoles.some((role: any) => userRoles.includes(role));
  };

  // 过滤出用户有权限访问的路由菜单
  const filteredRoutes = routes.filter((route) => hasPermission(route));

  // 构建树形结构
  const buildTree = (list: any[], parentId: number | null): any[] => {
    return list
      .filter((route) => route.parentId === parentId)
      .map((route) => {
        const children = buildTree(list, route.id);

        return children.length ? { ...route, children } : route;
      });
  };

  return buildTree(filteredRoutes, null);
};
//处理后端传过来的动态路由
const handleAsyncRouter = (ayncRouterList: any) => {
  const frontEndRouerList = generateFrontEndRouter(ayncRouterList);
  flattenRoutes(frontEndRouerList).forEach((routeItem) => {
    const childrenOne = router.options.routes[0].children || [];
    if (childrenOne.findIndex((value) => value.path === routeItem.path) === -1) {
      childrenOne.push(routeItem);
      sortRoutesByRank(childrenOne);
      const flattenRouters: any = router.getRoutes().find((n) => n.path === "/");
      router.addRoute(flattenRouters);
    }
  });
  usePermissionStore().handleAllMenus(router.options.routes[0].children);
};
/**
 * 处理后端传过来的动态路由，生成前端规范的路由
 * @param {Array<RouteRecordRaw>} ayncRouterList 动态路由列表
 * @return {*}
 */
const generateFrontEndRouter = (ayncRouterList: Array<RouteRecordRaw>) => {
  //判断是否为空
  if (!ayncRouterList || ayncRouterList.length === 0) return [];

  // 动态导入组件
  const modulesRoutes = import.meta.glob("/src/views/**/*.{vue,tsx}");
  const modulesRoutesKeys = Object.keys(modulesRoutes);

  ayncRouterList.forEach((item: RouteRecordRaw) => {
    // 判断是否为父级路由且没有定义name
    if (item?.children && item.children.length && !item.name) {
      item.name = (item.children[0].name as string) + "parent";
    }

    // 自动设置重定向到第一个子路由的路径
    if (item?.children && !item.redirect && item.children.length) {
      item.redirect = item.children[0].path;
    }
    // 判断是否是iframe
    if (item.meta?.iframeSrc) {
      // 如果是iframe，跳过设置 component
      item.component = iframeView;
    } else if (!item?.children) {
      // 如果没有子路由，则需要设置 component
      const index = item?.component
        ? modulesRoutesKeys.findIndex((ev) => ev.includes(item.component as any))
        : modulesRoutesKeys.findIndex((ev) => ev.includes(item.path));
      if (index !== -1) {
        item.component = modulesRoutes[modulesRoutesKeys[index]];
      }
    }
    // 递归处理子路由
    if (item?.children && item.children.length) {
      generateFrontEndRouter(item.children);
    }
  });

  return ayncRouterList;
};

export { sortRoutesByRank, filterAndBuildTree };
