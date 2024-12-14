<template>
  <component :is="isComponent" v-bind="handleJudgeLink(to)">
    <slot />
  </component>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { isLink } from "@/utils/utils";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  to: {
    type: Object,
  },
});

const isExternalLink = computed(() => isLink(props.to.name));

const isComponent = computed(() => (isExternalLink ? "a" : "router-link"));
/**
 * 判断是否是外链还是路由
 */
const handleJudgeLink = (itemMenu) => {
  return isExternalLink.value ? { href: itemMenu.name, target: "_blank", rel: "noopener" } : { to: itemMenu };
};
</script>
<style scoped lang="less"></style>
