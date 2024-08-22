/**
 * 模拟动态路由接口
 * roles：页面级别权限，模拟二种 "admin"、"common-role"
 * admin：系统管理员角色
 * common-role：普通角色
 */

const systemManagementRouter = {
  path: "/system",
  meta: {
    title: "系统管理",
    icon: "ep:lollipop",
    rank: 10,
  },
  children: [
    {
      path: "/system/index",
      name: "system",
      meta: {
        title: "用户管理",
        roles: ["admin", "common-role"],
      },
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
        data: {
          systemManagementRouter,
        },
      };
    },
  },
];
