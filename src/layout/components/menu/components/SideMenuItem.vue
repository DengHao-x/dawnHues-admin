<template>
  <SideMenuLink :to="menuItem">
    <el-menu-item v-if="!hasChildren(menuItem)" :index="menuItem.path">
      <template #title>
        <span>{{ $t(menuItem?.meta.title) }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu teleported :index="menuItem.path" v-else>
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ $t(menuItem?.meta.title) }}</span></template
      >
      <side-menu-item v-for="child in menuItem.children" :key="child.id" :menuItem="child"></side-menu-item>
    </el-sub-menu>
  </SideMenuLink>
</template>

<script setup lang="ts">
import { type PropType, defineProps } from "vue";
import SideMenuLink from "./SideMenuLink.vue";
import { menuType } from "../../../type";

const props = defineProps({
  menuItem: {
    type: Object as PropType<any>,
  },
});

const hasChildren = (item: menuType) => {
  return item.children && item.children.length > 0;
};
</script>
<style scoped lang="scss"></style>
