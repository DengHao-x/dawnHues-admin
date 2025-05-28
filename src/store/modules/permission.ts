import { defineStore } from "pinia";

import { filterAndBuildTree, filterMetaTree, sortRoutesByRank } from "@/router/utils";
import { staticRoutingList } from "@/router/index";
export const usePermissionStore = defineStore({
  id: "dawnPermissionStore",
  state: (): any => ({
    // 静态路由生成的菜单
    staticRoutingList,
    // （静态、动态）整体路由生成的菜单
    allMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
  }),
  actions: {
    handleAllMenus(routes: any[]) {
      const rankRouters = sortRoutesByRank(this.staticRoutingList.concat(routes));
      const rankRoutersFilter = filterMetaTree(rankRouters);
      console.log("rankRoutersFilter", rankRouters, this.staticRoutingList, rankRoutersFilter);
      this.allMenus = filterAndBuildTree(rankRoutersFilter);
    },
  },
});
