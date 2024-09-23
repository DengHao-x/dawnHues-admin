<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { ref, watch } from "vue";
const currentLocale = ref(zhCn);
import { useDarkMode } from "@/hooks/useDarkMode";
const { isDark, toggle } = useDarkMode();
//监听 isDark，解决刷新丢失问题
watch(isDark, toggle);
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>
