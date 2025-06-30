import { defineStore } from "pinia";

import { filterAndBuildTree, filterMetaTree, sortRoutesByRank } from "@/router/utils";
import { staticRoutingList, staticMenus } from "@/router/index";
export const usePermissionStore = defineStore({
  id: "dawnPermissionStore",
  state: (): any => ({
    // 静态路由生成的菜单
    staticMenus,
    // （静态、动态）整体路由生成的菜单
    allMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
  }),
  actions: {
    // 处理所有菜单
    handleAllMenus(routes: any[]) {
      // 排序
      const rankRouters = sortRoutesByRank(this.staticMenus.concat(routes));
      console.log(routes, rankRouters, "rankRouters");
      const rankRoutersFilter = filterMetaTree(rankRouters);
      console.log(rankRoutersFilter, "rankRoutersFilter");
      this.allMenus = filterAndBuildTree(rankRoutersFilter);
      console.log(this.allMenus, "this.allMenus");
    },
  },
});
