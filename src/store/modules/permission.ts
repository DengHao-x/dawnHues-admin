import { defineStore } from "pinia";
import { contMenu } from "@/router/index";
import { filterAndBuildTree } from "@/router/utils";
import baseRoutes from "@/router/modules/baseRouter";
export const usePermissionStore = defineStore({
  id: "dawnPermissionStore",
  state: (): any => ({
    // 静态路由生成的菜单
    baseRoutes,
    // 整体路由生成的菜单
    allMenus: [],
    // 整体路由（一维数组格式）
    flatteningRoutes: [],
  }),
  actions: {
    handleAllMenus(routes: any) {
      this.allMenus = filterAndBuildTree(routes);
    },
  },
});
