import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { resolve } from "path";

import { viteMockServe } from "vite-plugin-mock";
const pathResolve = (dir: string): any => {
  return resolve(__dirname, ".", dir);
};
const alias: Record<string, string> = {
  "@": pathResolve("src"),
};
// command 区分项目所处的环境
export default defineConfig(({ command }) => {
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "./src/mock",
        enable: command === "serve",
      }),
    ],
    resolve: {
      alias,
    },
  };
});
