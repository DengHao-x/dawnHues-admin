/**
 * 模拟动态路由接口
 * roles：页面级别权限，模拟二种 "admin"、"common-role"
 * admin：系统管理员角色
 * common-role：普通角色
 */
const systemManagementRouter = {
  path: "/system",
  name: "system",
  meta: {
    title: "menu.dawnSystemName",
    icon: "ep:lollipop",
    rank: 10,
  },
  children: [
    {
      path: "/system/user/index",
      name: "systemUser",
      meta: {
        title: "menu.dawnSystemUser",
        roles: ["admin", "common-role"],
        buttons: ["permission:btn:add", "permission:btn:edit", "permission:btn:delete"],
      },
    },
    {
      path: "/system/menu/index",
      name: "systemMenu",
      meta: {
        title: "menu.dawnSystemRolo",
        roles: ["admin", "common-role"],
      },
    },
  ],
};
const permissionRouter = {
  path: "/permission",
  name: "permission",
  meta: {
    title: "menu.dawnPermission",
    icon: "ep:lock",
    rank: 4,
  },
  children: [
    {
      path: "/permission/role/index",
      name: "permissionRole",
      meta: {
        title: "menu.dawnSystemRolo",
        roles: ["admin", "common-role"],
      },
    },
  ],
};
const iframeRouter = {
  path: "/iframe",
  meta: {
    icon: "ri:links-fill",
    title: "menu.dawnOutsideChain",
    rank: 13,
  },
  children: [
    {
      path: "/iframe/embedded",
      meta: {
        title: "menu.dawnOutsideChain",
      },
      children: [
        {
          path: "/iframe/vue-router",
          name: "iframeVueRouter",
          meta: {
            title: "menu.dawnOutsideChain",
            iframeSrc: "https://router.vuejs.org/",
            keepAlive: true,
            roles: ["admin", "common"],
          },
        },
        {
          path: "/iframe/doubao",
          name: "iframeDuo",
          meta: {
            title: "menu.dawnOutsideChain",
            iframeSrc: "https://www.doubao.com/chat/167515326344450",
            keepAlive: true,
            roles: ["admin", "common"],
          },
        },
      ],
    },
    {
      path: "/iframe/external",
      meta: {
        title: "menu.dawnOutsideChain",
        name: "iframeExternal",
      },
      children: [
        {
          path: "/external",
          name: "https://pure-admin.github.io/pure-admin-doc",
          meta: {
            title: "menu.dawnOutsideChain",
            roles: ["admin", "common"],
          },
        },
        {
          path: "/pureUtilsLink",
          name: "https://pure-admin-utils.netlify.app/",
          meta: {
            title: "menu.dawnOutsideChain",
            roles: ["admin", "common"],
          },
        },
      ],
    },
  ],
};
export default [
  // 获取用户信息接口
  {
    url: "/asyncRoutes/getRouter",
    method: "get",
    response: (request: any) => {
      // 有就返回成功信息
      return {
        code: 200,
        data: [systemManagementRouter, permissionRouter, iframeRouter],
      };
    },
  },
];
