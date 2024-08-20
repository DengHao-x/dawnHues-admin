<script setup lang="ts">
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { ref } from "vue";
const currentLocale = ref(zhCn);
</script>

<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
  </el-config-provider>
</template>
