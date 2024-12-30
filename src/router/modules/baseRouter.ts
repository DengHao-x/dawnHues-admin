import layout from "../../layout/index.vue";
import { $t } from "@/plugins/i18n";
const baseRoutes = [
  {
    path: "/",
    redirect: "/home",
    component: layout,
    meta: {
      title: $t("menu.home"),
      showLink: false,
      rank: 0,
    },
    children: [
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
    ],
  },
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
    path: "/error",
    component: layout,
    meta: {
      title: $t("menu.dawnError"),
      showLink: false,
      rank: 2,
    },
    children: [
      {
        path: "/error/404",
        name: "404",
        component: () => import("@/views/error/404.vue"),
        meta: {
          title: $t("menu.dawnError"),
        },
      },
    ],
  },
];

export default baseRoutes;
