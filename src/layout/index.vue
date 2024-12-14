<template>
  <div class="w-full h-full flex">
    <div class="w-[200px]">
      <layMenu></layMenu>
    </div>
    <div class="flex-1">
      <layoutheader />
      <layoutcontent></layoutcontent>
    </div>
  </div>
</template>

<script lang="ts" setup>
import layMenu from "./components/menu/index.vue";
import layoutheader from "./components/header/index.vue";
import layoutcontent from "./components/content/index.vue";
</script>

<style lang="sass" scoped></style>
