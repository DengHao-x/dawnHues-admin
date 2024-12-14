<template>
  <header>
    <div class="header flex justify-between items-center p-4">
      <div></div>
      <el-switch inline-prompt v-model="isDark" @click="toggle" :active-icon="Moon" :inactive-icon="Sunny">
        切换</el-switch
      >
    </div>
    <el-dropdown placement="bottom-start">
      <el-button> 切换 </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="transformCh">中文</el-dropdown-item>
          <el-dropdown-item @click="transformnEn">English</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue";
import { Moon, Sunny } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useTransformLang } from "@/hooks/useTransformLang";
const { isDark, toggle } = useDarkMode();

const { transformCh, transformnEn } = useTransformLang();

/**
 * 路由对象
 */
const route = useRoute();
/**
 * 路由实例
 */
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
 * 数据部分
 */
const data = reactive({});
onBeforeMount(() => {
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
});
onMounted(() => {
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
});
watchEffect(() => {});
// 使用toRefs解构
// let { } = { ...toRefs(data) }
defineExpose({
  ...toRefs(data),
});
</script>
<style scoped lang="less"></style>
