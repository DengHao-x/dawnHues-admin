// 全局路由类型声明
import type { RouteComponent, RouteLocationNormalized } from "vue-router";
declare global {
  interface RouteMeta {
    // 菜单名称
    title: string;
    // 菜单图标
    icon?: string;
    // 是否在菜单中显示（默认`true`）`可选`
    showLink?: boolean;
    // 是否显示父级菜单 `可选`
    showParent?: boolean;
    // 是否隐藏
    isHide?: boolean;
    //路由组件缓存
    isKeepAlive?: boolean;
    rank?: number;
  }
  interface RouteChildren {
    //路由地址
    path: string;
    // 路由名称 (和当前组件的`name`保持一致,不要重复）
    name?: string;
    // 路由重定向 可选
    redirect?: string;
    // 路由组件 可选
    component?: RouteComponent;
    // 路由元信息 可选
    meta: RouteMeta;
  }
  interface RouteConfigsTable {
    //路由地址
    path: string;
    // 路由名称 (和当前组件的`name`保持一致,不要重复）
    name?: string;
    // 路由重定向 可选
    redirect?: string;
    // 路由组件 可选
    component?: RouteComponent;
    // 路由元信息 可选
    meta: RouteMeta;
    // 子路由 可选
    children?: Array<RouteChildren>;
  }
}
