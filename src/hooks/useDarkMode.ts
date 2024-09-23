/**
 * @description 全局切换明暗主题切换
 */

import { useDark, useToggle } from "@vueuse/core";

export function useDarkMode() {
  const isDark = useDark({
    // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
    storageKey: "useDarkKEY",
    // 高亮class名字
    valueLight: "light",
    // 暗黑class名字
    valueDark: "dark",
  });
  const toggle = () => {
    useToggle(isDark);
  };

  return { isDark, toggle };
}
