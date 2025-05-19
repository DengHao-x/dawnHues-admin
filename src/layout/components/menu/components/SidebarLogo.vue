<template>
  <div class="sidebar-logo">
    <transition enter-active-class="animate__animated animate__fadeInLeft">
        <router-link to="/">
            <img class="w-[20px] h-[20px]" src="http://localhost:3001/src/assets/logo.png" alt="">
          
            </img>
            <span v-if="!collapse" class="title">
          {{ defaultSettings.title }}
        </span>
        </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
import defaultSettings from '@/config/settings';
defineProps({
  // 侧边栏是否折叠
  collapse: {
    type: Boolean,
    required: true,
  },
});
</script>
<style scoped lang='scss'>
.sidebar-logo{
  width: 100%;
  height: 50px;
  display: flex; 
  justify-content: center;
  align-items: center;
  background-color: white;
  .title{
    flex-shrink: 0;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    color: var(--sidebar-logo-text-color);
  }
}
</style>