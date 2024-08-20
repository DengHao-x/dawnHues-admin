import type { App } from "vue";
import { createPinia } from "pinia";
const store = createPinia();

//初始化引入store
export function initializationStore(app: App<Element>) {
  app.use(store);
}
