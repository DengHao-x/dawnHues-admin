import { createApp } from "vue";
import "./styles/reset.scss";
import ElementPlus from "element-plus";
// 注册element-plus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import App from "./App.vue";
import router from "./router";
import { initializationStore } from "@/store";

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
//初始化状态管理
initializationStore(app);
app.mount("#app");
