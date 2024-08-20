//导入配置类型，用于后续对配置对象进行类型检查和约束
import type { Config } from "tailwindcss";

export default {
  //Tailwind CSS 的暗黑模式采用类名的方式来切换
  darkMode: "class",
  //Tailwind CSS 内置的一些基础重置样式。将其设置为 false 表示禁用了这些默认的重置样式
  corePlugins: {
    preflight: false,
  },
  //
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg_color: "var(--el-bg-color)",
        primary: "var(--el-color-primary)",
        text_color_primary: "var(--el-text-color-primary)",
        text_color_regular: "var(--el-text-color-regular)",
      },
    },
  },
} satisfies Config;
