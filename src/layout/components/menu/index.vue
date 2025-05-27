<template>
  <div class="h-[100%] border-r-[1px]">
    <sildebarLogo v-bind:collapse="false"></sildebarLogo>
    <el-menu ref="menuRef" router :default-active="defaultActive">
      <SideMenuItem v-for="route in menuData" :key="route.path" :menuItem="route"></SideMenuItem>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, toRefs, onBeforeMount, onMounted, watchEffect, computed } from "vue";
import { usePermissionStore } from "@/store/modules/permission";
import { useRoute, useRouter } from "vue-router";
import SideMenuItem from "./components/SideMenuItem.vue";
import { useTransformLang } from "@/hooks/useTransformLang";
import sildebarLogo from "./components/SidebarLogo.vue";
const menuRef = ref();
const { locale } = useTransformLang(menuRef);

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
const menuData = computed(() => {
  return usePermissionStore().allMenus;
});
const defaultActive = computed(() => route.path); // 当前激活路径
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
  ...toRefs(menuData),
});
</script>
<style scoped lang="sass"></style>
