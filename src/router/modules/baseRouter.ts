const baseRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      showLink: false,
      rank: 101,
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页",
      showLink: false,
      rank: 1,
    },
  },
];

export default baseRoutes;
