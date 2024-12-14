/**
 * i18n国际化
 *  */
import { type I18n, createI18n } from "vue-i18n";
import type { WritableComputedRef } from "vue";
// element-plus国际化
import enLocale from "element-plus/es/locale/lang/en";
import zhLocale from "element-plus/es/locale/lang/zh-cn";

import en from "@/locales/en";
import zh from "@/locales/zh-CN";

const messages = {
  en: {
    ...en,
    ...enLocale,
  },
  zh: {
    ...zh,
    ...zhLocale,
  },
};

const localeLang = localStorage.getItem("lang");

//此函数只是配合i18n Ally插件来进行国际化智能提示，并无实际意义
export const $t = (key: string) => key;
export const i18n: I18n = createI18n({
  locale: localeLang || "zh",
  legacy: false,
  fallbackLocale: "en", // 设置备用语言
  messages,
});
