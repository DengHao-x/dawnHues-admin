//声明对于所有以 .vue 结尾的模块，其导入的内容是一个 Vue 组件类型
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.scss" {
  const scss: Record<string, string>;
  export default scss;
}
